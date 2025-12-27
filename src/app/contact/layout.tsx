import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with the ThinkTank team for inquiries about events, sponsorship, or registration.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
