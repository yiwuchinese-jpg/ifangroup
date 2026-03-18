import type { Metadata } from"next";

export const metadata: Metadata = {
 title:"OEM Plumbing Manufacturer & Factory Direct | IFAN Group",
 description:"Direct access to our 120,000m² factory. Skip the middleman for PPR, PEX, and brass valves. We provide zero-defect OEM/ODM customization and bulk wholesale pricing.",
 keywords: ["OEM plumbing manufacturer China","Brass valve factory direct","PPR pipe factory","ODM plumbing supplies","China plumbing wholesale"],
 alternates: {
 canonical:"/manufacturing-oem",
 }
};

export default function ManufacturingLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
