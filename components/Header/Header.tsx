"use client";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white/25">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/PartlyCloudy.svg" alt="Logo" width={56} height={56} />
          <span className="text-white px-2">Weather App</span>
        </Link>
        <nav>
          <ul className="flex items-center">
            <li className="text-white px-2">
              <a
                className="hover:underline"
                href="https://github.com/nargeskhatami/nextjs-weather-app"
              >
                GitHub
              </a>
            </li>
            <li className="text-white px-2">
              <Link className="hover:underline" href="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
