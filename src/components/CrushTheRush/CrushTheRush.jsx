import React, { useState } from "react";
import { motion } from "framer-motion";
import { checkReports, submitReport } from "../../api/api"; 
import "./crush.css";

const CrushTheRush = () => {
  const [checkTrainNo, setCheckTrainNo] = useState("");
  const [checkDate, setCheckDate] = useState("");
  const [checkResult, setCheckResult] = useState("");

  const [trainNo, setTrainNo] = useState("");
  const [date, setDate] = useState("");
  const [scale, setScale] = useState(5);

  const [averageScale, setAverageScale] = useState(null);
  const [crowdMessage, setCrowdMessage] = useState("");

  const handleCheckSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await checkReports(checkTrainNo, checkDate);
      if (data.reports) {
        const { reports, averageScale } = data;
        setCheckResult(`Reports for Train No. ${checkTrainNo} on ${checkDate}`);
        setAverageScale(averageScale);

        if (averageScale > 8) {
          setCrowdMessage("Don't board this train, it's too overcrowded.");
        } else if (averageScale >= 5) {
          setCrowdMessage("Crowded but has a chance to board.");
        } else {
          setCrowdMessage("Easy to board, no crowd or medium crowd.");
        }
      }
    } catch (error) {
      setCheckResult("No reports available for this train on the given date.");
      setAverageScale(null);
      setCrowdMessage("");
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReport(trainNo, date, scale);
      alert(`Report submitted for Train No. ${trainNo} on ${date} with a scale of ${scale}`);
      setTrainNo("");
      setDate("");
      setScale(5);
    } catch (error) {
      alert("Error submitting the report.");
    }
  };

  return (
    <div className="crush-container">
      <motion.div
        className="crush-form-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="crush-title">Crush the Rush</h2>
        <div className="form-section">
          <h3 className="section-title">Check Train Rush</h3>
          <form onSubmit={handleCheckSubmit}>
            <input
              type="text"
              value={checkTrainNo}
              onChange={(e) => setCheckTrainNo(e.target.value)}
              placeholder="Enter Train Number"
              required
            />
            <input
              type="date"
              value={checkDate}
              onChange={(e) => setCheckDate(e.target.value)}
              required
            />
            <button type="submit"  className="button-check">Check</button>
          </form>
          {checkResult && <p>{checkResult}</p>}
          {averageScale !== null && (
            <div className="meter-container">
              <p>Average Scale: {averageScale}</p>
              <input
                type="range"
                min="1"
                max="10"
                value={averageScale}
                readOnly
                className="crowd-meter"
              />
              <p>{crowdMessage}</p>
            </div>
          )}
        </div>
        <div className="form-section">
          <h3 className="section-title">Provide Train Report</h3>
          <form onSubmit={handleReportSubmit}>
            <input
              type="text"
              value={trainNo}
              onChange={(e) => setTrainNo(e.target.value)}
              placeholder="Enter Train Number"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="number"
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              min="1"
              max="10"
              required
            />
            <button type="submit" className="button-check">Submit Report</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CrushTheRush;
