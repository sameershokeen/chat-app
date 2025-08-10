import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import { useAuthStore } from "./store/useAuthStore";

import { useEffect } from "react";

const App = () => {

  const{ authUser,cheakAuth} = useAuthStore()
  useEffect(() => {
    cheakAuth();
  }, [ cheakAuth ]);
  // Log the authUser to check if it's being set correctly
  console.log("Auth User:", authUser);

  
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  );
};

export default App;
