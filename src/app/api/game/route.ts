import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuid } from "uuid";
var jwt = require("jsonwebtoken");

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.has("id")) {
    const id = req.nextUrl.searchParams.get("id");
    const result = await sql`SELECT * FROM games WHERE id = ${id}`;
    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  }
  const result = await sql`SELECT * FROM games`;
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const authorizationToken = req.headers.get("authorization");
  if (authorizationToken) {
    try {
      jwt.verify(authorizationToken, process.env.TOKEN);
      const data = await req.json();

      if (
        !data.hasOwnProperty("name") ||
        !data.hasOwnProperty("description") ||
        !data.hasOwnProperty("site") ||
        !data.hasOwnProperty("release_date") ||
        !data.hasOwnProperty("type") ||
        !data.hasOwnProperty("image")
      ) {
        return NextResponse.json({ message: "Wrong data" }, { status: 400 });
      }

      var { name, description, site, release_date, type, image } = data;

      await sql`INSERT INTO games (id,name, description, site, release_date, type, image) VALUES (${uuid()},${name}, ${description}, ${site}, ${release_date}, ${type}, ${image}) RETURNING *`;
      return NextResponse.json({ message: "Data inserted successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }
  return NextResponse.json(
    { error: "Authorization token not provided" },
    { status: 401 }
  );
}
