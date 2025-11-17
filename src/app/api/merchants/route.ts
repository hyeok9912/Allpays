import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await axios.get(`${BASE_URL}api/v1/merchants/list`);
    return NextResponse.json(response.data);
  } catch (err) {
    console.error(err);
  }
}
