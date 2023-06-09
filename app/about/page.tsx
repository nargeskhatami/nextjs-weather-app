export default function About() {
  return (
    <div className="w-4/5 lg:w-3/5 text-white bg-white/10 rounded-xl p-6 lg:p-12">
      <h2 className="w-fit mx-auto text-2xl mb-6 font-semibold">About</h2>
      <p className="text-justify mx-auto leading-relaxed">
        Welcome to NextWeather, a simple and elegant weather app built with
        Next.js, TypeScript and Tailwind CSS. NextWeather lets you check the
        current weather conditions and forecasts for any location in the world.
        Whether you need to plan your day, your trip or your outfit, NextWeather
        has you covered.
      </p>
    </div>
  );
}
