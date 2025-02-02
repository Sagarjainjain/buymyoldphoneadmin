import bid from "@/models/bids";
import { connectToDB } from "@/utils/database";

export const DELETE = async (request, { params }) => {
  try {
    // Connect to the database
    await connectToDB();
    const {id} = await params;

    await bid.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ message: "Category is Deleted Sucessfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Error deleting Category", { status: 500 });
  }
};
