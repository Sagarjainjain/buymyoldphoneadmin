import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcryptjs from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Missing email or password");
          }

          await connectToDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authorization Error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import User from "@/models/user";
// import { connectToDB } from "@/utils/database";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcryptjs from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         try {
//           await connectToDB();
//           const loginuser = await User.findOne({ email });

//           if (!loginuser) {
//             throw new Error("User not found"); // Throw an error instead of returning null
//           }

//           const ispasswordcorrect = await bcryptjs.compare(
//             password,
//             loginuser.password
//           );

//           if (!ispasswordcorrect) {
//             throw new Error("Invalid credentials"); // Throw an error instead of returning null
//           }

//           return loginuser;
//         } catch (error) {
//           console.error("Authorization Error:", error);
//           throw new Error("Internal Server Error");
//         }
//       },

//       // async authorize(credentials) {
//       //   const { email, password } = credentials;
//       //   try {
//       //     await connectToDB();
//       //     const loginuser = await User.findOne({ email });

//       //     if (!loginuser) {
//       //       return null;
//       //     }

//       //     const ispasswordcorrect = await bcryptjs.compare(
//       //       password,
//       //       loginuser.password
//       //     );

//       //     if (!ispasswordcorrect) {
//       //       return null;
//       //     }
//       //     return loginuser;
//       //   } catch (error) {
//       //     console.log("Error: ", error);
//       //   }
//       // },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 1800, // session will expire in 30 seconds
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signin: "/admin/bids",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
