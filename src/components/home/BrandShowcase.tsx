import { client } from "@/lib/sanity";
import { allBrandsQuery } from "@/lib/queries";
import BrandShowcaseClient, { type ShowcaseBrand } from "./BrandShowcaseClient";

export default async function BrandShowcase() {
 const allBrands: ShowcaseBrand[] = await client.fetch(allBrandsQuery);

 // IFAN 自有系列走五栏 hover 展开模块；代理系列仍按国家分组展示。
 const ifanSeries = allBrands.filter((b) => b.series === "Ifan系列");

 const proxySeries: Record<string, ShowcaseBrand[]> = {};
 allBrands.forEach((b) => {
 if (b.series !== "Ifan系列" && b.series !== "其他" && b.series) {
  if (!proxySeries[b.series]) proxySeries[b.series] = [];
  proxySeries[b.series].push(b);
  }
 });

 const otherBrands = allBrands.filter((b) => b.series === "其他");

 return (
 <BrandShowcaseClient
 ifanSeries={ifanSeries}
 proxySeries={proxySeries}
 otherBrands={otherBrands}
 />
 );
}
