import { createConnection } from "@/../lib/connectDB"
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.json()
    const classString = formData.class
    const amount = formData.amount

    const match = classString.match(/(\d+)年(\d+)班/);
    const grade = match[1];
    const classNum = parseInt(match[2], 10);

    const db = await createConnection();
    const [results] = await db.query(
      "UPDATE log SET amount = amount + ? WHERE grade = ? AND class = ?;", 
      [amount, grade, classNum])

    return NextResponse.json({message: "新增成功"})

    


  } catch (error) {
    console.log(`error: ${error}`);
    return NextResponse.json({message: error.message});
  }
}