import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuid } from "uuid";
var jwt = require("jsonwebtoken");
const token = process.env.TOKEN;
export async function GET(req: NextRequest) {
  
}
export async function POST(req: NextRequest) {

}
