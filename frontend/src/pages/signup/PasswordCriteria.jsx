import "./PasswordCriteria.css";

import { Check, X } from "lucide-react";

function PasswordCriteria({password}) {
  const criterias = [
    { label: "6 Caractères  Minimum", met: password.length >= 6 },
    { label: "Contient une lettre minuscule", met: /[a-z]/.test(password) },
    { label: "Contient une lettre majuscule", met: /[A-Z]/.test(password) },
    { label: "Contient un nombre", met: /\d/.test(password) },
    {
      label: "Contient un charactère spéciale",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div id="singup-page-password-criterias-container">
      {criterias.map((criteria) => (
        <div key={criteria.label} className="signup-page-criteria-container">
          {criteria.met ? (
            <Check style={{ color: "green" }} />
          ) : (
            <X style={{ color: "gray" }} />
          )}
          <span
            className="signup-page-critera-labels"
            style={criteria.met ? { color: "green" } : { color: "gray" }}
          >
            {criteria.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default PasswordCriteria;
