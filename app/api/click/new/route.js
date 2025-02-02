import admin from "@/models/admin";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { declaredwinner } = await request.json();

  try {
    await connectToDB();

    const adminpost = await new admin({
      declaredwinner: declaredwinner,
    });
    await adminpost.save();

    return new Response(JSON.stringify(adminpost), { status: 201 });
  } catch (error) {
    return new Response("something went wrong", { status: 400 });
  }
};
