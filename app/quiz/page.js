'use client';

import React, { useState } from 'react';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [quizLength, setQuizLength] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const loadQuiz = async () => {
    const response = await fetch(
      'https://naturalization-quiz-api.onrender.com/api/v1/quiz'
    );
    const data = await response.json();
    // Set the number of questions to 5
    setQuizLength(2);
    // Select random questions from the data
    const randomQuestions = data.sort(() => 0.5 - Math.random()).slice(0, 2);
    setQuestions(randomQuestions);
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    const currentAnswers = userAnswers[questionId] || [];
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
    // Set the button state to disabled if no answer is selected
    if (!userAnswers[questions[currentQuestionIndex].id]) {
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const userCorrectAnswers = userAnswers[currentQuestion.id] || [];
    console.log('userCorrectAnswers', userCorrectAnswers);
    const correctAnswersCount = currentQuestion.correct.filter((answer) =>
      userCorrectAnswers.includes(answer)
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
    }
  };
  // Reset the quiz and refresh the page
  const resetQuiz = () => {
    setUserAnswers({});
    setMissedQuestions([]);
    setCurrentQuestionIndex(0);
    setShowSummary(false);
    loadQuiz();
  };

  return (
    <>
      <main className="flex flex-col">
        {/* Create a button to start the quiz or reset the quiz */}
        <div className="quiz-container ml-auto p-4 md:gap-10 md:p-6">
          {!questions.length ? (
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={loadQuiz}
            >
              Start Quiz
            </button>
          ) : (
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={resetQuiz}
            >
              Reset Quiz
            </button>
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
                className="bg-black text-white px-4 py-2 rounded"
                onClick={submitAnswer}
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-5">
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
                <p className="font-semibold mb-2">
                  {missedQuestions.length > 0
                    ? 'Questions Missed:'
                    : 'Question Missed:'}
                </p>
                <ul className="space-y-2">
                  {missedQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
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
