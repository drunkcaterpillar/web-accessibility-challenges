import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChallengePage from "./pages/ChallengePage";
import Finale from "./pages/Finale";
import Footer from "./components/Footer";

import { ProgressProvider } from "./contexts/ProgressContext";
import "./pages/styles.css";

const App = () => {
  return (
    <ProgressProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/challenge/:type" element={<ChallengePage />} />
          <Route path="/finale" element={<Finale />} />
        </Routes>

        {}
        <Footer />
      </Router>
    </ProgressProvider>
  );
};

export default App;
