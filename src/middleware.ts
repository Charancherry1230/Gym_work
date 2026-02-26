import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/workouts/:path*",
        "/exercises/:path*",
        "/progress/:path*",
        "/profile/:path*",
        "/builder/:path*",
    ],
};
