import "./globals.css";

export const metadata = {
  title: "La Maison — Fine Dining",
  description: "Seasonal ingredients, reimagined classics, and an atmosphere designed to slow time — right in the heart of the city.",
  openGraph: {
    title: "La Maison — Fine Dining",
    description: "Reserve your table at La Maison.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}