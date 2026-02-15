const express = require("express");
const app = express();

app.use(express.json());

app.post("/validate-booking", (req, res) => {
  const { venue, date, timeSlot } = req.body;

  if (!venue || !date || !timeSlot) {
    return res.status(400).json({
      success: false,
      message: "Missing required booking fields"
    });
  }

  // Basic time slot validation
  if (!timeSlot.includes("–")) {
    return res.status(400).json({
      success: false,
      message: "Invalid time slot format"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Booking data validated successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
