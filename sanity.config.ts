import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { zhHansLocale } from '@sanity/locale-zh-hans'
import { lazy } from 'react'
import { brandType } from './sanity/schemaTypes/brandType'
import { categoryType } from './sanity/schemaTypes/categoryType'
import { productType } from './sanity/schemaTypes/productType'
import { articleType } from './sanity/schemaTypes/articleType'

const OrderUploader = lazy(() => import('./sanity/plugins/orderUploader/index'));

export default defineConfig({
  name: 'default',
  title: 'IFAN 集团管理系统',

  projectId: 'm2e07kon',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), zhHansLocale()],
  tools: (prev) => {
    return prev.concat([
      {
        name: 'Order Uploader',
        title: 'Order Uploader',
        component: OrderUploader,
      }
    ])
  },

  schema: {
    types: [brandType, categoryType, productType, articleType],
  },
})
