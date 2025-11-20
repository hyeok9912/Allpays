import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.get(`${BASE_URL}health`);
    return NextResponse.json(response.data);
  } catch (err) {
    console.error(err);
    NextResponse.error();
  }
}
