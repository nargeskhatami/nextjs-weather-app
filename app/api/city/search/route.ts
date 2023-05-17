import axios from "axios";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const namePrefix = searchParams.get("namePrefix");

  try {
    const res = await axios(`https://api.api-ninjas.com/v1/city?name=${namePrefix}`, {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY!,
      },
    });
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
