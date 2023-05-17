import axios from "axios";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");

  try {
    const res = await axios(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
    );

    const city = res.data.address.city || res.data.address.town || res.data.address.village;

    return NextResponse.json(city);
  } catch (error) {
    return NextResponse.json(error);
  }
}
