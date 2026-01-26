import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";

import Home from "./pages/home/Home";
import MessagesPage from "./pages/message/MessagePage";
import SondagesPage from "./pages/sondages/SondagesPage";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/pofile/ProfilePage.jsx";

import { useAuthStore } from "./store/authStore.js";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sondages" element={authUser ? <SondagesPage /> : <Navigate to="/sign-up"/>} />
      <Route path="/messages" element={authUser ? <MessagesPage /> : <Navigate to="/sign-up"/>} />
      <Route path="/sign-up" element={authUser ? <Navigate to="/" /> : <SignupPage />} />
      <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/sign-up"/>}/>
    </Routes>
  );
}

export default App;
