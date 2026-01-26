import "./LoginPage.css";

import { Link } from "react-router";
import { useState } from "react";

import { useAuthStore } from "../../store/authStore.js";

function LoginPage() {
  const { isLoggingIn, login } = useAuthStore();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((!userData.email.trim() || !userData.password.trim()) === "") {
      return;
    }
    login(userData);
  };

  if (isLoggingIn) {
    return (
      <div id="login-page-loading-container">
        <h2 id="login-page-loading-text">Chargement...</h2>
      </div>
    );
  }
  return (
    <>
      <header id="login-page-header-container">
        <h1 id="login-page-header-title">Se connecter</h1>
      </header>
      <main id="login-page-main-container">
        <form action="" id="login-page-form-container" onSubmit={handleSubmit}>
          <div id="login-page-input-label-container">
            <div className="login-page-form-labels-inputs-container">
              <label className="login-page-form-label">Email</label>
              <input
                className="login-page-form-input"
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="login-page-form-labels-inputs-container">
              <label className="login-page-form-label">Mot de passe</label>
              <input
                className="login-page-form-input"
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div id="login-page-submit-link-container">
            <button
              id="login-page-form-submit-button"
              type="submit"
              disabled={isLoggingIn}
            >
              Se connecter
            </button>
            <Link
              to="/sign-up"
              id="login-page-to-login-link"
              disabled={isLoggingIn}
            >
              S'Inscrire ?
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default LoginPage;
