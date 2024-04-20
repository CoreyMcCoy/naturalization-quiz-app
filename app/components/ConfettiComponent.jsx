'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // useEffect(() => {
  //   // Start the confetti animation
  //   setIsConfettiVisible(true);
  //   setIsFadingOut(false); // Reset fade out

  //   const timer = setTimeout(() => {
  //     setIsFadingOut(true); // Start fade out

  //     setTimeout(() => {
  //       setIsConfettiVisible(false); // Finally hide confetti
  //       setIsFadingOut(false); // Reset fade out state
  //     }, 1000); // This should match the CSS transition time for fading
  //   }, 4500); // Duration before starting the fade out

  //   return () => {
  //     clearTimeout(timer); // Clear the timer when the component unmounts
  //   };
  // }, []);

  return (
    <>
      {/* Set the Confetti to 1000ms */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={750}
        recycle={false}
        run={true}
        confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: 0 }}
        // onConfettiComplete={() => {
        //   setIsConfettiVisible(false);
        // }}
      />
      {/* {isConfettiVisible && (
        <div className={isFadingOut ? 'confetti-fade-out' : null}>
          <Confetti />
        </div>
      )} */}
    </>
  );
};

export default ConfettiComponent;
