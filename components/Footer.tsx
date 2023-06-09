"use client";
export default function Footer() {
  return (
    <footer className="flex items-center justify-center text-white text-[16px] py-8">
      <span className="px-2">Made with</span>
      <svg width={24} height={24}>
        <use href={`/sprite.svg#love`} />
      </svg>
      <span className="px-2">by Narges</span>
    </footer>
  );
}
