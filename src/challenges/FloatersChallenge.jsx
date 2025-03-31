import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";

const FloatersChallenge = () => {
  const [floaters, setFloaters] = useState([
    { id: 1, top: 20, left: 30 },
    { id: 2, top: 50, left: 70 },
    { id: 3, top: 70, left: 40 },
    { id: 4, top: 40, left: 60 },
  ]);
  const [zoomed, setZoomed] = useState(false);

  const { updateProgress } = useContext(ProgressContext);

  // Animate floaters drifting around
  useEffect(() => {
    const interval = setInterval(() => {
      setFloaters((prev) =>
        prev.map((f) => ({
          ...f,
          top: Math.min(90, Math.max(10, f.top + (Math.random() * 20 - 10))),
          left: Math.min(90, Math.max(10, f.left + (Math.random() * 20 - 10))),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Once zoomed is true, update progress if not already at 100
  useEffect(() => {
    if (zoomed) {
      updateProgress("floaters", 100);
    }
  }, [zoomed, updateProgress]);

  const isComplete = zoomed;

  return (
    <div className="challenge-wrapper">
      <h2>Floaters Challenge</h2>
      <p>
        Visual floaters—like those seen in diabetic retinopathy—can obscure text
        unpredictably. They appear without pattern, making reading frustrating.
      </p>
      {/* ...explanations, tooltip, etc... */}
      <div className="floaters-simulation">
        <div className={`text-container ${zoomed ? "zoomed" : ""}`}>
          <p>Some sample text that floaters might obscure.</p>
          <p>Users need the ability to zoom or reflow to read easily.</p>
        </div>
        <div className="floaters-overlay">
          {floaters.map((f) => (
            <motion.div
              key={f.id}
              className="floater"
              style={{ top: `${f.top}%`, left: `${f.left}%` }}
              whileHover={{ scale: 1.2 }}
            >
              ●
            </motion.div>
          ))}
        </div>
      </div>

      <button className="fix-btn" onClick={() => setZoomed(true)}>
        Enable Zoom (200%+)
      </button>

      {isComplete && (
        <motion.div
          className="success-msg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          Well done! The text now reflows correctly at increased size.
        </motion.div>
      )}

      {/* Global progress bar (no prop) */}
      <ProgressBar />

      {isComplete && (
        <Link to="/challenge/colorblind">
          <motion.button
            className="next-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Challenge → Color Blindness
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default FloatersChallenge;
