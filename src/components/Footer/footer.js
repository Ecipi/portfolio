import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-5 z-10">
      <div className="flex justify-between">
        <nav className="flex gap-4">
          <Link href="#projects">LINKEDIN</Link>
          <Link href="#about">X</Link>
        </nav>
      </div>
    </footer>
  );
}