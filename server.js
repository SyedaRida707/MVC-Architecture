
const express = require("express");

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Import student routes
const studentRoutes = require("./routes/studentRoutes");

// Use student routes
app.use("/api/students", studentRoutes);

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
