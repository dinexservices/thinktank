import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register to Pitch",
    description: "Apply now for ThinkTank events. Submit your startup idea and get a chance to pitch to top investors.",
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
