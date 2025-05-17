// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { NextAuthOptions } from "next-auth";

// const options: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET as string,

//   callbacks: {
//     async jwt({ token, account, profile }) {
//       // Add access_token to the token object if the user signs in
//       if (account) {
//         token.accessToken = account.access_token;
//       }

//       // Optional: You can store other data in the token
//       if (profile) {
//         token.profile = profile;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       // Attach the accessToken to the session
//       session.accessToken = token.accessToken as string;

//       // Optional: You can attach other data to the session
//       if (token.profile) {
//         // Ensure session.user is defined
//         session.user = session.user || {};
//         session.user.profile = token.profile;
//       }

//       return session;
//     },
//   },

//   // Optional: Additional options for customization
//   pages: {
//     signIn: "/auth/signin", // Custom sign-in page
//     signOut: "/auth/signout", // Custom sign-out page
//     error: "/auth/error", // Custom error page
//     verifyRequest: "/auth/verify-request", // (used for check email message)
//     newUser: "/auth/new-user", // Redirect here after sign up
//   },

//   // Optional: Events
//   events: {
//     async signIn(message) {
//       console.log("User signed in:", message);
//     },
//     async signOut(message) {
//       console.log("User signed out:", message);
//     },
//     async createUser(message) {
//       console.log("New user created:", message);
//     },
//   },

//   // Optional: Debug mode
//   debug: process.env.NODE_ENV === "development",
// };

// // Export the POST method as a named export
// export const POST = NextAuth(options);
