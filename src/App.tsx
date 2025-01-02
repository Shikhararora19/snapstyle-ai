// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Results from "./pages/Results";
import Cart from "./components/Cart";
import ProtectedRoute from "./ProtectedRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import './index.css'; // Adjust path as per your project structure


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/results"
            element={
                <ProtectedRoute>
                <Results />
                </ProtectedRoute>
            }
        />
        <Route path="/cart" element={
            <ProtectedRoute>
                <Cart />
            </ProtectedRoute>
        } />
        <Route path='/payment-success' element={
            <ProtectedRoute>
                <PaymentSuccess />
            </ProtectedRoute>
        } />
        <Route path='/payment-failure' element={
            <ProtectedRoute>
                <PaymentFailure />
            </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
