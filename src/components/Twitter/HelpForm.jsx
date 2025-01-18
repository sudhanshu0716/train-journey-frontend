import React, { useState } from "react";
import "./HelpForm.css";

const COACH_LETTERS = ["A", "B", "S", "H", "G", "D", "C", "E", "M"];
const ISSUES = [
  "AC not working",
  "Seat/berth issue",
  "Cleanliness",
  "Water availability",
  "Electrical socket",
  "Other",
];

export default function HelpForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hasPNR: "",
    pnr: "",
    trainNumber: "",
    date: "",
    coachLetter: "",
    coachNumber: "",
    issue: "",
  });
  const [finalForm, setFinalForm] = useState("");

  const handlePNROptionSelect = (value) => {
    setFormData({ ...formData, hasPNR: value });
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.hasPNR === "yes") {
      setFinalForm(
        `@IRCTCofficial I am currently facing a significant issue with my recent journey. My PNR is ${formData.pnr}, and the specific problem I am encountering is ${formData.issue}. This has caused a lot of inconvenience.`
      );
    } else {
      setFinalForm(
        `@IRCTCofficial I am facing a significant issue with my recent journey. Train Number: ${formData.trainNumber}, Coach: ${formData.coachLetter}${formData.coachNumber}, Date: ${formData.date}. The issue is ${formData.issue}.`
      );
    }
    console.log("Form submitted. Final form:", finalForm);
  };

  const validatePNR = (pnr) => {
    return /^\d{10}$/.test(pnr);
  };

  const validateTrainNumber = (number) => {
    return /^\d{5}$/.test(number);
  };

  const validateCoachNumber = (number) => {
    return /^\d{1,2}$/.test(number);
  };

  const goBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="help-form-container desktop">
      <div className="help-form-content">
        {step > 1 && (
          <button onClick={goBack} className="back-button">
            ← Back
          </button>
        )}

        <div className="progress-bar">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`progress-step ${i <= step ? "active" : ""}`}
            />
          ))}
        </div>

        <h1 className="form-title">Instant Help</h1>

        {step === 1 && (
          <div className="form-section animate-fade-in">
            <h2 className="section-title">Do you have PNR?</h2>
            <div className="pnr-options">
              {["yes", "no"].map((option) => (
                <button
                  key={option}
                  className={`pnr-option ${
                    formData.hasPNR === option ? "selected" : ""
                  }`}
                  onClick={() => handlePNROptionSelect(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && formData.hasPNR === "yes" && (
          <form onSubmit={handleSubmit} className="form-section animate-slide-in">
            <div className="form-field">
              <label htmlFor="pnr">Enter your 10-digit PNR number</label>
              <input
                id="pnr"
                type="text"
                maxLength={10}
                required
                value={formData.pnr}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setFormData({ ...formData, pnr: value });
                  }
                }}
                className={`form-input ${
                  formData.pnr && !validatePNR(formData.pnr) ? "error" : ""
                }`}
              />
              {formData.pnr && !validatePNR(formData.pnr) && (
                <span className="error-message">Enter 10 digits PNR</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="issue">Select Issue</label>
              <select
                id="issue"
                value={formData.issue}
                onChange={(e) =>
                  setFormData({ ...formData, issue: e.target.value })
                }
                className="form-input"
                required
              >
                <option value="">Select an issue</option>
                {ISSUES.map((issue) => (
                  <option key={issue} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={!validatePNR(formData.pnr) || !formData.issue}
            >
              Submit
            </button>
          </form>
        )}

        {step === 2 && formData.hasPNR === "no" && (
          <form onSubmit={handleSubmit} className="form-section animate-slide-in compact">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="trainNumber">Train Number</label>
                <input
                  id="trainNumber"
                  type="text"
                  maxLength={5}
                  required
                  value={formData.trainNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 5) {
                      setFormData({ ...formData, trainNumber: value });
                    }
                  }}
                  className={`form-input ${
                    formData.trainNumber && !validateTrainNumber(formData.trainNumber)
                      ? "error"
                      : ""
                  }`}
                />
                {formData.trainNumber &&
                  !validateTrainNumber(formData.trainNumber) && (
                    <span className="error-message">Enter 5 digits train number</span>
                  )}
              </div>

              <div className="form-field">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="coachLetter">Coach Letter</label>
                <select
                  id="coachLetter"
                  value={formData.coachLetter}
                  onChange={(e) =>
                    setFormData({ ...formData, coachLetter: e.target.value })
                  }
                  className="form-input"
                  required
                >
                  <option value="">Select</option>
                  {COACH_LETTERS.map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="coachNumber">Coach Number</label>
                <input
                  id="coachNumber"
                  type="text"
                  maxLength={2}
                  required
                  value={formData.coachNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 2) {
                      setFormData({ ...formData, coachNumber: value });
                    }
                  }}
                  className={`form-input ${
                    formData.coachNumber &&
                    !validateCoachNumber(formData.coachNumber)
                      ? "error"
                      : ""
                  }`}
                />
                {formData.coachNumber &&
                  !validateCoachNumber(formData.coachNumber) && (
                    <span className="error-message">
                      Enter 1 or 2 digits coach number
                    </span>
                  )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="issue">Select Issue</label>
              <select
                id="issue"
                value={formData.issue}
                onChange={(e) =>
                  setFormData({ ...formData, issue: e.target.value })
                }
                className="form-input"
                required
              >
                <option value="">Select an issue</option>
                {ISSUES.map((issue) => (
                  <option key={issue} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={
                !validateTrainNumber(formData.trainNumber) ||
                !formData.date ||
                !formData.coachLetter ||
                !validateCoachNumber(formData.coachNumber) ||
                !formData.issue
              }
            >
              Submit
            </button>
          </form>
        )}
        <div className="background-graphics"></div>
      </div>
    </div>
  );
}

