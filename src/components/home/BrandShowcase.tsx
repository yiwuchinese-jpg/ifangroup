import { client } from"@/lib/sanity";
import { allBrandsQuery } from"@/lib/queries";
import { motion } from"framer-motion";
import Link from"next/link";
import { ArrowRight, Globe2 } from"lucide-react";
import BrandShowcaseClient from"./BrandShowcaseClient";

export default async function BrandShowcase() {
 const allBrands = await client.fetch(allBrandsQuery);

 // Split into Flagships, Sub-brands, and Proxy series
 const flagships = allBrands.filter((b: any) =>
 b.name ==="IFAN"|| b.name ==="IFANPlus"
 );

 const subBrands = allBrands.filter((b: any) =>
 b.series ==="Ifan系列"&& b.name !=="IFAN"&& b.name !=="IFANPlus"
 );

 const proxySeries: Record<string, any[]> = {};
 allBrands.forEach((b: any) => {
 if (b.series !=="Ifan系列"&& b.series !=="其他"&& b.series) {
 if (!proxySeries[b.series]) proxySeries[b.series] = [];
 proxySeries[b.series].push(b);
 }
 });

 const otherBrands = allBrands.filter((b: any) => b.series ==="其他");

 return (
 <BrandShowcaseClient
 flagships={flagships}
 subBrands={subBrands}
 proxySeries={proxySeries}
 otherBrands={otherBrands}
 />
 );
}
