const Department = require("../model/departmentModel"); // Ensure this import is correct

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new department
exports.createDepartment = async (req, res) => {
    const { DepartmentName, Description } = req.body;

    // Ensure that Designation is an array of objects
    // if (!Array.isArray(Designation)) {
    //     return res.status(400).json({ message: "Designation must be an array of objects" });
    // }

    const newDepartment = new Department({
        DepartmentName,
        Designation:[],
        Description
    });

    try {
        const savedDepartment = await newDepartment.save();
        res.status(201).json(savedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a department
exports.updateDepartment = async (req, res) => {
    try {
        const { DepartmentName, Designation, Description } = req.body;
        const departmentId = req.params.id;

        // Check if the department exists
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        // Prepare the update data
        const updatedData = {};

        if (DepartmentName) updatedData.DepartmentName = DepartmentName;
        if (Description) updatedData.Description = Description;

        // Ensure that Designation is an array of objects
        if (Designation) {
            if (!Array.isArray(Designation)) {
                return res.status(400).json({ message: "Designation must be an array of objects" });
            }
            updatedData.Designation = Designation; // Designation should be an array of objects [{ DesignationName, Description }]
        }

        // Update the department
        const updatedDepartment = await Department.findByIdAndUpdate(
            departmentId,
            updatedData,
            { new: true, runValidators: true } // runValidators ensures the data respects the schema constraints
        );

        if (!updatedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }

        // Send back the updated department details
        res.status(200).json(updatedDepartment);

    } catch (error) {
        console.error("Error updating department:", error);
        res.status(400).json({ message: error.message });
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
        if (!deletedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
