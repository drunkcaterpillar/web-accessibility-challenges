import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";

const MotorChallenge = () => {
  // For normal panel: stable custom cursor
  const [stableCursorPos, setStableCursorPos] = useState({ x: 0, y: 0 });
  const [stableCursorVisible, setStableCursorVisible] = useState(false);

  // For impaired panel: jittered custom cursor
  const [impairedCursorPos, setImpairedCursorPos] = useState({ x: 0, y: 0 });
  const [impairedCursorVisible, setImpairedCursorVisible] = useState(false);
  const [jitterRange, setJitterRange] = useState(25); // initial intense jitter
  const [targetSize, setTargetSize] = useState(null); // use CSS default until fix applied

  const [isFixed, setIsFixed] = useState(false);
  const { updateProgress } = useContext(ProgressContext);

  // Handlers for normal panel cursor
  const handleNormalMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setStableCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setStableCursorVisible(true);
  };
  const handleNormalMouseLeave = () => {
    setStableCursorVisible(false);
  };

  // Handlers for impaired panel cursor
  const handleImpairedMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Apply jitter based on current jitterRange
    const jitterX = x + (Math.random() * jitterRange * 2 - jitterRange);
    const jitterY = y + (Math.random() * jitterRange * 2 - jitterRange);
    setImpairedCursorPos({ x: jitterX, y: jitterY });
    setImpairedCursorVisible(true);
  };
  const handleImpairedMouseLeave = () => {
    setImpairedCursorVisible(false);
  };

  // Inline SVG for custom cursor
  const cursorSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      role="img"
      width="15"
      height="15"
    >
      <title>Cursor</title>
      <desc>A trembling cursor icon</desc>
      <path
        fill="#202020"
        d="M41.6 31.3l12.8-12.8L0 0l18.5 54.3 12.8-12.7L53.7 64 64 53.7 41.6 31.3z"
      ></path>
    </svg>
  );

  // Handle the fix: when fix is applied, reduce jitter (but still keep some) and expand the target button.
  const handleFix = () => {
    setIsFixed(true);
    setJitterRange(25); // reduce jitter to a moderate level (not 0)
    setTargetSize(120);
    updateProgress("motor", 100);
  };

  const isComplete = isFixed;

  return (
    <div className="challenge-wrapper">
      <h2>Motor Impairment Challenge</h2>
      <div className="educative-panel">
        <p>
          Users with motor impairments often struggle to click small targets due
          to hand tremors. In this simulation, both panels show the same "Click
          Me" button. In the impaired panel, the custom cursor trembles to
          simulate involuntary movement. After applying the fix, the target
          expands (improving hit size) while some tremor remains. (WCAG 2.5.5
          recommends larger targets and improved spacing.)
        </p>
        <p>
          Hover over each panel to see the custom cursor. The normal panel shows
          a steady pointer, while the impaired panel shows a trembling pointer.
        </p>
      </div>
      <div className="vision-panels">
        {/* Normal Panel */}
        <div
          className="panel normal-view"
          onMouseMove={handleNormalMouseMove}
          onMouseLeave={handleNormalMouseLeave}
          style={{ position: "relative" }}
        >
          <h3>Normal Interaction</h3>
          <div className="target-container">
            <button className="small-btn">Click Me</button>
          </div>
          {stableCursorVisible && (
            <div
              className="custom-cursor"
              style={{
                top: stableCursorPos.y,
                left: stableCursorPos.x,
              }}
            >
              {cursorSVG}
            </div>
          )}
        </div>
        {/* Impaired Panel */}
        <div
          className="panel impaired-view motor-challenge"
          onMouseMove={handleImpairedMouseMove}
          onMouseLeave={handleImpairedMouseLeave}
          style={{ position: "relative", cursor: "none" }}
        >
          <h3>Impaired Interaction</h3>
          <div className="target-container">
            <button
              className="small-btn"
              style={
                isFixed ? { width: `${targetSize}px`, height: "50px" } : {}
              }
            >
              Click Me
            </button>
          </div>
          {impairedCursorVisible && (
            <div
              className="custom-cursor"
              style={{
                top: impairedCursorPos.y,
                left: impairedCursorPos.x,
              }}
            >
              {cursorSVG}
            </div>
          )}
        </div>
      </div>
      <button className="fix-btn" onClick={handleFix}>
        Apply Motor Fix (Increase target size & reduce tremors)
      </button>
      {isComplete && (
        <motion.div
          className="success-msg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          Great job! The target in the impaired panel is now larger and the
          pointer tremors are moderated.
        </motion.div>
      )}
      <ProgressBar />
      {isComplete && (
        <Link to="/challenge/cognitive">
          <motion.button
            className="next-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next → Cognitive Challenge
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default MotorChallenge;
