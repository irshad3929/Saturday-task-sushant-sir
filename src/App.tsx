import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import "./App.css";
import FormComponent from "./components/FormComponent";
import FormDataDisplay from "./components/FormDataDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/form-data" element={<FormDataDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
