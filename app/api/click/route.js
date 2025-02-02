import admin from "@/models/admin";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();

    const alladmin = await admin.find({});

    return new Response(JSON.stringify(alladmin), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all clicks", { status: 500 });
  }
};
