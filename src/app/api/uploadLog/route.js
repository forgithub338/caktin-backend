import { NextResponse } from "next/server";
import { createConnection } from "@/../lib/connectDB";

export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const db = await createConnection();

  const [results] = await db.query(`
    SELECT * FROM user 
    ORDER BY uploadTime DESC 
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  return NextResponse.json(results);
}
