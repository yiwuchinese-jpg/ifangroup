import type { Metadata } from"next";

export const metadata: Metadata = {
 title:"Engineering Global Fluid Systems | About IFAN Group",
 description:"Why we exist: to engineer safe, reliable global fluid systems. Discover how our 30 years of relentless manufacturing optimization has built the world's most trusted plumbing portfolio.",
 keywords: ["IFAN Group history","Plumbing manufacturer background","Global fluid systems engineering","B2B plumbing corporate"],
 alternates: {
 canonical:"/about-us",
 }
};

export default function AboutLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
