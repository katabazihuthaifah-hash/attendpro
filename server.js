const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { calculateAttendance } = require("./src/attendanceEngine");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "AttendPro API",
    status: "online"
  });
});

app.post("/api/attendance/calculate", (req, res) => {
  try {
    const result = calculateAttendance(req.body);

    res.json({
      success: true,
      attendance: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AttendPro API running on port ${PORT}`);
});
