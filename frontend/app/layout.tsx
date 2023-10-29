import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "PriceWatch",
	description: "Browse the best deals from Amazon warehouse, and more.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-bg-primary dark:bg-bg-primary-dark h-full min-h-screen">
				<Navbar />
				<div className="mx-auto max-w-7xl py-6 px-1 sm:px-6 lg:px-8 h-full">
					{children}
				</div>
			</body>
		</html>
	);
}
