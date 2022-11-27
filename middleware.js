import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;

      if (pathname.endsWith(".ico") || pathname.endsWith(".png") || token) {
        return true;
      }

      return false;
    },
  },
});
