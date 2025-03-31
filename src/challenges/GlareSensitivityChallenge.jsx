import { useState, useContext } from "react";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";

const GlareSensitivityChallenge = () => {
  const [brightness, setBrightness] = useState(150);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const { updateProgress } = useContext(ProgressContext);

  const handleFix = () => {
    setDarkModeEnabled(true);
    updateProgress("glare-sensitivity", 100);
  };

  const isComplete = darkModeEnabled;

  return (
    <div className="challenge-wrapper">
      <h2>Glare Sensitivity Challenge</h2>
      <div className="educative-panel">
        <p>
          People with photophobia or glare sensitivity experience severe
          discomfort from bright screens. Adjust the brightness slider below to
          see how glare can become painful, then enable true dark mode that
          meets WCAG guidelines.
        </p>
      </div>
      <div className={`glare-container ${darkModeEnabled ? "dark-mode" : ""}`}>
        <div className="panel normal-view">
          <h4>{darkModeEnabled ? "Dark Mode" : "Normal Mode"}</h4>
          <p>
            {darkModeEnabled
              ? "A dark background with balanced contrast helps reduce glare."
              : "This view may be too bright for photophobic users."}
          </p>
        </div>
        <motion.div
          className="panel impaired-view"
          style={{
            filter: darkModeEnabled ? "none" : `brightness(${brightness}%)`,
          }}
          transition={{ duration: 0.5 }}
        >
          <h4>Glare Mode</h4>
          <p>
            {brightness <= 120
              ? "Minimal glare"
              : brightness <= 180
              ? "Discomfort glare"
              : "Disability glare - reading becomes painful!"}
          </p>
        </motion.div>
      </div>
      {!darkModeEnabled && (
        <div className="severity-controls">
          <label>Brightness: {brightness}%</label>
          <input
            type="range"
            min="80"
            max="250"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
          />
        </div>
      )}
      {!darkModeEnabled && (
        <button className="fix-btn" onClick={handleFix}>
          Enable True Dark Mode
        </button>
      )}
      {isComplete && (
        <motion.div
          className="success-msg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          Excellent! You've reduced glare with a balanced dark mode.
        </motion.div>
      )}
      <ProgressBar />
      {/* Next button linking to Floaters Challenge */}
      {isComplete && (
        <Link to="/challenge/floaters">
          <motion.button
            className="next-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Challenge → Floaters
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default GlareSensitivityChallenge;
