import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuid } from "uuid";
var jwt = require("jsonwebtoken");
const token = process.env.TOKEN;
export async function GET(req: NextRequest) {
  if (
    !req.nextUrl.searchParams.has("email") ||
    !req.nextUrl.searchParams.has("password")
    
  ) {
    return NextResponse.json(
      { message: "Email or password missing" },
      { status: 400 }
    );
  }
  const { rows } =
    await sql`SELECT id FROM companies where email = ${req.nextUrl.searchParams.get(
      "email"
    )} and password = ${req.nextUrl.searchParams.get("password")}`;
  if (rows.length === 0) {
    return NextResponse.json(
      { message: "Wrong email or password" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    {
      message: "Success",
      token: jwt.sign({ rows }, token, { expiresIn: "1h" }),
    },
    { status: 200 }
  );
}
export async function POST(req: NextRequest) {
  if (
    !req.nextUrl.searchParams.has("email") ||
    !req.nextUrl.searchParams.has("password") ||
    !req.nextUrl.searchParams.has("name") ||
    !req.nextUrl.searchParams.has("site")
  ) {
    return NextResponse.json({ message: "Data missing" }, { status: 400 });
  }
  var { rows } = await sql`SELECT id FROM companies where email = ${req.nextUrl.searchParams.get('email')}`
  if (rows.length > 0) {
    return NextResponse.json({ message: "Email already exists" }, { status: 400 });
  }
  var { rows } =
    await sql`INSERT INTO companies (id,email, password, name, site) VALUES (${uuid()},${req.nextUrl.searchParams.get(
      "email"
    )}, ${req.nextUrl.searchParams.get(
      "password"
    )}, ${req.nextUrl.searchParams.get("name")}, ${req.nextUrl.searchParams.get(
      "site"
    )}) RETURNING *`;
  return NextResponse.json({ message: "Registered account" }, { status: 200 });
}
