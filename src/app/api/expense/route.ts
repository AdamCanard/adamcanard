//import { IParty } from "@/app/mobile/expensecomps/expense";
//import { Expense } from "@/app/server/models/expense";
//import connectMongo from "@/app/server/mongoose";
import { NextResponse } from "next/server";
//
export async function POST(req: Request) {
  //  const formData = await req.formData();
  //  const party: IParty = {
  //
  //  };
  //
  //  try {
  //    await connectMongo();
  //    const newExpense = new Expense(party);
  //    const returnedExpense = await newExpense.save();
  //    console.log(returnedExpense);
  //    return NextResponse.json(
  //      { returnedExpense, message: "Your product has been created" },
  //      { status: 201 },
  //    );
  //  } catch (error) {
  console.log(req);
  return NextResponse.json({ message: "" }, { status: 400 });
  //  }
}
