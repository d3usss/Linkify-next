export const baseUrl =
  process.env.NEXT_PUBLIC_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
