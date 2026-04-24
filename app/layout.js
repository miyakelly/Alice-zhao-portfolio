import "./globals.css";

export const metadata = {
  title: "Alice Zhao — UX Designer + Builder",
  description: "Senior UX Designer + Builder. Currently building AI products for AWS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
