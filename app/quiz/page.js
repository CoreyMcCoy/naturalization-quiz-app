'use client';

import { useState } from 'react';
import ConfettiComponent from '../components/ConfettiComponent';
import { motion } from 'framer-motion';

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
    const response = await fetch(
      'https://naturalization-quiz-api.onrender.com/api/v1/quiz'
    );
    const data = await response.json();

    // Get a random set of questions
    const randomQuestions = getRandomQuestions(data, quizLength);

    // Set the questions to the state
    setQuestions(randomQuestions);
    setStage('quiz');
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
      } else {
        // If the index has already been used, try again
        continue;
      }
    }

    return randomQuestions;
  }

  //* Reset the quiz and refresh the page
  const resetQuiz = () => {
    setStage('setup');
    setQuizLength(7);
    setUserAnswers({});
    setMissedQuestions([]);
    setCurrentQuestionIndex(0);

    // Refresh the page
    window.location.reload();
  };

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

  const variants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 10,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 1.25,
      },
    },
  };

  return (
    <>
      <main className="flex flex-col">
        {/* Show header */}
        {stage === 'setup' && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-4 md:p-6"
          >
            <header className="card card-bordered border-gray-300">
              <div className="card-body">
                <p className="">
                  Set number of questions: {''}
                  <span className="font-medium text-xs text-white bg-black ml-2 px-2 py-1 rounded-md">
                    {!quizLength ? 7 : quizLength}
                  </span>
                </p>

                {!questions.length && (
                  <input
                    onChange={handleRange}
                    type="range"
                    name="range"
                    min="6"
                    max="10"
                    step="1"
                    defaultValue={quizLength}
                    className="range [--range-shdw:black] range-xs mt-2"
                  />
                )}
              </div>
            </header>
            {!questions.length ? (
              <button
                className="btn bg-black hover:bg-black text-white float-end w-full md:w-auto mt-5 rounded-md"
                onClick={loadQuiz}
              >
                Start
              </button>
            ) : null}
          </motion.div>
        )}
        {/* End of header */}

        {/*Show quiz */}
        {stage === 'quiz' && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-4 md:p-6"
          >
            <div className="card card-bordered border-gray-300">
              <div className="card-body">
                <h2 className="text-xl font-semibold tracking-tighter mb-3">
                  {questions[currentQuestionIndex]?.question ||
                    'Your first question will appear here.'}
                </h2>

                {/* Display the possible answers */}
                <div className="form-control space-y-4">
                  {questions[currentQuestionIndex]?.answers.map(
                    (answer, index) => (
                      <label key={index} className="flex space-x-2">
                        <input
                          type="radio"
                          className="mr-2"
                          name="answer"
                          value={answer}
                        />
                        {answer}
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
            <button
              className="btn bg-black hover:bg-black text-white float-end w-full md:w-auto mt-5 rounded-md"
              onClick={handleSubmitAnswer}
            >
              Submit Answer
            </button>
          </motion.div>
        )}
        {/* End quiz */}

        {/* Show summary */}
        {stage === 'summary' && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-4 md:p-6"
          >
            <div>
              {correctAnswerCount.length >= 6 && <ConfettiComponent />}
              <div className="card card-bordered border-gray-300">
                <div className="card-body">
                  <h2 className="text-xl font-semibold tracking-tighter mb-3">
                    Quiz Summary
                  </h2>
                  <p className="tracking-tighter">
                    Great job...you passed! You scored {''}
                    <span className="font-semibold text-lg">
                      {correctAnswerCount.length} / {quizLength}.
                    </span>
                  </p>
                  {correctAnswerCount.length < 6 ? (
                    <>
                      <p className="tracking-tighter">
                        Sorry, you didn't pass.{' '}
                      </p>

                      <p>
                        You need 6 correct answers to pass. You scored:{' '}
                        {correctAnswerCount.length} out of {quizLength}.
                      </p>
                    </>
                  ) : null}
                  {missedQuestions.length > 0 && (
                    <div className="missed-questions">
                      <ul>
                        {missedQuestions.map((question, index) => (
                          <li key={index} className="mt-3">
                            <h3 className="font-medium tracking-tighter">
                              Question you missed:
                            </h3>
                            {question.question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <button
                className="btn bg-black hover:bg-black text-white float-end w-full md:w-auto mt-5 rounded-md"
                onClick={resetQuiz}
              >
                {correctAnswerCount.length >= 6 ? 'Start Over' : 'Retry Quiz'}
              </button>
            </div>
          </motion.div>
        )}
        {/* End summary */}
      </main>
    </>
  );
};

export default QuizPage;
