import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import './global.css';
import '../src/css/buttons.css';
import './css/typography.css';
import './css/variables.css';
import About from "./pages/about/About";
import HowItWorks from "./pages/howItWorks/HowItWorks";
import Contact from "./pages/contact/Contact";

function App() {
  return (
    <>
       <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/temples" element={<About />} />
        {/* Add more Route components for other paths if needed */}
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
