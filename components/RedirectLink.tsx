import { baseUrl } from "@/utils/getBaseUrl";
import Link from "next/link";

interface RedirectLinkProps {
  code: string;
}

export function RedirectLink({ code }: RedirectLinkProps) {
  return (
    <Link href={`/url/${code}`} target="_blank" rel="noopener noreferrer">
      {`${baseUrl}/url/${code}`}
    </Link>
  );
}
