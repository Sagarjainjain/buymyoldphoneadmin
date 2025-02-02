import adminlogs from "@/models/adminlogs";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const adminlog = await adminlogs.find({});
    return new Response(JSON.stringify(adminlog), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all adminlogs", { status: 500 });
  }
};
