import { client } from "@/lib/sanity";
import { allBrandsQuery } from "@/lib/queries";
import BrandShowcaseClient, { type ShowcaseBrand } from "./BrandShowcaseClient";

export default async function BrandShowcase() {
 const allBrands: ShowcaseBrand[] = await client.fetch(allBrandsQuery);

 // Split into Flagships, Sub-brands, and Proxy series
 const flagships = allBrands.filter((b) =>
 b.name === "IFAN" || b.name === "IFANPlus"
 );

 const subBrands = allBrands.filter((b) =>
 b.series === "Ifan系列" && b.name !== "IFAN" && b.name !== "IFANPlus"
 );

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
 flagships={flagships}
 subBrands={subBrands}
 proxySeries={proxySeries}
 otherBrands={otherBrands}
 />
 );
}
