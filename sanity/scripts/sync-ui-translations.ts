import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

// Load the custom API configuration from CMS
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

if (!OPENAI_API_KEY) {
    console.error("❌ ERROR: Missing OPENAI_API_KEY in .env.local");
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    ...(OPENAI_BASE_URL ? { baseURL: OPENAI_BASE_URL } : {}),
});

const MESSAGES_DIR = path.join(process.cwd(), '../ifangroup-web/messages');

const LANGUAGES = [
    { code: 'es', name: 'Spanish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'fr', name: 'French' },
];

async function translateText(text: string, targetLanguage: string): Promise<string> {
    const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
            {
                role: 'system',
                content: `You are a professional B2B manufacturing website translator. Translate the given UI text into ${targetLanguage}. Ensure the tone is corporate, professional, and suitable for the plumbing/HVAC industry. Do NOT add quotes, explanations, or any other formatting. Only return the translated text verbatim. Keep HTML tags or variables like {name} exactly as they are.`
            },
            {
                role: 'user',
                content: text
            }
        ],
        temperature: 0.2,
    });

    return response.choices[0].message.content?.trim() || text;
}

function getMissingKeys(enDict: any, targetDict: any, prefix = ''): string[] {
    let missing: string[] = [];
    for (const key in enDict) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof enDict[key] === 'object' && enDict[key] !== null) {
            if (!targetDict[key]) targetDict[key] = {};
            missing = missing.concat(getMissingKeys(enDict[key], targetDict[key], fullKey));
        } else {
            if (!targetDict[key]) {
                missing.push(fullKey);
            }
        }
    }
    return missing;
}

async function main() {
    const enPath = path.join(MESSAGES_DIR, 'en.json');
    const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    for (const lang of LANGUAGES) {
        const targetPath = path.join(MESSAGES_DIR, `${lang.code}.json`);
        let targetJson: any = {};
        
        if (fs.existsSync(targetPath)) {
            targetJson = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        }

        const missingKeys = getMissingKeys(enJson, targetJson);
        
        if (missingKeys.length === 0) {
            console.log(`✅ ${lang.name} is fully translated.`);
            continue;
        }

        console.log(`🌍 Translating ${missingKeys.length} missing keys for ${lang.name}...`);

        for (const keyPath of missingKeys) {
            const keys = keyPath.split('.');
            let originalText: any = enJson;
            for (const k of keys) {
                originalText = originalText[k];
            }

            console.log(`  - Translating ${keyPath}: "${String(originalText).substring(0, 30)}..."`);
            try {
                const translated = await translateText(originalText, lang.name);
                
                let targetRef = targetJson;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!targetRef[keys[i]]) targetRef[keys[i]] = {};
                    targetRef = targetRef[keys[i]];
                }
                targetRef[keys[keys.length - 1]] = translated;
            } catch (err: any) {
                console.error(`  ❌ Failed to translate ${keyPath}: ${err.message}`);
                break; // Stop if API fails
            }
        }

        // Save back format
        fs.writeFileSync(targetPath, JSON.stringify(targetJson, null, 2) + "\n", 'utf8');
        console.log(`💾 Saved ${lang.code}.json`);
    }

    console.log("🎉 All UI translations synced!");
}

main().catch(console.error);
