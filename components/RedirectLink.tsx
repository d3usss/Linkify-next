import Link from "next/link";

interface RedirectLinkProps {
  orginalUrl: string;
  shortUrl: string;
}

export function RedirectLink({ orginalUrl, shortUrl }: RedirectLinkProps) {
  return (
    <Link href={orginalUrl} target="_blank" rel="noopener noreferrer">
      {shortUrl}
    </Link>
  );
}
