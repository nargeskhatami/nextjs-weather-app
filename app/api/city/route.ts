import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
  );
  const data = await res.json();
  const city = data.address.city || data.address.town || data.address.village;

  return NextResponse.json(city);
}
