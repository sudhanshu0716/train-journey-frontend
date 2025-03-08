
import { useState } from "react"
import { motion } from "framer-motion"

import { checkReports, submitReport } from "../../api/api";

import './crush.css';


const CrushTheRush = () => {
  const [checkTrainNo, setCheckTrainNo] = useState("")
  const [checkDate, setCheckDate] = useState("")
  const [checkResult, setCheckResult] = useState("")

  const [trainNo, setTrainNo] = useState("")
  const [date, setDate] = useState("")
  const [scale, setScale] = useState(5)

  const [averageScale, setAverageScale] = useState(null)
  const [crowdMessage, setCrowdMessage] = useState("")

  const [showPopup, setShowPopup] = useState(false)
  const [showSubmitPopup, setShowSubmitPopup] = useState(false)

  const handleCheckSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await checkReports(checkTrainNo, checkDate)
      if (data.reports) {
        const { reports, averageScale } = data
        setCheckResult(`Reports for Train No. ${checkTrainNo} on ${checkDate}`)
        setAverageScale(averageScale)

        if (averageScale > 8) {
          setCrowdMessage("Don't board this train, it's too overcrowded.")
        } else if (averageScale >= 5) {
          setCrowdMessage("Crowded but has a chance to board.")
        } else {
          setCrowdMessage("Easy to board, no crowd or medium crowd.")
        }
        setShowPopup(true)
      }
    } catch (error) {
      setCheckResult("No reports available for this train on the given date.")
      setAverageScale(null)
      setCrowdMessage("")
      setShowPopup(true)
    }
  }

  const handleReportSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitReport(trainNo, date, scale)
      setCheckResult(`Report submitted for Train No. ${trainNo} with scale ${scale}`)
      setTrainNo("")
      setDate("")
      setScale(5)
      setShowSubmitPopup(true)
    } catch (error) {
      alert("Error submitting the report.")
    }
  }

  const closePopup = () => {
    setShowPopup(false)
    setShowSubmitPopup(false)
  }

  const getCrowdLevelClass = (level) => {
    if (level === null) return "level-unknown"
    if (level > 8) return "level-high"
    if (level >= 5) return "level-medium"
    return "level-low"
  }

  return (
    <div className="crush-container">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="crush-header"
        >
          <h1 className="crush-title">Crush the Rush</h1>
          <p className="crush-subtitle">Check train crowdedness or submit your own report</p>
        </motion.div>

        <div className="crush-grid">
          {/* Left Column - Check Train Rush */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="crush-column"
          >
            <div className="crush-card">
              <div className="crush-card-header check-header">
                <h2 className="crush-card-title">
                  <span className="icon">ℹ️</span>
                  Check Train Rush
                </h2>
                <p className="crush-card-description">Find out how crowded a train will be</p>
              </div>
              <div className="crush-card-content">
                <form onSubmit={handleCheckSubmit} className="crush-form">
                  <div className="form-group">
                    <label htmlFor="checkTrainNo" className="form-label">
                      Train Number
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🚆</span>
                      <input
                        id="checkTrainNo"
                        type="text"
                        value={checkTrainNo}
                        onChange={(e) => setCheckTrainNo(e.target.value)}
                        placeholder="Enter Train Number"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkDate" className="form-label">
                      Date of Travel
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📅</span>
                      <input
                        id="checkDate"
                        type="date"
                        value={checkDate}
                        onChange={(e) => setCheckDate(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="form-button check-button">
                    Check Crowdedness
                  </button>
                </form>
              </div>
              <div className="crush-card-footer">Based on reports from other travelers</div>
            </div>
          </motion.div>

          {/* Right Column - Provide Train Report */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="crush-column"
          >
            <div className="crush-card">
              <div className="crush-card-header report-header">
                <h2 className="crush-card-title">
                  <span className="icon">📊</span>
                  Provide Train Report
                </h2>
                <p className="crush-card-description">Help others by sharing your experience</p>
              </div>
              <div className="crush-card-content">
                <form onSubmit={handleReportSubmit} className="crush-form">
                  <div className="form-group">
                    <label htmlFor="trainNo" className="form-label">
                      Train Number
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🚆</span>
                      <input
                        id="trainNo"
                        type="text"
                        value={trainNo}
                        onChange={(e) => setTrainNo(e.target.value)}
                        placeholder="Enter Train Number"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date" className="form-label">
                      Date of Travel
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📅</span>
                      <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="slider-header">
                      <label htmlFor="scale" className="form-label">
                        Crowdedness Scale (1-10)
                      </label>
                      <span className="scale-value">{scale}</span>
                    </div>
                    <input
                      id="scale"
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={scale}
                      onChange={(e) => setScale(Number.parseInt(e.target.value))}
                      className="form-slider"
                    />
                    <div className="slider-labels">
                      <span>Empty</span>
                      <span>Moderate</span>
                      <span>Packed</span>
                    </div>
                  </div>

                  <button type="submit" className="form-button report-button">
                    Submit Report
                  </button>
                </form>
              </div>
              <div className="crush-card-footer">Your reports help fellow travelers plan better</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Train Report Dialog */}
      {showPopup && (
        <div className="dialog-overlay" onClick={closePopup}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3 className="dialog-title">
                <span className="icon">ℹ️</span>
                Train Report
              </h3>
              <button className="dialog-close" onClick={closePopup}>
                ×
              </button>
            </div>
            <div className="dialog-body">
              <p className="dialog-description">{checkResult}</p>

              {averageScale !== null ? (
                <div className="report-details">
                  <div className="crowd-meter-header">
                    <span>Average Crowdedness:</span>
                    <span className="crowd-value">{averageScale.toFixed(1)}</span>
                  </div>

                  <div className="crowd-meter-container">
                    <div className="crowd-meter-bg">
                      <div
                        className={`crowd-meter-fill ${getCrowdLevelClass(averageScale)}`}
                        style={{ width: `${(averageScale / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="crowd-meter-labels">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>

                  <div className={`crowd-message ${getCrowdLevelClass(averageScale)}`}>
                    <span className="icon">{averageScale > 8 ? "⚠️" : "✅"}</span>
                    <p>{crowdMessage}</p>
                  </div>
                </div>
              ) : (
                <div className="no-data-message">No data available for this train on the selected date.</div>
              )}
            </div>

            <div className="dialog-footer">
              <button className="dialog-button" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Submission Dialog */}
      {showSubmitPopup && (
        <div className="dialog-overlay" onClick={closePopup}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3 className="dialog-title">
                <span className="icon">✅</span>
                Report Submitted
              </h3>
              <button className="dialog-close" onClick={closePopup}>
                ×
              </button>
            </div>
            <div className="dialog-body">
              <p className="dialog-description">{checkResult}</p>
            </div>

            <div className="dialog-footer">
              <button className="dialog-button" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default CrushTheRush

