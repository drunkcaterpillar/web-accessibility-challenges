import { useState, useContext } from "react";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";

const LowVisionChallenge = () => {
  const [severity, setSeverity] = useState(50);
  const { updateProgress } = useContext(ProgressContext);

  // The challenge is complete when severity is 0.
  const isComplete = severity === 0;

  const handleFix = () => {
    setSeverity(0);
    updateProgress("low-vision", 100);
  };

  return (
    <div className="challenge-wrapper">
      <h2>Low Vision Challenge 👓</h2>
      <p className="challenge-intro">
        Imagine having significantly blurred or low‑contrast vision. Adjust the
        slider to see the effect.
      </p>
      <ProgressBar />
      <div className="vision-panels">
        <div className="panel normal-view">
          <h4>Normal Vision</h4>
          <p>This text is easy to read for most users.</p>
          <div className="tooltip-trigger">
            <span className="tooltip-icon">❓</span>
            <div className="tooltip-content">
              <p>
                WCAG recommends a minimum contrast ratio of 4.5:1 for text.
                Tools like <strong>axe</strong> can flag insufficient contrast.
              </p>
            </div>
          </div>
        </div>
        <motion.div
          className="panel impaired-view"
          style={{
            filter: `blur(${(severity / 10).toFixed(1)}px) contrast(${
              100 - severity / 2
            }%)`,
          }}
          transition={{ duration: 0.5 }}
        >
          <h4>Impaired Vision</h4>
          <p>This text becomes harder to read as severity increases.</p>
        </motion.div>
      </div>
      <div className="severity-controls">
        <label htmlFor="severityRange">Severity: {severity}%</label>
        <input
          id="severityRange"
          type="range"
          min="0"
          max="100"
          value={severity}
          onChange={(e) => setSeverity(Number(e.target.value))}
        />
      </div>
      <button className="fix-btn" onClick={handleFix}>
        Apply Accessibility Fix
      </button>
      {isComplete && (
        <motion.div
          className="success-msg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          🎉 Nice job! You've improved readability for low‑vision users.
        </motion.div>
      )}
      {/* Next button linking to Tunnel Vision Challenge */}
      {isComplete && (
        <Link to="/challenge/tunnel-vision">
          <motion.button
            className="next-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Challenge → Tunnel Vision
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default LowVisionChallenge;
