import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { motion } from "framer-motion";

const CognitiveChallenge = () => {
  const [distractions, setDistractions] = useState([
    { type: "popup", content: "🔥 Urgent Notification!" },
    { type: "popup", content: "🎁 Claim Your Reward Now!" },
    { type: "flashing", content: "Flashing Ad - Limited Time Offer!" },
    {
      type: "video",
      content:
        "https://www.youtube.com/embed/5vcj7yPibdc?autoplay=1&mute=1&controls=0",
    },
  ]);

  const [showJargon, setShowJargon] = useState(true);
  const progress = (4 - distractions.length + (!showJargon ? 1 : 0)) * 20;

  const removeDistraction = (index) => {
    setDistractions(distractions.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const flashing = document.querySelector(".flashing-ad");
    if (flashing) {
      let i = 0;
      const interval = setInterval(() => {
        flashing.style.backgroundColor = i % 2 === 0 ? "#ff00ff" : "#00ffff";
        i++;
      }, 300);
      return () => clearInterval(interval);
    }
  }, [distractions]);

  return (
    <div className="challenge-wrapper">
      <h2>Cognitive Overload Challenge 💡</h2>
      <p>
        This simulates what cognitive overload feels like for users with ADHD,
        epilepsy, migraines, or executive dysfunction. Can you calm the chaos?
      </p>

      <div className="fake-website-frame">
        <header>🔥 NEWS TODAY — Your Source of Panic</header>
        <main style={{ position: "relative", minHeight: "400px" }}>
          {distractions.map((d, i) => (
            <motion.div
              key={i}
              className={`popup ${d.type === "flashing" ? "flashing-ad" : ""}`}
              onClick={() => removeDistraction(i)}
              whileHover={{ scale: 1.05 }}
              style={{
                top: `${Math.random() * 70 + 10}%`,
                left: `${Math.random() * 70 + 10}%`,
                position: "absolute",
                padding: "1rem",
                background: d.type === "flashing" ? "#ff00ff" : "#fff8c6",
                border: "2px solid #000",
                fontWeight: "bold",
                zIndex: 10,
                width: "250px",
                boxShadow: "0 0 10px rgba(0,0,0,0.4)",
              }}
            >
              {d.type === "video" ? (
                <iframe
                  width="230"
                  height="150"
                  src={d.content}
                  title="Autoplay Video"
                  frameBorder="0"
                  allow="autoplay"
                ></iframe>
              ) : (
                d.content + " (Click to close)"
              )}
            </motion.div>
          ))}

          {showJargon ? (
            <div
              className="jargon-block"
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#f8f8f8",
                border: "1px dashed #999",
              }}
            >
              <p className="jargon-block">
                In the pursuit of replicating neurocognitive friction intrinsic
                to complex web environments, this interactive module presents a
                synthesized confluence of stimuli reflective of real-world
                digital overload scenarios—namely, excessive motion, intrusive
                interstitial elements, asynchronous content activation, and
                semantically ambiguous language constructs. This experiential
                microenvironment is intended to function as a pedagogical
                mirror: showcasing not only how neurodivergent users may
                encounter compounded barriers, but also elucidating the
                WCAG-compliant remediation strategies available to mitigate such
                cognitive dissonance. These include but are not limited to: the
                attenuation of flashing stimuli (2.3.1), structural and
                behavioral consistency across interactive components (3.2.3),
                and lexiconical simplification in content delivery (3.1.5). By
                necessitating user-led cognitive triage through interactive
                de-escalation, this exercise aspires to cultivate affective
                empathy and encourage reflexive design introspection within
                development practices.
              </p>

              <button
                onClick={() => setShowJargon(false)}
                style={{ marginTop: "1rem" }}
              >
                🧹 Simplify Text
              </button>
              <p className="tooltip">
                © 2025 AdHell Corp. We profit from your panic.
              </p>
            </div>
          ) : (
            <div
              className="plain-language-block"
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#f8f8f8",
                border: "1px dashed #999",
              }}
            >
              <h3>What’s going on here?</h3>
              <ul>
                <li>
                  This page is overloaded on purpose, with popups, flashing
                  content, auto-playing media, and hard-to-read text.
                </li>
                <li>
                  It shows how people with cognitive disabilities (like ADHD,
                  brain injury, or autism) can feel overwhelmed by these kinds
                  of websites.
                </li>
                <li>
                  The goal is to help you notice what’s wrong and understand how
                  to fix it using accessibility standards.
                </li>
              </ul>
              <h3>What does WCAG say about this?</h3>
              <ul>
                <li>
                  <strong>Stop flashing & motion</strong>: People can have
                  seizures or migraines.
                </li>
                <li>
                  <strong>Keep page behavior consistent</strong>: Don't make
                  buttons or links act unpredictably.
                </li>
                <li>
                  <strong>Use clear, simple wording</strong>: Long and complex
                  sentences are hard for many users.
                </li>
              </ul>
              <h3>Why does this matter?</h3>
              <p>
                When sites are overloaded or confusing, it is more than annoying
                for some: it can be impossible to use for someone with cognitive
                challenges. This simulation shows what that feels like and how
                thoughtful design can help fix it.
              </p>
              <p className="tooltip">
                © 2025 AdHell Corp. We profit from your panic.
              </p>
            </div>
          )}
        </main>
      </div>

      <ProgressBar progress={progress} />

      {distractions.length === 0 && !showJargon && (
        <motion.div
          className="success-msg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
          ✅ Success! This webpage is now calm, readable, and WCAG compliant.
          <br />
          <motion.button
            className="next-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={() => (window.location.href = "/finale")}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#4ccf51")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4CAF50")
            }
          >
            Claim Your Badge
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default CognitiveChallenge;
