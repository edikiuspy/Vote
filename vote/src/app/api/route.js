import { NextResponse } from "next/server";
export async function api(req) {
  return NextResponse.json({ message: "Hello World" });
}
