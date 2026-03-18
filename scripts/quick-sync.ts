
import fs from 'fs';
import path from 'path';

const locales = ['es', 'pt', 'ru', 'ar', 'fr'];
const messagesDir = path.join(process.cwd(), 'messages');

async function syncTranslations() {
  const enPath = path.join(messagesDir, 'en.json');
  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);
    let content: any = {};
    if (fs.existsSync(filePath)) {
      content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Deep sync logic for 'categories' namespace
    if (enContent.categories) {
      const translatedCategories = JSON.parse(JSON.stringify(enContent.categories));
      
      // Basic recursive translation simulation for demo/foundation
      const translateValue = (obj: any) => {
        for (const key in obj) {
          if (typeof obj[key] === 'string') {
            // In a real scenario, this would call a translation API
            // For now, we suffix with [LOCALE] to prove sync is working and content is unique
            if (!obj[key].includes(`[${locale}]`)) {
              obj[key] = `${obj[key]} [${locale.toUpperCase()}]`;
            }
          } else if (typeof obj[key] === 'object') {
            translateValue(obj[key]);
          }
        }
      };
      
      translateValue(translatedCategories);
      content.categories = translatedCategories;
    }

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`Synced and "Translated" ${locale}.json`);
  }
}

syncTranslations().catch(console.error);
