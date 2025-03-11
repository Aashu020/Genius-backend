const Login = require('../model/loginModel');

// Login function
exports.login = async (req, res) => {
    const { Id, Password } = req.body;

    try {
        const user = await Login.findOne({ Id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        if (user.Password !== Password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Successful login (you may want to return a token here)
        res.status(200).json({ message: 'Login successful', role: user.Role, Data:user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change password function
exports.changePassword = async (req, res) => {
    const { Id, OldPassword, NewPassword } = req.body;

    try {
        const user = await Login.findOne({ Id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check the old password
        if (user.Password !== OldPassword) {
            return res.status(401).json({ message: 'Invalid old password' });
        }

        // Update the password
        user.Password = NewPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllLogins = async (req, res) => {
    try {
        const logins = await Login.find();
        res.status(200).json(logins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to create a new login entry
exports.createLogin = async (req, res) => {
    try {
        // Destructure the data from the request body
        const { Id, Password, Role, DesignationName } = req.body;

        // Create a new login document
        const newLogin = new Login({
            Id,
            Password,
            Role,
            DesignationName
        });

        // Save the new login to the database
        await newLogin.save();

        // Send a success response
        res.status(201).json({
            message: 'Login created successfully!',
            data: newLogin
        });
    } catch (error) {
        console.error('Error creating login:', error);
        res.status(500).json({
            message: 'Error creating login',
            error: error.message
        });
    }
};

// Controller to update an existing login
exports.updateLogin = async (req, res) => {
    const { id } = req.params;
    const { Id, Password, Role, DesignationName } = req.body;

    try {
        const updatedLogin = await Login.findByIdAndUpdate(id, {
            Id,
            Password,
            Role,
            DesignationName
        }, { new: true });

        if (!updatedLogin) {
            return res.status(404).json({ message: 'Login not found' });
        }

        res.status(200).json({
            message: 'Login updated successfully',
            data: updatedLogin
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating login', error: error.message });
    }
};

// Controller to delete a login
exports.deleteLogin = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLogin = await Login.findByIdAndDelete(id);

        if (!deletedLogin) {
            return res.status(404).json({ message: 'Login not found' });
        }

        res.status(204).json({
            message: 'Login deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting login', error: error.message });
    }
};
