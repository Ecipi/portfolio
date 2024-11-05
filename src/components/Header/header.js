import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between border-solid border-b border-gray-50 p-5 z-10">
      <div className="text-xl font-bold">
        <nav>
          <Link href="/"><h1>florianfrancese</h1></Link>
        </nav>
      </div>
      <div>
        <nav className="flex gap-4">
          <Link href="#projects">PROJETS</Link>
          <Link href="#about">A PROPOS</Link>
          <Link href="#contact">CONTACT</Link>
        </nav>
      </div>
    </header>
  );
}