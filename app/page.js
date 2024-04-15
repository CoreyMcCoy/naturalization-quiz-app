import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold mb-4">USCIS Quiz App</h1>

        <Link
          href="/quiz"
          className="btn bg-black hover:bg-black text-white rounded"
        >
          Start Quiz
        </Link>
      </div>
    </>
  );
}
