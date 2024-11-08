'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {

  const scrollToSection = (e, target) => {
    e.preventDefault();
    const section = document.querySelector(target);
    if (section) {
      const verticalScrollPosition = section.offsetLeft;
      window.scrollTo({ top: verticalScrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between border-solid bg-black border-b border-gray-50 p-5 z-10">
      <div className="text-xl font-bold">
        <nav>
          <Link href="#home" onClick={(e) => scrollToSection(e, '#home')}>
            <h1>florianfrancese</h1>
          </Link>
        </nav>
      </div>
      <div>
        <nav className="flex gap-4">
          <Link href="#about" onClick={(e) => scrollToSection(e, '#about')}>A PROPOS</Link>
          <Link href="#projects" onClick={(e) => scrollToSection(e, '#projects')}>PROJETS</Link>
          <Link href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>CONTACT</Link>
        </nav>
      </div>
    </header>
  );
}