require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users.routes");
const truckRoutes = require("./routes/trucks.routes");
const routeRoutes = require("./routes/routes.routes");
const maintenanceRoutes = require("./routes/maintenance.routes");
const fuelRoutes = require("./routes/fuel.routes");
const calendarRoutes = require("./routes/calendar.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/trucks", truckRoutes);
app.use("/routes", routeRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/fuel", fuelRoutes);
app.use("/calendar", calendarRoutes);

app.get("/", (req, res) => {
  res.send("API funcionant 🚛");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor al port ${PORT}`);
});