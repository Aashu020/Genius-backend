const FeeData = require('../model/feeDataModel');
const AcademicYearInfo = require('../model/academicYearInfo');
const FeeSlab = require('../model/feeSlabModel');
const moment = require('moment-timezone');
const Counter = require('../model/counterModel');
const FeeReceipt = require('../model/feeReciptModel');


// Create a new FeeData or update existing FeeData
exports.createFeeData = async (req, res) => {
    const { StudentId, Payments, RemainingFee, TotalFee, PaymentMode, section, Balance, enrollClass, stuName } = req.body;
    const month = moment().format('MM');
    const year = moment().format('YYYY');
    let recId;
    // console.log(req.body.Payments.Fee)

    try {

        let counter = await Counter.findOne({ Title: `FEE-${year}-${month}` });

        if (!counter) {
            counter = new Counter({ Title: `FEE-${year}-${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }

        recId = `FEE${year}${month}${counter.Count.toString().padStart(4, '0')}`;

        var savePayments = { ...Payments, ReceiptId: recId }

        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        var id = StudentId + academicYear.StartYear + academicYear.EndYear;
        // Check if FeeID already exists 
        let feeData = await FeeData.findOne({ FeeID: id });

        if (feeData) {
            // If exists, push new payment data into Payments array
            feeData.Payments.push(savePayments);
            
            // Update RemainingFee and TotalFee as needed
            // feeData.RemainingFee -= Payments.Fee.reduce((sum, payment) => sum + payment.Amount, 0);
            // console.log(feeData.RemainingFee, Payments.Fee.reduce((sum, payment) => sum + payment.Amount, 0))
            feeData.Balance = Balance; // You can adjust this logic based on your requirements
            feeData.RemainingFee = RemainingFee;
            var recept = new FeeReceipt({ ReceiptId: recId, Amount: savePayments.PaidAmount, PendingFee: RemainingFee, Class: enrollClass, Section: section, Date: moment.tz("Asia/Kolkata").format('DD-MM-YYYY'), Mode: savePayments.Mode, PaymentMode: PaymentMode, Months: savePayments.Months, StudentId: StudentId, StudentName: stuName });
            
            // console.log(savePayments);
            // console.log(feeData)
            // console.log(recept)
            // Save the updated document
            await feeData.save();
            await recept.save();
            await counter.save();
            return res.status(200).json(feeData);
        } else {
            // If not exists, create new FeeData
            feeData = new FeeData({ FeeID: id, StudentId, Payments: savePayments, RemainingFee, TotalFee, Balance });
            var recept = new FeeReceipt({ ReceiptId: recId, Amount: savePayments.PaidAmount, PendingFee: RemainingFee, Class: enrollClass, Section: section, Date: moment.tz("Asia/Kolkata").format('DD-MM-YYYY'), Mode: savePayments.Mode, Months: savePayments.Months, StudentId: StudentId, StudentName: stuName });
            await feeData.save();
            await recept.save();
            await counter.save();
            // console.log(feeData)
            // console.log(recept)
            return res.status(201).json(feeData);
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

exports.createData = async (req, res) => {
    const { StudentId, ClassId } = req.body;

    try {
        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        var id = StudentId + academicYear.StartYear + academicYear.EndYear;
        let feeData = await FeeData.findOne({ FeeID: id });
        if (!feeData) {
            const feeSlab = await FeeSlab.findOne({ ClassId });
            if (!feeSlab) {
                return res.status(400).json({ message: "Create Fee Slab First" });
            }
            feeData = new FeeData({ FeeID: id, StudentId, Payments: [], RemainingFee: feeSlab.TotalFee, TotalFee: feeSlab.TotalFee, Balance: 0 });
            await feeData.save();
        }
        return res.status(201).json(feeData);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}


// Get all FeeData records
exports.getAllFeeData = async (req, res) => {
    try {
        const feeDataRecords = await FeeData.find();
        res.status(200).json(feeDataRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get FeeData by FeeID
exports.getFeeDataByFeeID = async (req, res) => {
    try {
        const academicYear = await AcademicYearInfo.findOne({ Status: "Active" });
        var id = req.params.feeID + academicYear.StartYear + academicYear.EndYear;
        const feeData = await FeeData.findOne({ FeeID: id });
        if (!feeData) return res.status(404).json({ message: 'FeeData not found' });
        res.status(200).json(feeData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update FeeData by FeeID
exports.updateFeeData = async (req, res) => {
    const { StudentId, Payments, RemainingFee, TotalFee } = req.body;

    try {
        const feeData = await FeeData.findOneAndUpdate(
            { FeeID: req.params.feeID },
            { StudentId, Payments, RemainingFee, TotalFee },
            { new: true }
        );
        if (!feeData) return res.status(404).json({ message: 'FeeData not found' });
        res.status(200).json(feeData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete FeeData by FeeID
exports.deleteFeeData = async (req, res) => {
    try {
        const feeData = await FeeData.findOneAndDelete({ FeeID: req.params.feeID });
        if (!feeData) return res.status(404).json({ message: 'FeeData not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
