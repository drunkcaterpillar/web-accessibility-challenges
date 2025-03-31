import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./styles.css"; // We'll define some fancy styles here

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Floating icons background */}
      <div className="floating-icons">
        <div className="icon icon-eye" />
        <div className="icon icon-ear" />
        <div className="icon icon-wheelchair" />
        <div className="icon icon-keyboard" />
      </div>

      {/* Main content */}
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="landing-title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Accessibility Adventures
        </motion.h1>

        <motion.p
          className="landing-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Step into the shoes of diverse users and see how small changes can
          make a massive difference. Ready to level up your site with real-world
          accessibility challenges?
        </motion.p>

        <Link to="/challenge/low-vision">
          <motion.button
            className="start-adventure-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Adventure
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingPage;
