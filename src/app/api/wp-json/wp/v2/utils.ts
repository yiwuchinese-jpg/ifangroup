/**
 * 公共工具：CORS 响应头、共享 categories 列表、名称→ID 反向查找
 */

// 内存中维护的分类列表（支持动态新增，跨路由共享）
export let categories: Array<{ id: number; name: string; slug: string }> = [];

// 初始化标记
let categoriesInitialized = false;
export function markCategoriesInitialized() { categoriesInitialized = true; }
export function isCategoriesInitialized() { return categoriesInitialized; }

/** 根据分类名称查找数字 ID（供 GET /posts/{id} 返回时使用） */
export function findCategoryIdByName(name: string): number | undefined {
  return categories.find(c => c.name === name)?.id;
}

/** 获取下一个可用的分类 ID */
export function getNextCategoryId(): number {
  return categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
}
