import { useParams } from "react-router-dom";
import LowVisionChallenge from "../challenges/LowVisionChallenge";
import TunnelVisionChallenge from "../challenges/TunnelVisionChallenge";
import GlareSensitivityChallenge from "../challenges/GlareSensitivityChallenge";
import FloatersChallenge from "../challenges/FloatersChallenge";
import ColorBlindnessChallenge from "../challenges/ColorBlindChallenge";
import MotorChallenge from "../challenges/MotorChallenge";
import CognitiveChallenge from "../challenges/CognitiveChallenge";

const ChallengePage = () => {
  const { type } = useParams();

  const challengeComponents = {
    "low-vision": <LowVisionChallenge />,
    "tunnel-vision": <TunnelVisionChallenge />,
    "glare-sensitivity": <GlareSensitivityChallenge />,
    floaters: <FloatersChallenge />,
    colorblind: <ColorBlindnessChallenge />,
    motor: <MotorChallenge />,
    cognitive: <CognitiveChallenge />,
  };

  return challengeComponents[type] || <p>Challenge not found</p>;
};

export default ChallengePage;
