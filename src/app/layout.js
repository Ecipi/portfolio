import "./globals.css";
import Header from "@/components/Header/header";



export const metadata = {
  title: "Florian Francese | Développeur Front-End",
  description: "Développeur Front-End",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
