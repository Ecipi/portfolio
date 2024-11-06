import Link from "next/link";

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
      <div className="flex justify-between">
        <nav className="flex gap-4">
          <Link href="https://github.com/florianfrancese">GITHUB</Link>
          <Link href="https://x.com/florianfrancese">X</Link>
          <Link href="https://www.linkedin.com/in/florianfrancese/">LINKEDIN</Link>
        </nav>
      </div>
    </div>
  );
}