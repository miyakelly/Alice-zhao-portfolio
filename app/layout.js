import { Montserrat } from "next/font/google";
import Navigation from "./components/Navigation";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Portfolio",
  description: "UX Designer crafting beautiful and intuitive experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <div className="App">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
