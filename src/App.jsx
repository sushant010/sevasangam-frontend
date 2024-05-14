import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import './global.css';
import '../src/css/buttons.css';
import './css/typography.css';
import './css/variables.css';
import About from "./pages/about/About";
import HowItWorks from "./pages/howItWorks/HowItWorks";
import Contact from "./pages/contact/Contact";
import Temples from "./pages/temples/Temples";
import Temple from "./pages/temple/Temple";
import OurTeamAndJourney from "./pages/our-team-and-journey/OurTeamAndJourney";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import TermsAndConditions from "./pages/terms-and-conditions/TermsAndConditions";

function App() {
  return (
    <>
       <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/temples" element={<Temples />} />
          <Route path="/temple" element={<Temple />} />
          <Route path="/our-team-and-journey" element={<OurTeamAndJourney />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        {/* Add more Route components for other paths if needed */}
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
