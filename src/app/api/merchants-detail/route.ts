import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const url = new URL(request.url);
  const mchtCode = url.searchParams.get("mchtCode");
  try {
    const response = await axios.get(
      `${BASE_URL}api/v1/merchants/details/${mchtCode}`
    );
    return NextResponse.json(response.data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
