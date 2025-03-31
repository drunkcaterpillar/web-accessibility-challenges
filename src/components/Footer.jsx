import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "rgba(10, 10, 10, 0.5)",
        color: "#ccc",
        fontSize: "0.7rem",
        fontFamily: "'Courier New', monospace",
        padding: "6px 10px",
        textAlign: "center",
        zIndex: 9999,
        backdropFilter: "blur(6px)",
        letterSpacing: "0.3px",
        wordSpacing: "1px",
      }}
    >
      built (hastily) by{" "}
      <strong style={{ color: "#ffcc00" }}>drunkcaterpillar</strong> (or just
      call me{" "}
      <span style={{ color: "#e6e6e6", fontStyle: "italic" }}>San)</span> —{" "}
      <a
        href="https://github.com/drunkcaterpillar"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#aaa", textDecoration: "none" }}
      >
        GitHub
      </a>{" "}
      /{" "}
      <a
        href="https://x.com/hojoborolol"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#aaa", textDecoration: "none" }}
      >
        X
      </a>{" "}
      /{" "}
      <a
        href="https://linkedin.com/in/sanyukta2000"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#aaa", textDecoration: "none" }}
      >
        LinkedIn
      </a>{" "}
      /{" "}
      <a
        href="https://substack.com/@cryptidsanny"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#aaa", textDecoration: "none" }}
      >
        Substack
      </a>{" "}
      <span style={{ opacity: 0.4, marginLeft: "6px" }}>
        © {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
