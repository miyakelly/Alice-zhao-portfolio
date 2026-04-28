import "./globals.css";
import "./project.css";

export const metadata = {
  title: "Alice Zhao|UX Builder",
  description: "UX Designer that reimagines digital experiences. Currently building AI products for AWS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
