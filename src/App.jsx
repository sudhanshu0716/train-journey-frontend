import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage/FirstPage";
import LoginPage from "./components/AuthPage/LoginPage";
import SignUpPage from "./components/AuthPage/SignUpPage";
import MainMenu from "./components/MainMenu/MainMenu";
import LostAndFound from "./components/LostAndFound/LostAndFound";
import ScenicView from "./components/ScenicViews/ScenicView";
import CrushTheRush from "./components/CrushTheRush/CrushTheRush";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminMap from "./components/AdminMap/AdminMap";
import AdminMenu from "./components/AdminMenu/AdminMenu";
import LostAndFoundAdminPanel from "./components/LostAndFoundAdminPanel/LostAndFoundAdminPanel";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User-facing routes */}
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/lost" element={<LostAndFound />} />
        <Route path="/scenic" element={<ScenicView />} />
        <Route path="/crush" element={<CrushTheRush />} />
        
        {/* Admin-facing routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminmap" element={<AdminMap />} />
        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/adminlost" element={<LostAndFoundAdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
