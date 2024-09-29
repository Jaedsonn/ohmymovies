import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} flex flex-col items-center justify-center h-auto`}
    >
      <NavBar />

      {children}
    </div>
  );
}
