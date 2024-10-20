import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    publicRoutes: ["/", "/sign-in", "/sign-up"], // Public routes
});

export const config = {
    matcher: [
        // Apply middleware to all routes except public routes and static files
        '/((?!_next|api|favicon.ico|sign-in|sign-up).*)',
    ],
};
