const Route = require('../model/routeName'); // Adjust the path as necessary

// Get all routes
exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a route by ID
exports.getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new route
exports.createRoute = async (req, res) => {
    const { RouteName, RouteAmount } = req.body;
    const newRoute = new Route({ RouteName, RouteAmount });

    try {
        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a route by ID
exports.updateRoute = async (req, res) => {
    try {
        const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRoute) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json(updatedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a route by ID
exports.deleteRoute = async (req, res) => {
    try {
        const deletedRoute = await Route.findByIdAndDelete(req.params.id);
        if (!deletedRoute) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
