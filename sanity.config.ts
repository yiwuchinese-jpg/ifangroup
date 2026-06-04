import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { zhHansLocale } from '@sanity/locale-zh-hans'
import { brandType } from './sanity/schemaTypes/brandType'
import { categoryType } from './sanity/schemaTypes/categoryType'
import { productType } from './sanity/schemaTypes/productType'
import { articleType } from './sanity/schemaTypes/articleType'

export default defineConfig({
  name: 'default',
  title: 'IFAN 集团管理系统',
  basePath: '/studio',

  projectId: 'm2e07kon',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), zhHansLocale()],

  schema: {
    types: [brandType, categoryType, productType, articleType],
  },
})
