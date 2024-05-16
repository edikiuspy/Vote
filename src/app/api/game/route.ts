import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuid } from "uuid";
var jwt = require("jsonwebtoken");
const token = process.env.TOKEN;
export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.has("id")) {
    const id = req.nextUrl.searchParams.get("id");
    const result = await sql`SELECT * FROM games WHERE id = ${id}`;
    return NextResponse.json(result.rows);
  }
  const result = await sql`SELECT * FROM games`;
  return NextResponse.json(result.rows);
}
export async function POST(req: NextRequest) {
  console.log(req.headers.get("authorization"));
  if (req.headers.get("authorization")) {
    const token = req.headers.get("Authorization");

    if (jwt.verify(token, process.env.TOKEN)) {
      console.log(await req.nextUrl);
      const data = await req.json();

      if (
        data.hasOwnProperty("name") ||
        data.hasOwnProperty("description") ||
        data.hasOwnProperty("price") ||
        data.hasOwnProperty("site") ||
        data.hasOwnProperty("release_date") ||
        data.hasOwnProperty("type") ||
        data.hasOwnProperty("image")
      ) {
        return NextResponse.json(
          { message: "Wrong email or password" },
          { status: 400 }
        );
      }
      const { name, description, price, site, release_date, type, image } =
        await req.json();
      const result =
        await sql`INSERT INTO games (name, description, price, site, release_date, type, image) VALUES (${name}, ${description}, ${price}, ${site}, ${release_date}, ${type}, ${image}) RETURNING *`;
    }
  }
  return NextResponse.json({ error: "Invalid token" }, { status: 401 });
}
