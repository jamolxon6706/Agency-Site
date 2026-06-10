import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell page-space">
      <div className="panel">
        <h1>Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <Link href="/uz" className="button">
          Go Home
        </Link>
      </div>
    </div>
  );
}

