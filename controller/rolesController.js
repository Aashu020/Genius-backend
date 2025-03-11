const Roles = require('../model/rolesModel');

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Roles.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new role
exports.createRole = async (req, res) => {
    const { RoleName, Description } = req.body;
    
    const newRole = new Roles({
        RoleName,
        Description
    });

    try {
        const savedRole = await newRole.save();
        res.status(201).json(savedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    try {
        const updatedRole = await Roles.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    try {
        const deletedRole = await Roles.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
