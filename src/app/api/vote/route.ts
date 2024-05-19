import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.has("id")) {
    const id = req.nextUrl.searchParams.get("id");
    const result = await sql`SELECT votes FROM games WHERE id = ${id}`;
    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  }
  const result = await sql`SELECT votes FROM games`;
  return NextResponse.json(result.rows);
}
export async function POST(req: NextRequest) {
  const authorizationToken = req.headers.get("authorization");
  if (authorizationToken) {
    try {
      const token = jwt.verify(authorizationToken, process.env.TOKEN);
      console.log(token.user.id);
      const user = (
        await sql`SELECT * FROM accounts WHERE id = ${token.user.id}`
      ).rows[0];
      console.log(user)
      if (!req.nextUrl.searchParams.get("id")) {
        return NextResponse.json({ message: "Wrong data" }, { status: 400 });
      }
      if (user.voted_on == req.nextUrl.searchParams.get("id")) {
        return NextResponse.json(
          { message: "You have already voted on this game" },
          { status: 400 }
        );
      }
      var result =
        await sql`SELECT votes FROM games  WHERE id = ${req.nextUrl.searchParams.get(
          "id"
        )}`;
      if (result.rows.length === 0) {
        return NextResponse.json(
          { message: "Game not found" },
          { status: 404 }
        );
      }
      if (user.voted_on != req.nextUrl.searchParams.get("id") && user.voted_on) {
        var previousResult =
          await sql`SELECT votes FROM games WHERE id = ${user.voted_on}`;
        await sql`UPDATE games SET votes = ${
          previousResult.rows[0].votes - 1
        } WHERE id = ${user.voted_on}`;
      }

      await sql`UPDATE games SET votes = ${
        console.log(result.rows[0]),
        result.rows[0].votes + 1
      } WHERE id = ${req.nextUrl.searchParams.get("id")}`;

      await sql`UPDATE accounts SET voted_on = ${req.nextUrl.searchParams.get(
        "id"
      )} WHERE id = ${user.id}`;

      return NextResponse.json({ message: "Voted" }, { status: 200 });
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
