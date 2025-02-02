import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";


// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { email, password } = req.body;

//   await connectToDB();

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: "Email already in use" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     email,
//     password: hashedPassword,
//   });

//   await newUser.save();
//   res.status(201).json({ message: "User registered successfully" });
// }

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    const hashedpassword = await bcrypt.hash(password, 10);
    await connectToDB();
    await User.create({email, password: hashedpassword});

    return NextResponse.json(
      { message: "User Is Registered" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
