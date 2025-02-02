import bid from "@/models/bids";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { useremail, usernumber, userbid, biddate } = await request.json();

  try {
    await connectToDB();

    const bids = await new bid({
      useremail,
      usernumber,
      userbid,
      biddate,
    });

    await bids.save();
    return new Response(JSON.stringify(bids), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
