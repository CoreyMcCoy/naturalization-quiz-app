const QuizPage = () => {
  return (
    <>
      <div className="flex flex-col">
        <header className="flex items-center pb-4 border-b">
          <div className="ml-auto">
            <button className="text-sm">Restart Quiz</button>
          </div>
        </header>
        <main className="flex-1">
          <div className="container flex flex-col justify-center gap-4 p-4 md:gap-10 md:p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tighter">
                What is the capital of France?
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center" htmlFor="option1">
                  <input
                    className="form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent"
                    id="option1"
                    name="option"
                    type="radio"
                  />
                  <span className="ml-2 text-sm font-medium">
                    New York City, New York
                  </span>
                </label>
                <label className="flex items-center" htmlFor="option2">
                  <input
                    className="form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent"
                    id="option2"
                    name="option"
                    type="radio"
                  />
                  <span className="ml-2 text-sm font-medium">London, UK</span>
                </label>
                <label className="flex items-center" htmlFor="option3">
                  <input
                    className="form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent"
                    id="option3"
                    name="option"
                    type="radio"
                  />
                  <span className="ml-2 text-sm font-medium">
                    Paris, France
                  </span>
                </label>
                <label className="flex items-center" htmlFor="option4">
                  <input
                    className="form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent"
                    id="option4"
                    name="option"
                    type="radio"
                  />
                  <span className="ml-2 text-sm font-medium">
                    Los Angeles, California
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="bg-black text-white px-4 py-2 rounded">
                Submit Answer
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default QuizPage;
