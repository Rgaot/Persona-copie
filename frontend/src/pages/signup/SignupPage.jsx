import "./SignupPage.css";

import { Link } from "react-router";
import { useState } from "react";

import { useAuthStore } from "../../store/authStore.js";
import PasswordCriteria from "./PasswordCriteria";

function SignupPage() {
  const { signup, isSigningUp } = useAuthStore();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  if (isSigningUp) {
    return (
      <div id="sigup-page-loading-container">
        <h2 id="signup-page-loading-text">Chargement...</h2>
      </div>
    );
  }

  const validateForm = () => {
    if (!userData.username.trim()) {
      return false;
    }
    if (!userData.email.trim()) {
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      return false;
    }
    if (!userData.password.trim()) {
      return false;
    }
    if (userData.password.length < 6) {
      return false;
    }

    const hasLowerCase = /[a-z]/.test(userData.password);
    const hasUpperCase = /[A-Z]/.test(userData.password);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(userData.password);
    const hasNumber = /\d/.test(userData.password);

    if (!hasLowerCase || !hasUpperCase || !hasSpecialCharacter || !hasNumber) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = validateForm();
    if (success) {
      signup(userData);
    }
  };
  return (
    <>
      <header id="signup-page-header-container">
        <h1 id="signup-page-header-title">Inscription</h1>
      </header>
      <main id="signup-page-main-container">
        <form id="signup-page-form-container" onSubmit={handleSubmit}>
          <div id="signup-page-input-label-container">
            <div className="signup-page-form-labels-inputs-container">
              <label className="signup-page-form-label">
                Nom d'utilisateur
              </label>
              <input
                className="signup-page-form-input"
                type="text"
                placeholder="Nom d'utilisateur"
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className="signup-page-form-labels-inputs-container">
              <label className="signup-page-form-label">Email</label>
              <input
                className="signup-page-form-input"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="signup-page-form-labels-inputs-container">
              <label className="signup-page-form-label">Mot de passe</label>
              <input
                className="signup-page-form-input"
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  });
                }}
              />
              {userData.password.length > 0 && (
                <PasswordCriteria password={userData.password} />
              )}
            </div>
          </div>

          <div id="signup-page-submit-link-container">
            <button
              id="signup-page-form-submit-button"
              type="submit"
              disabled={isSigningUp}
            >
              S'inscrire
            </button>
            <Link
              to="/login"
              id="signup-page-to-login-link"
              disabled={isSigningUp}
            >
              Se connecter ?
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default SignupPage;
