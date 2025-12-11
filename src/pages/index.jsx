// Pages.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Chess from "./chess.jsx";

// Mapping of page names for Layout highlighting (optional)
const PAGES = {
  Home: "Home",
  Test: "Test",
  Chess: "Chess",
};

// Helper to get current page from URL
function _getCurrentPage(url) {
  if (url.endsWith("/")) url = url.slice(0, -1);
  const lastPart = url.split("/").pop();
  return Object.keys(PAGES).find(
    (page) => page.toLowerCase() === lastPart.toLowerCase()
  ) || "Home";
}

// Wrapper to use useLocation inside Router
function PagesContent() {
  const location = useLocation();
  const currentPage = _getCurrentPage(location.pathname);

  return (
    <Layout currentPageName={currentPage}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Home />} />
        <Route path="/chess" element={<Chess />} />
        {/* Fallback for unknown routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default function Pages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}
