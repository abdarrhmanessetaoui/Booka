import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Routes publiques ne nécessitant pas d'authentification
const isPublicRoute = createRouteMatcher([
  '/',                  // Page d'accueil
  '/sign-in(.*)',       // Connexion
  '/sign-up(.*)',       // Inscription
  '/api/upload(.*)',    // Upload Vercel Blob
  '/api/vapi(.*)',      // Webhook Vapi
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
