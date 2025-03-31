import { useState, useContext } from "react";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";

const ColorBlindnessChallenge = () => {
  const [fixError, setFixError] = useState(false);
  const [fixContrast, setFixContrast] = useState(false);
  const [fixLinks, setFixLinks] = useState(false);
  const [fixPalette, setFixPalette] = useState(false);

  const { updateProgress } = useContext(ProgressContext);
  const totalFixes = [fixError, fixContrast, fixLinks, fixPalette].filter(
    Boolean
  ).length;
  const progress = (totalFixes / 4) * 100;
  const allFixed = progress === 100;

  const handleFixError = () => setFixError(true);
  const handleFixContrast = () => setFixContrast(true);
  const handleFixLinks = () => setFixLinks(true);
  const handleFixPalette = () => setFixPalette(true);

  if (allFixed) {
    updateProgress("colorblind", 100);
  }

  return (
    <div className="challenge-wrapper">
      <h2>Color Blindness Challenge</h2>
      <div className="educative-panel">
        <p>
          Many websites rely on red/green cues or low-contrast color schemes,
          making them inaccessible for colorblind users. WCAG guidelines
          recommend not relying on color alone and ensuring sufficient contrast.
        </p>
        <p>
          Compare the normal view (left) to the simulated view (right), then
          apply fixes below.
        </p>
      </div>
      <div className="vision-panels colorblind-panels">
        <div className="panel normal-view">
          <h3>Normal Vision</h3>
          <div className="example-content">
            <p className="error-text-normal">Please fill this field!</p>
            <button className="success-btn-normal">Success</button>
            <p className="low-contrast-text-normal">
              This text has low contrast.
            </p>
            <p>
              <span className="color-only-link">Click me</span> (link only by
              color)
            </p>
          </div>
        </div>
        <motion.div
          className={`panel impaired-view colorblind-view ${
            fixPalette ? "fixed-palette" : ""
          }`}
          style={{
            filter: !fixPalette ? "grayscale(80%) hue-rotate(30deg)" : "none",
          }}
          transition={{ duration: 0.5 }}
        >
          <h3>Colorblind Simulation</h3>
          <div className="example-content">
            <p className={`error-text-cb ${fixError ? "fixed-error" : ""}`}>
              {fixError
                ? "🚫 This field is required"
                : "Please fill this field!"}
            </p>
            <button
              className={`success-btn-cb ${
                fixContrast ? "fixed-contrast" : ""
              }`}
            >
              {fixContrast ? "Success" : "Success"}
            </button>
            <p
              className={`low-contrast-text-cb ${
                fixContrast ? "fixed-contrast" : ""
              }`}
            >
              This text is hard to read.
            </p>
            <p>
              <span
                className={`color-only-link-cb ${
                  fixLinks ? "fixed-links" : ""
                }`}
              >
                Click me
              </span>{" "}
              (link relying on color)
            </p>
          </div>
        </motion.div>
      </div>
      <div className="fix-tools">
        {!fixError && (
          <button className="fix-btn" onClick={handleFixError}>
            Add icon & label for error
          </button>
        )}
        {!fixContrast && (
          <button className="fix-btn" onClick={handleFixContrast}>
            Increase contrast & clarity
          </button>
        )}
        {!fixLinks && (
          <button className="fix-btn" onClick={handleFixLinks}>
            Underline links
          </button>
        )}
        {!fixPalette && (
          <button className="fix-btn" onClick={handleFixPalette}>
            Use colorblind-safe palette
          </button>
        )}
      </div>
      <ProgressBar progress={progress} />
      {allFixed && (
        <motion.div
          className="success-msg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          All fixes applied! This page is now accessible for colorblind users.
        </motion.div>
      )}
      {/* Next button linking to Motor Challenge */}
      {allFixed && (
        <Link to="/challenge/motor">
          <motion.button
            className="next-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Challenge → Motor Challenge
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default ColorBlindnessChallenge;
