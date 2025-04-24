import { redirect } from "next/navigation";

interface UrlRedirectProps {
  orginalUrl: string;
}

export default function UrlRedirect({ orginalUrl }: UrlRedirectProps) {
  if (!orginalUrl) {
    redirect("/404");
  }

  redirect(orginalUrl);
}
