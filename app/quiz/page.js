'use client';

import { useState } from 'react';
import ConfettiComponent from '../components/ConfettiComponent';

const QuizPage = () => {
  const [stage, setStage] = useState('setup'); // 'setup', 'quiz', 'summary'
  const [quizLength, setQuizLength] = useState(7);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswerCount, setCorrectAnswerCount] = useState([]);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  //* Dynamically set the number of questions: Done
  const handleRange = (e) => {
    const rangeValue = e.target.value;
    setQuizLength(rangeValue);
  };

  //* Load the quiz data from the API: Done
  const loadQuiz = async () => {
    setStage('quiz');
    const response = await fetch(
      'https://naturalization-quiz-api.onrender.com/api/v1/quiz'
    );
    const data = await response.json();

    // Get a random set of questions
    const randomQuestions = getRandomQuestions(data, quizLength);

    // Set the questions to the state
    setQuestions(randomQuestions);
  };

  //* Get a random set of questions: Done
  function getRandomQuestions(data, quizLength) {
    const selectedIndices = new Set();
    const randomQuestions = [];

    while (randomQuestions.length < quizLength) {
      let index = Math.floor(Math.random() * data.length); // Generate a random index
      if (!selectedIndices.has(index)) {
        // Check if the index has already been used
        selectedIndices.add(index); // Add the index to the set
        randomQuestions.push(data[index]); // Add the question to the output array
      }
    }

    return randomQuestions;
  }

  //* HandleSubmitAnswer
  // Handle the user's answer selection
  // Check to see if the user's answer is part of the data.correct array
  // If the user's answer is part of the array of correct answers, add the correct answer to the correctAnswerCount array and display it in the summary section at the end of the quiz
  // If the user's answer is incorrect, add the question to the missedQuestions array and display it in the summary section at the end of the quiz
  // Update the user's answers object with the current question and the user's answer
  // Check if the quiz is over
  // Clear the user's answer selection
  // Move to the next question

  const handleSubmitAnswer = () => {
    const answer = document.querySelector('input[name="answer"]:checked');
    if (!answer) {
      alert('Please select an answer');
      return;
    }

    const selectedAnswer = answer.value;
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correct.includes(selectedAnswer);

    // Clear the selected answer
    answer.checked = false;

    // Batch updates to avoid multiple re-renders
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.question]: isCorrect,
    }));

    // Update the correct answer count
    if (isCorrect) {
      setCorrectAnswerCount((prevCorrect) => [...prevCorrect, currentQuestion]);
    } else {
      setMissedQuestions((prevMissed) => [...prevMissed, currentQuestion]);
    }

    // Check if the quiz is over and update the question index in one step
    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);
    if (nextQuestionIndex === questions.length) {
      setStage('summary');
    }
  };

  //* Reset the quiz and refresh the page
  const resetQuiz = () => {
    setQuizLength(7);
    setUserAnswers({});
    setMissedQuestions([]);
    setCurrentQuestionIndex(0);
    setStage('setup');

    // Refresh the page
    window.location.reload();
  };

  return (
    <>
      <main className="flex flex-col">
        {/* Show header */}
        {stage === 'setup' && (
          <header className="">
            <div className="flex justify-between mb-4">
              <h2 className="self-center">
                Set number of questions: {''}
                <span className="font-medium text-xs text-white bg-black px-2 py-1 rounded-md">
                  {!quizLength ? 7 : quizLength}
                </span>
              </h2>

              <div className="quiz-container">
                {!questions.length ? (
                  <button
                    className="text-sm bg-black text-white p-2 rounded"
                    onClick={loadQuiz}
                  >
                    Start
                  </button>
                ) : null}
              </div>
            </div>

            {!questions.length && (
              <input
                onChange={handleRange}
                type="range"
                name="range"
                min="6"
                max="10"
                step="1"
                defaultValue={quizLength}
                className="range [--range-shdw:black] range-xs w-3/4"
              />
            )}
          </header>
        )}
        {/* End of header */}

        {/*Show quiz */}
        {stage === 'quiz' && (
          <div className="">
            <h2 className="text-xl font-semibold tracking-tighter border-black border-b pb-4 w-full md:w-3/4">
              {questions[currentQuestionIndex]?.question ||
                'Your first question will appear here.'}
            </h2>

            {/* Display the possible answers */}
            <div className="form-control space-y-4 my-4">
              {questions[currentQuestionIndex]?.answers.map((answer, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className="mr-2"
                    name="answer"
                    value={answer}
                  />
                  {answer}
                </label>
              ))}
            </div>
            <button
              className="bg-black text-sm text-white p-3 rounded w-full md:w-auto"
              onClick={handleSubmitAnswer}
            >
              Submit Answer
            </button>
          </div>
        )}
        {/* End quiz */}

        {/* Show summary */}
        {stage === 'summary' && (
          <div className="">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tighter border-black border-b pb-4 w-full md:w-3/4">
                Quiz Summary
              </h2>
              <button
                className="text-sm bg-black text-white p-2 rounded"
                onClick={resetQuiz}
              >
                Reset
              </button>
            </div>
            <p className="font-semibold tracking-tighter mt-4">
              You scored: {correctAnswerCount.length} out of {quizLength}
            </p>
            {correctAnswerCount.length >= 6 ? (
              <>
                <ConfettiComponent />
              </>
            ) : (
              <p className="font-semibold tracking-tighter mt-4">
                You didn't pass.{' '}
                <span
                  onClick={resetQuiz}
                  className="underline-offset-2 cursor-pointer text-blue-700 font-medium"
                >
                  {' '}
                  Click here{' '}
                </span>
                to try again.
              </p>
            )}
            {missedQuestions.length > 0 && (
              <div className="missed-questions">
                <ul>
                  {missedQuestions.map((question, index) => (
                    <li key={index} className="mt-2">
                      <h3 className="font-semibold tracking-tighter mt-4">
                        Question you missed:
                      </h3>
                      {question.question}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {/* End summary */}
      </main>
    </>
  );
};

export default QuizPage;
