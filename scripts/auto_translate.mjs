import fs from 'fs';
import translate from 'google-translate-api-x';

const enPath = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/messages/en.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Deep translate function
async function deepTranslate(targetNode, enNode, langCode) {
    let changed = false;
    // Map google-translate-api-x language codes if needed, though es, ar, fr, ru, pt are standard.
    const toMap = { 'ar': 'ar', 'es': 'es', 'fr': 'fr', 'pt': 'pt', 'ru': 'ru' };
    const to = toMap[langCode];

    // Collect all strings that need translation to batch them
    const translationsNeeded = [];
    const keysMap = [];

    // Helper to traverse and collect
    function traverse(tNode, eNode, pathObj) {
        for (const key in tNode) {
            if (!eNode || !(key in eNode)) continue;

            if (typeof tNode[key] === 'object' && tNode[key] !== null) {
                traverse(tNode[key], eNode[key], { node: tNode, key: key });
            } else if (typeof tNode[key] === 'string') {
                if (tNode[key] === eNode[key] && tNode[key].length > 1) {
                    translationsNeeded.push(tNode[key]);
                    keysMap.push({ node: tNode, key: key });
                }
            }
        }
    }

    traverse(targetNode, enNode, null);

    if (translationsNeeded.length > 0) {
        console.log(`Found ${translationsNeeded.length} texts to translate for [${langCode}]`);
        // Batch translation in chunks of 50 to avoid payload too large
        const chunkSize = 50;
        for (let i = 0; i < translationsNeeded.length; i += chunkSize) {
            const chunk = translationsNeeded.slice(i, i + chunkSize);
            const chunkKeys = keysMap.slice(i, i + chunkSize);
            try {
                console.log(`Translating chunk ${i/chunkSize + 1} for [${langCode}]...`);
                // Force array result
                const res = await translate(chunk, { to: to, rejectOnPartialFail: false });
                for (let j = 0; j < res.length; j++) {
                    chunkKeys[j].node[chunkKeys[j].key] = res[j].text;
                    changed = true;
                }
            } catch (e) {
                console.error(`Error translating chunk:`, e.message);
                // On fail, let's try one by one to ensure partial success
                for (let j = 0; j < chunk.length; j++) {
                    try {
                        const singleRes = await translate(chunk[j], { to: to });
                        chunkKeys[j].node[chunkKeys[j].key] = singleRes.text;
                        changed = true;
                    } catch (err) {
                        console.error(`Failed single: ${chunk[j].slice(0, 20)}...`);
                    }
                }
            }
        }
    }

    return changed;
}

async function run() {
    const langs = ['es', 'ar', 'fr', 'ru', 'pt'];
    for (const lang of langs) {
        const p = `/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/messages/${lang}.json`;
        console.log(`\n=== Processing Language: ${lang} ===`);
        const d = JSON.parse(fs.readFileSync(p, 'utf8'));
        
        const changed = await deepTranslate(d, en, lang);
        
        fs.writeFileSync(p, JSON.stringify(d, null, 2));
        if (changed) {
            console.log(`[${lang}] Saved successfully.`);
        } else {
            console.log(`[${lang}] No translation needed.`);
        }
    }
}

run();
