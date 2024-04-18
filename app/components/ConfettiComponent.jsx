'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start the confetti animation
    setIsConfettiVisible(true);
    setIsFadingOut(false); // Reset fade out

    const timer = setTimeout(() => {
      setIsFadingOut(true); // Start fade out

      setTimeout(() => {
        setIsConfettiVisible(false); // Finally hide confetti
        setIsFadingOut(false); // Reset fade out state
      }, 1000); // This should match the CSS transition time for fading
    }, 4500); // Duration before starting the fade out

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, []);

  return (
    <>
      {isConfettiVisible && (
        <div className={isFadingOut ? 'confetti-fade-out' : ''}>
          {/* Display "Great Job!" in the middle of the page */}
          <Confetti />
          <span className="text-center text-4xl font-black text-green-600">
            Great Job...You Passed!
          </span>
        </div>
      )}
    </>
  );
};

export default ConfettiComponent;
