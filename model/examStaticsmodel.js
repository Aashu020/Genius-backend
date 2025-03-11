const mongoose = require("mongoose");

const examStaticsModel = new mongoose.Schema({
  ExamId: { type: String, required: true, unique: true },
  AcademicYear: { type: String, required: true },
  ExamName: { type: String, required: true },
  TheoryMaxMarks: { type: Number },
  TheorypassingMarks: { type: Number },
  Time: { type: String },
  BluePrint: [
    {
      Section: { type: String },
      QuestionNo: { type: Number },
      Marks: { type: Number },
      TotalMarks: { type: Number },
    },
  ],
  PracticalMarks: {
    type: Number,
  },
  TotalMarks: { type: Number },
  Status: { type: String, required: true },
});

const ExamStatic = mongoose.model("ExamStatic", examStaticsModel);
module.exports = ExamStatic;
