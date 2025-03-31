import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ProgressContext } from "../contexts/ProgressContext";

const ProgressBar = ({ progress }) => {
  const { overallProgress } = useContext(ProgressContext);
  const displayProgress = progress !== undefined ? progress : overallProgress;

  return (
    <div className="progress-container">
      <motion.div
        className="progress-bar"
        initial={{ width: "0%" }}
        animate={{ width: `${displayProgress}%` }}
        transition={{ duration: 0.5 }}
      />
      <div className="progress-text">
        {displayProgress}% Accessibility Fixed
      </div>
    </div>
  );
};

export default ProgressBar;
