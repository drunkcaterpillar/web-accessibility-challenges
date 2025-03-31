import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";

const TunnelVisionChallenge = () => {
  const [fixEnabled, setFixEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 400, y: 200 });
  const { updateProgress } = useContext(ProgressContext);

  // Challenge is complete when fixEnabled is true.
  const isComplete = fixEnabled;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "f" && !fixEnabled) {
        setFixEnabled(true);
        updateProgress("tunnel-vision", 100);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fixEnabled, updateProgress]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const overlayStyle = {
    maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, transparent 50px, black 120px)`,
    WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, transparent 50px, black 120px)`,
  };

  return (
    <div className="challenge-wrapper">
      <h2>Tunnel Vision Challenge</h2>
      <div className="educative-panel">
        <p>
          This simulation demonstrates how conditions like glaucoma or
          hemianopia narrow visual input so that peripheral content
          “disappears.” Users with tunnel vision rely on clear focus order and
          reflowed content. (WCAG 2.4.3, 2.4.7, 1.3.1)
        </p>
      </div>
      <p>
        Move your mouse to see the "window" of vision. Try navigating the
        content via keyboard. Press <strong>F</strong> to reflow the page into a
        narrower layout.
      </p>
      <div
        className="tunnel-vision-container"
        onMouseMove={handleMouseMove}
        tabIndex="0"
      >
        <div className={`sample-content ${fixEnabled ? "fixed-layout" : ""}`}>
          <h3>Main Article Heading</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            in neque et nisl convallis blandit.
          </p>
          <button>Learn More</button>
          <h4>Subsection</h4>
          <p>
            Phasellus id urna nec sapien sagittis dapibus. Mauris efficitur,
            dolor ut condimentum, dignissim nunc.
          </p>
          <a href="#more">Read More Details</a>
        </div>
        <motion.div
          className="tunnel-overlay"
          style={overlayStyle}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <div className="fix-panel">
        <p>
          Tunnel vision makes it hard to track wide or scattered layouts. Enable
          a focused, reflowed view for better readability.
        </p>
        {!fixEnabled && (
          <button
            className="fix-btn"
            onClick={() => {
              setFixEnabled(true);
              updateProgress("tunnel-vision", 100);
            }}
          >
            🛠️ Fix Layout for Tunnel Vision
          </button>
        )}
      </div>

      {isComplete && (
        <motion.div
          className="success-msg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          Fix enabled! Notice the improved layout and focus outlines.
        </motion.div>
      )}
      <ProgressBar />
      {/* Next button linking to Glare Sensitivity Challenge */}
      {isComplete && (
        <Link to="/challenge/glare-sensitivity">
          <motion.button
            className="next-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Challenge → Glare Sensitivity
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default TunnelVisionChallenge;
