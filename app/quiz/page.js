'use client';

import { useState } from 'react';
import ConfettiComponent from '../components/ConfettiComponent';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [quizLength, setQuizLength] = useState(7);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Dynamically set the number of questions
  const handleRange = (e) => {
    const rangeValue = e.target.value;
    setQuizLength(rangeValue);
  };

  const loadQuiz = async () => {
    const response = await fetch(
      'https://naturalization-quiz-api.onrender.com/api/v1/quiz'
    );
    const data = await response.json();

    //! Select random questions from the data
    const randomQuestions = data
      .sort(() => 0.5 - Math.random())
      .slice(0, quizLength);
    setQuestions(randomQuestions);
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    const currentAnswers = userAnswers[questionId] || [];
    // log the question's correct answer
    console.log('correct answer', questions[currentQuestionIndex].correct);
    console.log('currentAnswers', currentAnswers);
    let updatedAnswers;
    if (currentAnswers.includes(selectedAnswer)) {
      console.log('selectedAnswer', selectedAnswer);
      // Remove the answer if it's already selected
      updatedAnswers = currentAnswers.filter(
        (answer) => answer !== selectedAnswer
      );
    } else {
      // Add the answer to the selections
      updatedAnswers = [...currentAnswers, selectedAnswer];
    }
    setUserAnswers({ ...userAnswers, [questionId]: updatedAnswers });
  };

  const submitAnswer = () => {
    // Set the button state to disabled if the quiz hasn't started or there is no answer is selected
    if (!questions.length || !userAnswers[questions[currentQuestionIndex].id]) {
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const userCurrentAnswers = userAnswers[currentQuestion.id] || [];
    console.log('userCurrentAnswers', userCurrentAnswers);
    const correctAnswersCount = currentQuestion.correct.filter((answer) =>
      userCurrentAnswers.includes(answer)
    ).length;

    // Check if the number of correct answers matches at least one correct option
    const isCorrect = correctAnswersCount > 0;

    if (!isCorrect) {
      setMissedQuestions([...missedQuestions, currentQuestion.question]);
    }

    if (currentQuestionIndex + 1 < quizLength) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true);
      // Determine if the quiz is passed
      const totalCorrect = quizLength - missedQuestions.length;
      if (totalCorrect >= 6) {
        setQuizPassed(true);
      }
    }
  };
  // Reset the quiz and refresh the page
  const resetQuiz = () => {
    setQuizLength(7);
    setUserAnswers({});
    setMissedQuestions([]);
    setCurrentQuestionIndex(0);
    setShowSummary(false);
    loadQuiz();

    // Refresh the page
    window.location.reload();
  };

  return (
    <>
      <main className="flex flex-col">
        <div className="header flex flex-col mb-10">
          <div className="flex justify-between">
            <h2 className="self-center">
              Select a number of questions: {''}
              <span className="font-medium text-xs text-white bg-black px-2 py-1 rounded-md">
                {!quizLength ? 7 : quizLength}
              </span>
            </h2>
            {/* Create a button to start the quiz or reset the quiz */}
            <div className="quiz-container p-4">
              {!questions.length ? (
                <button
                  className="text-sm bg-black text-white p-2 rounded"
                  onClick={loadQuiz}
                >
                  Start
                </button>
              ) : (
                <button
                  className="text-sm bg-black text-white p-2 rounded"
                  onClick={resetQuiz}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
          {/* If the quiz has started, disable this input */}
          {!questions.length && (
            <input
              onChange={handleRange}
              type="range"
              name="range"
              min="6"
              max="10"
              step="1"
              defaultValue={quizLength}
              className="range [--range-shdw:black] range-xs mb-5"
            />
          )}
        </div>

        <div className="quiz-container container flex flex-col justify-center gap-4 p-4 md:gap-10 md:p-6">
          {!showSummary ? (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold tracking-tighter border-black border-b pb-3">
                {questions[currentQuestionIndex]?.question ||
                  'Your first question will appear here.'}
              </h2>
              <div className="flex flex-col space-y-2">
                {questions[currentQuestionIndex]?.answers.map(
                  (answer, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        checked={
                          userAnswers[
                            questions[currentQuestionIndex].id
                          ]?.includes(answer) || false
                        }
                        onChange={() =>
                          handleAnswerChange(
                            questions[currentQuestionIndex].id,
                            answer
                          )
                        }
                      />
                      {answer}
                    </label>
                  )
                )}
              </div>
              <button
                className="bg-black text-sm text-white p-3 rounded w-full md:w-auto"
                onClick={submitAnswer}
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-5">
              {/* Display the confetti animation if the quiz is passed */}
              {quizPassed && <ConfettiComponent />}
              <h2 className="text-xl font-semibold tracking-tighter border-black border-b pb-3">
                Quiz Summary
              </h2>
              <div className="flex flex-col space-y-2">
                <p className="font-semibold pb-4 border-gray-300 border-b">
                  Correct Answers:{' '}
                  <span className="font-normal">
                    {quizLength - missedQuestions.length}
                  </span>
                </p>
                <p className="font-semibold pb-4 border-gray-300 border-b">
                  Incorrect Answers:{' '}
                  <span className="font-normal">{missedQuestions.length}</span>
                </p>
                <p className="font-semibold mb-5">
                  {missedQuestions.length > 0 ? 'What you missed: ' : ''}
                </p>
                <ul className="space-y-2">
                  {/* Display the question and answer missed */}
                  {missedQuestions.map((question, index) => (
                    <li key={index} className="mb-4">
                      <p className="font-semibold mb-3">{question}</p>
                      <p className="font-normal">
                        Correct Answer:{' '}
                        {questions
                          .find((q) => q.question === question)
                          ?.correct.join(', ')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default QuizPage;
