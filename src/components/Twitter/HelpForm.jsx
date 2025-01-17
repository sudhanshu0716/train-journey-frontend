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

  const handlePNROptionSelect = (value) => {
    setFormData({ ...formData, hasPNR: value });
    setStep(2);
  };

  const goBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="help-form-container">
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
          <div className="form-section">
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
          <form className="form-section">
            <div className="form-field">
              <label htmlFor="pnr">Enter your 10-digit PNR number</label>
              <input
                id="pnr"
                type="text"
                maxLength={10}
                pattern="\d{10}"
                required
                value={formData.pnr}
                onChange={(e) =>
                  setFormData({ ...formData, pnr: e.target.value })
                }
                className="form-input"
              />
            </div>
          </form>
        )}

        {step === 2 && formData.hasPNR === "no" && (
          <form className="form-section">
            <div className="form-field">
              <label htmlFor="trainNumber">Train Number</label>
              <input
                id="trainNumber"
                type="text"
                maxLength={5}
                pattern="\d{5}"
                required
                value={formData.trainNumber}
                onChange={(e) =>
                  setFormData({ ...formData, trainNumber: e.target.value })
                }
                className="form-input"
              />
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

            <div className="coach-details">
              <div className="form-field">
                <label htmlFor="coachLetter">Coach Letter</label>
                <select
                  id="coachLetter"
                  value={formData.coachLetter}
                  onChange={(e) =>
                    setFormData({ ...formData, coachLetter: e.target.value })
                  }
                  className="form-input"
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
                  pattern="\d{1,2}"
                  required
                  value={formData.coachNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, coachNumber: e.target.value })
                  }
                  className="form-input"
                />
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
              >
                <option value="">Select an issue</option>
                {ISSUES.map((issue) => (
                  <option key={issue} value={issue}>
                    {issue}
                  </option>
                ))}
              </select>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
