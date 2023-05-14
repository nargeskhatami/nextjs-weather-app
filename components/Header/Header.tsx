"use client";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white/25 w-full">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <svg width={56} height={56}>
            <use href={`/sprite.svg#partly-cloudy`} />
          </svg>
          <h1 className="text-white px-2">NextWeather</h1>
        </Link>
        <nav>
          <ul className="flex items-center">
            <li className="text-white px-2">
              <a
                className="hover:underline"
                target="_blank"
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
