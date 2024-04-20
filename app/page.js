'use client';

import Link from 'next/link';
import ConfettiComponent from './components/ConfettiComponent';

export default function Home() {
  return (
    <>
      <div className="">
        <h1 className="text-2xl text-center md:text-left font-bold mb-6">
          Welcome to the Naturalization Quiz App
        </h1>

        <p className="text-center md:text-left mb-5">
          This quiz helps you prepare for the U.S. Naturalization Test. This
          quiz features up to 10 questions selected from the official
          <span className="text-blue-700 font-medium underline underline-offset-2">
            <a
              href="https://www.uscis.gov/sites/default/files/document/questions-and-answers/OoC_100_Questions_2008_Civics_Test_V1.pdf"
              target="_blank"
            >
              {''} list of 100 civics questions.
            </a>
          </span>
        </p>
        <p className="text-center md:text-left mb-10">
          You need to correctly answer at least 6 questions to pass. Ready?
        </p>
        <Link
          href="/quiz"
          className="btn bg-black hover:bg-black w-full md:w-auto text-white rounded"
        >
          <button>Start Quiz</button>
        </Link>
      </div>
    </>
  );
}
