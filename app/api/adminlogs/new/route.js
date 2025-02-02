import adminlogs from "@/models/adminlogs";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { email, password, attempt, role, date, time } = await request.json();

  try {
    await connectToDB();

    const adminlog = await new adminlogs({
      email,
      password,
      attempt,
      role,
      date,
      time,
    });

    await adminlog.save();
    return new Response(JSON.stringify(adminlog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
