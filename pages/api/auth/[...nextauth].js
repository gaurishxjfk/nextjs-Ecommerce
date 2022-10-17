import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
      }),
  ],
  // jwt: {
  //   encryption: true,
  // },
  secret: process.env.JWT_SECRET,
  // callbacks: {
  //   async jwt(token, account) {

  //       if(account?.accessToken){
  //           token.accessToken = account.accessToken
  //       }
  //       return token
  //   },
  //   redirect: async (url, _baseUrl) => {
  //       console.log(url, _baseUrl,"rutu")
  //       return Promise.resolve("/");
  //   }
  // }
}
export default NextAuth(authOptions)