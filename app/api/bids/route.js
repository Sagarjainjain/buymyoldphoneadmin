import bid from "@/models/bids";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const bids = await bid.find({});
    return new Response(JSON.stringify(bids), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Bids", { status: 500 });
  }
};
