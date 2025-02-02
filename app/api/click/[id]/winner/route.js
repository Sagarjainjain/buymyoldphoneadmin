import admin from "@/models/admin";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  try {
    const { id } = await params;
    const { declaredwinner } = await request.json();
    await connectToDB();

    const clicks = await admin.findById(id);

    if (!clicks) {
      return new Response("Click not found", { status: 404 });
    }
    clicks.declaredwinner = declaredwinner;
    await clicks.save();
    return new Response(JSON.stringify(clicks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 401,
    });
  }
};
