import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-medium mb-3">USCIS Quiz App</h1>
        <Link className="text-sm" href="/quiz">
          Start Quiz
        </Link>
      </div>
    </>
  );
}
