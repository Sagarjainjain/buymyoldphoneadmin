// import bid from "@/models/bids";
// import { connectToDB } from "@/utils/database";

// export const GET = async (request) => {
//   const { searchParams } = new URL(request.url);
//   const searchemail = searchParams.get("email");
//   try {
//     await connectToDB();

//     const searchemaildata = await bid.find({ useremail: searchemail });
//     if (searchemaildata.length === 0) {
//       return new Response(JSON.stringify("not found" ), {
//         status: 200,
//       });
//     } else {

//         return new Response(JSON.stringify(searchemaildata), { status: 200 });
//     }
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "email error" }), {
//       status: 404,
//     });
//   }
// };

import bid from "@/models/bids";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const searchemail = searchParams.get("email");

    if (!searchemail) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }

    await connectToDB();

    // Case-insensitive email search
    const searchemaildata = await bid.find({
      useremail: { $regex: `^${searchemail}$`, $options: "i" },
    });

    if (searchemaildata.length === 0) {
      return new Response(JSON.stringify({ message: "not found" }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify(searchemaildata), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "email error", error: error.message }),
      { status: 500 }
    );
  }
};

