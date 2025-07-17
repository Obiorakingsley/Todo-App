import React from "react";
import Confetti from "react-confetti";

const confetti = () => {
  return <Confetti recycle={false} numberOfPieces={800} />;
};

export default confetti;
