const PayrollData = require('../model/payrollDataModel');
const AcademicYearInfo = require('../model/academicYearInfo');
const moment = require('moment-timezone');
const Counter = require('../model/counterModel');
const PaySlip = require('../model/paySlipModel');


// Create or update PayrollData
exports.createPayrollData = async (req, res) => {
    const { EmployeeId, EmployeeName, Payments } = req.body; // Destructure properties
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    let recId;
    // console.log(req.body.Payments.Fee)

    try {

        let counter = await Counter.findOne({ Title: `PAYROLL-${year}-${month}` });

        if (!counter) {
            counter = new Counter({ Title: `PAYROLL-${year}-${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }

        recId = `PAYROLL${year}${month}${counter.Count.toString().padStart(4, '0')}`;

        var savePayments = { ...Payments[0], SlipId: recId }
        // console.log(Payments);
        // console.log(savePayments);

        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        var id = EmployeeId + academicYear.StartYear + academicYear.EndYear;
        // Check if PayrollData with the given PayrollID exists
        let payrollData = await PayrollData.findOne({ PayrollID: id });

        if (payrollData) {
            // If it exists, push new Payments data into the Payments array
            payrollData.Payments.push(savePayments); // Spread operator to add multiple payment entries
            var recept = new PaySlip({ SlipId: recId, EmployeeId, EmployeeName, Amount: savePayments.TotalSalary, Date: moment.tz("Asia/Kolkata").format('DD-MM-YYYY'), Months: savePayments.Month });
            await payrollData.save();
            await recept.save();
            await counter.save();
            // console.log(payrollData)
            return res.status(200).json(payrollData);
        } else {
            // If it does not exist, create a new PayrollData entry
            payrollData = new PayrollData({ PayrollID: id, EmployeeId, EmployeeName, Payments: savePayments });
            var recept = new PaySlip({ SlipId: recId, EmployeeId, EmployeeName, Amount: savePayments.TotalSalary, Date: moment.tz("Asia/Kolkata").format('DD-MM-YYYY'), Months: savePayments.Month });
            await payrollData.save();
            await recept.save();
            await counter.save();
            // console.log(payrollData)
            return res.status(201).json(payrollData);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error)
    }
};


// Get all PayrollData records
exports.getAllPayrollData = async (req, res) => {
    try {
        const payrollRecords = await PayrollData.find();
        res.status(200).json(payrollRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get PayrollData by PayrollID
exports.getPayrollDataByPayrollID = async (req, res) => {
    try {
        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        var id = req.params.payrollID + academicYear.StartYear + academicYear.EndYear;
        console.log(id)
        const payrollData = await PayrollData.findOne({ PayrollID: id });
        if (!payrollData) return res.status(404).json({ message: 'PayrollData not found' });
        res.status(200).json(payrollData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update PayrollData by PayrollID
exports.updatePayrollData = async (req, res) => {
    const { EmployeeId, Payments } = req.body; // Destructure properties

    try {
        const payrollData = await PayrollData.findOneAndUpdate(
            { PayrollID: req.params.payrollID },
            { EmployeeId, Payments },
            { new: true }
        );
        if (!payrollData) return res.status(404).json({ message: 'PayrollData not found' });
        res.status(200).json(payrollData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete PayrollData by PayrollID
exports.deletePayrollData = async (req, res) => {
    try {
        const payrollData = await PayrollData.findOneAndDelete({ PayrollID: req.params.payrollID });
        if (!payrollData) return res.status(404).json({ message: 'PayrollData not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
