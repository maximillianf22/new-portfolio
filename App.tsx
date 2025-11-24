import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { BlogPost } from "./components/BlogPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}

export default App;
