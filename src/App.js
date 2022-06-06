import React, { Component } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Components/Login.Component";
import Register from "./Components/Register.Component";
import PartnerAdd from "./Components/PartnerAdd.Component";
import Offer from "./Components/Offer.Component";
import PartnerEdit from "./Components/PartnerEdit.Component";
import OfferAdd from "./Components/OfferAdd.Component";
import Partner from "./Components/Partner.Component";
import OfferEdit from "./Components/OfferEdit.Component";
import Home from "./Components/Home.Component";
import ProtectedRoute from "./Components/Common/ProtectedRoute.Component";
import { getCurrentUser,logout } from "./service/userService";
import UserContext from "./Context/UserContext";
import { useNavigate } from "react-router-dom";
function App() {
  const [user, setUser] = useState({});
  const navigation = useNavigate();
  useEffect(() => {
    if (!Object.keys(user).length) {
      (async () => {
        let userResponse = await getCurrentUser();
        let { data: userData } = userResponse;
        if (userData.status && userData.status == "ok") {
          setUser(userData.data);
        }
      })();
    }
  });

  const handleLogout = async ()=>{
    await logout();
    setUser({});
    navigation("/login");
  }
  return (
    <div className="container">
     
        <UserContext.Provider value={{ user,handleLogout }}>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />

            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/partner"
              element={
                user.type == "admin" ? (
                  <ProtectedRoute>
                    <Partner />
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/partner/create"
              element={
                <ProtectedRoute>
                  <PartnerAdd />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/partner/:id/edit"
              element={
                <ProtectedRoute>
                  <PartnerEdit />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/partner/:id/offers"
              element={
                <ProtectedRoute>
                  <Offer />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/partner/:id/offers/create"
              element={
                <ProtectedRoute>
                  <OfferAdd />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/offer/:id/edit"
              element={
                <ProtectedRoute>
                  <OfferEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserContext.Provider>
    </div>
  );
}

export default App;
