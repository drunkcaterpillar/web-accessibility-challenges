import React, { createContext, useState } from "react";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const totalChallenges = 6; // low-vision, tunnel-vision, glare-sensitivity, floaters, colorblind, motor
  const [progresses, setProgresses] = useState({
    "low-vision": 0,
    "tunnel-vision": 0,
    "glare-sensitivity": 0,
    floaters: 0,
    colorblind: 0,
    motor: 0,
  });

  const updateProgress = (challengeKey, value) => {
    setProgresses((prev) => {
      // If we're setting the same value, do nothing
      if (prev[challengeKey] === value) {
        return prev; // no state change, no re-render
      }
      return { ...prev, [challengeKey]: value };
    });
  };

  const overallProgress =
    Object.values(progresses).reduce((acc, val) => acc + val, 0) /
      totalChallenges || 0;

  return (
    <ProgressContext.Provider
      value={{ progresses, updateProgress, overallProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
