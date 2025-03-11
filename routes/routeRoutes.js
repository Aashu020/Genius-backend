const express = require("express");
const router = express.Router();
const {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
} = require("../controller/routeController");

// Route to get all routes
router.get("/all", getAllRoutes);

// Route to get a route by ID
router.get("/get/:id", getRouteById);

// Route to create a new route
router.post("/add", createRoute);

// Route to update a route by ID
router.put("/update/:id", updateRoute);

// Route to delete a route by ID
router.delete("/delete/:id", deleteRoute);

module.exports = router;
