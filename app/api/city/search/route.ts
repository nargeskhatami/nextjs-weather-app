import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const namePrefix = searchParams.get("namePrefix");
  try {
    const res = await fetch(`https://api.api-ninjas.com/v1/city?name=${namePrefix}`, {
      method: "GET",
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY!,
      },
    });
    const items = await res.json();
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json([]);
  }
}
