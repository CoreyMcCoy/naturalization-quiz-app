import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="">
        <h1 className="text-2xl text-center md:text-left font-bold mb-6">
          Naturalization Quiz App
        </h1>

        <Link
          href="/quiz"
          className="btn bg-black hover:bg-black w-full md:w-auto text-white rounded"
        >
          Start Quiz
        </Link>
      </div>
    </>
  );
}
