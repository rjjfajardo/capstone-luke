export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/project/:path*"] };
