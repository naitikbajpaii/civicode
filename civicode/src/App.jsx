import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Codes from "./pages/Codes";
import About from "./pages/About";
import Welcome from "./components/Welcome"; // 

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1200); // 1.2 seconds before moving to site

    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) return <Welcome />;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codes" element={<Codes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
