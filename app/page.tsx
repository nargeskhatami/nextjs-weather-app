async function getWeatherInfo() {
  let res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=35.7152&longitude=51.4043&hourly=relativehumidity_2m,visibility&daily=temperature_2m_max,apparent_temperature_max,windspeed_10m_max&timezone=auto"
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export default async function Home() {
  const weatherInfo = await getWeatherInfo();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {weatherInfo.timezone}
    </main>
  );
}
