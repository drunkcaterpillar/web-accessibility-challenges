import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import html2canvas from "html2canvas";

// Generate a burst of confetti
const generateConfetti = (count = 45) =>
  Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 2;
    const size = 8 + Math.random() * 14;
    const bg = ["#FFC700", "#FF5F5F", "#2E3192", "#41BBC7", "#73244C"][
      Math.floor(Math.random() * 5)
    ];
    return {
      id: i,
      left,
      delay,
      duration,
      size,
      bg,
    };
  });

const Finale = () => {
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const confettiPieces = generateConfetti(45);

  // For capturing the certificate as an image
  const certificateRef = useRef(null);

  // Use your real share URL
  const shareUrl = "https://your-production-site.com";
  const title =
    "I just completed the Accessibility Challenge! 🧠💻 Make it usable. No excuses.";

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = () => {
    if (!certificateRef.current) return;
    html2canvas(certificateRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "accessibility-certificate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div
      className="finale-wrapper"
      style={{ margin: "2rem auto", maxWidth: "900px" }}
    >
      {/* Confetti overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {confettiPieces.map((c) => (
          <div
            key={c.id}
            style={{
              position: "absolute",
              left: `${c.left}vw`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              backgroundColor: c.bg,
              borderRadius: "50%",
              animation: `confetti-fall ${c.duration}s linear ${c.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "1rem" }}
      >
        🎉 Congratulations!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: "1.1rem", margin: "1rem auto", maxWidth: "700px" }}
      >
        You’ve completed all challenges. What you just fixed in simulation is
        what millions deal with daily. Keep these best practices in mind and
        help create a more usable web for everyone.
      </motion.p>

      {/* If not submitted, show name input */}
      {!submitted ? (
        <div
          style={{
            margin: "2rem auto",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <p>Enter your name to personalize your certificate:</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              width: "70%",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <br />
          <button
            onClick={() => setSubmitted(true)}
            disabled={!userName.trim()}
            style={{
              backgroundColor: "#222",
              color: "#fff",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🖊️ Generate Certificate
          </button>
        </div>
      ) : (
        // If submitted, show certificate
        <motion.div
          className="certificate-container"
          ref={certificateRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Certificate of Completion</h2>
          <p className="certificate-name">{userName}</p>
          <p>
            has successfully completed the
            <br />
            <strong>Web Accessibility Simulation</strong>
          </p>
          <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
            by identifying and resolving common barriers in web design for users
            with visual, motor, auditory, and cognitive challenges.
          </p>
          <p style={{ marginTop: "2rem" }}>
            <em>Issued on: {new Date().toLocaleDateString()}</em>
          </p>
        </motion.div>
      )}

      {/* Share + Download Buttons */}
      {submitted && (
        <motion.div
          className="share-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          <p style={{ marginBottom: "0.5rem" }}>Share your achievement:</p>
          <div style={{ display: "inline-flex", gap: "1rem" }}>
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={title} separator="\n">
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={shareUrl}
              title="Accessibility Challenge Complete!"
              summary={title}
            >
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
          </div>
          <br />
          <button
            style={{
              marginTop: "1rem",
              backgroundColor: "#222",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert("Link copied to clipboard!");
            }}
          >
            📋 Copy Link
          </button>
          <br />
          <button
            style={{
              marginTop: "1rem",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={handleDownload}
          >
            📥 Download Certificate as Image
          </button>
        </motion.div>
      )}

      <hr style={{ margin: "3rem auto", width: "50%" }} />

      {/* Explore More */}
      <div
        className="explore-more"
        style={{
          fontSize: "1rem",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <p>
          <strong>Explore more:</strong> This challenge covered only a slice of
          accessibility. Keep learning how to make the web usable for everyone:
        </p>
        <ul style={{ marginTop: "1rem", lineHeight: "1.6" }}>
          <li>
            🔗{" "}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noreferrer"
            >
              WCAG Guidelines (Quick Reference)
            </a>
          </li>
          <li>
            🔗{" "}
            <a
              href="https://webaim.org/techniques/"
              target="_blank"
              rel="noreferrer"
            >
              WebAIM: Accessibility Techniques
            </a>
          </li>
          <li>
            🔗{" "}
            <a href="https://wave.webaim.org/" target="_blank" rel="noreferrer">
              WAVE Site Checker
            </a>
          </li>
          <li>
            🔗{" "}
            <a href="https://a11yproject.com/" target="_blank" rel="noreferrer">
              The A11y Project
            </a>
          </li>
        </ul>
        <p style={{ marginTop: "2rem" }}>
          Accessibility isn’t an add-on. It’s the default. Build like it. 🚀
        </p>
      </div>
    </div>
  );
};

export default Finale;
