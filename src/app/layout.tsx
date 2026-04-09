import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/lib/CartContext";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "4 Estações",
  description: "Loja online de plantas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <CartProvider>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
