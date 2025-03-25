import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Classification from "./pages/Classification";
import Races from "./pages/Races";
import VideosPage from "./pages/VideosPage";
import { ApiProvider } from "./Api/Context"; // Certifique-se de importar corretamente
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <ApiProvider> {/* Envolvendo tudo com o ApiProvider */}
        <div className="app-container">
          <TopBar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/classification" element={<Classification />} />
              <Route path="/races" element={<Races />} />
              <Route path="/videos" element={<VideosPage />} />
            </Routes>
          </div>
        </div>
      </ApiProvider>
      <Footer />
    </Router>
  );
};

export default App;
