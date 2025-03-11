const ResultSchema = require('../model/resultModel'); // Import the Result model

// Get all results
exports.getAllResults = async (req, res) => {
    try {
        const results = await ResultSchema.find();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching results', error: err.message });
    }
};

// Get result by ID
exports.getResultById = async (req, res) => {
    try {
        const result = await ResultSchema.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching result', error: err.message });
    }
};

// Get by Student and Exam
exports.getResultByStuExa = async (req, res) => {
    try {
        id = req.params.examId + req.params.studentId;
        console.log(id)
        const result = await ResultSchema.findOne({ResultId:id});
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching result', error: err.message });
    }
};

// Create a new result
exports.createResult = async (req, res) => {
    const { StudentId, StudentName, RollNo, ClassId, ClassName, Section, ExamId, ExamName, Subjects, Result } = req.body;
    const id = ExamId + StudentId;  // Unique ID based on StudentId and ExamId
    
    try {
        // Check if a result already exists for the given ExamId and StudentId
        const existingResult = await ResultSchema.findOne({ ResultId: id });

        if (existingResult) {
            // If a result already exists, update it with the new data
            existingResult.StudentName = StudentName;
            existingResult.RollNo = RollNo;
            existingResult.ClassId = ClassId;
            existingResult.ClassName = ClassName;
            existingResult.Section = Section;
            existingResult.ExamName = ExamName;
            existingResult.Subjects = Subjects;
            existingResult.Result = Result;

            // Save the updated result
            const updatedResult = await existingResult.save();
            return res.status(200).json(updatedResult);  // Respond with the updated result
        } else {
            // If no existing result, create a new result
            const newResult = new ResultSchema({
                ResultId: id,
                StudentId,
                StudentName,
                RollNo,
                ClassId,
                ClassName,
                Section,
                ExamId,
                ExamName,
                Subjects,
                Result
            });

            // Save the new result
            const savedResult = await newResult.save();
            return res.status(201).json(savedResult);  // Respond with the created result
        }
    } catch (err) {
        res.status(500).json({ message: 'Error processing result', error: err.message });
        console.log(err)
    }
};


// Update an existing result by ID
exports.updateResult = async (req, res) => {
    try {
        const updatedResult = await ResultSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(updatedResult);
    } catch (err) {
        res.status(500).json({ message: 'Error updating result', error: err.message });
    }
};

// Delete a result by ID
exports.deleteResult = async (req, res) => {
    try {
        const deletedResult = await ResultSchema.findByIdAndDelete(req.params.id);
        if (!deletedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting result', error: err.message });
    }
};

// Controller function to save subject marks for multiple students and create new subjects if needed
exports.saveSubjectMarks = async (req, res) => {
    const { subjectName, examId, examName, classId, className, subjectMarksSend:subjectMarks } = req.body;

    // Check if required fields are provided
    if (!subjectName || !examId || !examName || !classId || !className || !subjectMarks) {
        return res.status(400).json({ message: "Required fields missing!" });
    }

    try {
        // Loop through each student data provided in subjectMarks array
        for (const studentData of subjectMarks) {
            const { studentId, studentName, rollNo, section, obtainedMarks, practicalMarks, totalMarks, grade, minMarks, maxMarks } = studentData;

            // Check if the MinMarks and MaxMarks are provided, if not return an error
            if (minMarks === undefined || maxMarks === undefined) {
                return res.status(400).json({ message: "MinMarks and MaxMarks are required for each student!" });
            }

            // Define the subject object with provided MinMarks and MaxMarks
            const subject = {
                SubjectName: subjectName,
                MinMarks: minMarks,  // MinMarks from the frontend
                MaxMarks: maxMarks,  // MaxMarks from the frontend
                ObtainedMarks: obtainedMarks,
                Practical: practicalMarks,
                TotalMarks: totalMarks,
                Grade: grade
            };

            // Check if the result already exists for this student and exam
            let result = await ResultSchema.findOne({
                StudentId: studentId,
                ExamId: examId
            });

            if (!result) {
                // If no result found, create a new one
                result = new ResultSchema({
                    ResultId: examId+studentId,
                    StudentId: studentId,
                    StudentName: studentName,
                    RollNo: rollNo,
                    ClassId: classId,
                    ClassName: className,
                    Section: section,
                    ExamId: examId,
                    ExamName: examName,
                    Subjects: [subject],
                    Result: totalMarks // The total result is initially set as the TotalMarks for this subject
                });
            } else {
                // If result exists, check if the subject already exists
                const existingSubject = result.Subjects.find(sub => sub.SubjectName === subjectName);

                if (!existingSubject) {
                    // If subject doesn't exist, add the new subject to the Subjects array
                    result.Subjects.push(subject);
                } else {
                    // If subject already exists, update the existing subject's data
                    existingSubject.ObtainedMarks = obtainedMarks;
                    existingSubject.Practical = practicalMarks;
                    existingSubject.TotalMarks = totalMarks;
                    existingSubject.Grade = grade;
                    existingSubject.MinMarks = minMarks;  // Update MinMarks
                    existingSubject.MaxMarks = maxMarks;  // Update MaxMarks
                }

                // Recalculate the total result: sum of all subject TotalMarks
                result.Result = result.Subjects.reduce((acc, sub) => acc + sub.TotalMarks, 0);
            }

            // Save the result document to the database
            await result.save();
        }

        // Return success response
        return res.status(200).json({ message: 'Marks saved successfully!' });
    } catch (err) {
        console.error('Error saving marks:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function to get subject-wise marks for students based on ClassId, Section, and SubjectName
exports.getSubjectWiseMarks = async (req, res) => {
    const { subjectName, classId, section } = req.query; // Get parameters from query string

    // Validate the incoming query parameters
    if (!subjectName || !classId || !section) {
        return res.status(400).json({ message: "SubjectName, ClassId, and Section are required" });
    }

    try {
        // Find all results for the specified class and section
        const results = await ResultSchema.find({
            ClassId: classId,
            Section: section,
        });

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No results found for the specified ClassId and Section" });
        }

        // Prepare the response with subject-wise marks
        const subjectWiseMarks = results.map(result => {
            // Find the subject for the specified subjectName
            const subject = result.Subjects.find(sub => sub.SubjectName === subjectName);

            if (subject) {
                // If the subject exists, return student data with the subject's marks
                return {
                    StudentId: result.StudentId,
                    StudentName: result.StudentName,
                    RollNo: result.RollNo,
                    Section: result.Section,
                    ObtainedMarks: subject.ObtainedMarks,
                    PracticalMarks: subject.Practical,
                    TotalMarks: subject.TotalMarks,
                    Grade: subject.Grade,
                    MinMarks: subject.MinMarks,
                    MaxMarks: subject.MaxMarks
                };
            } else {
                // If the subject is not found, return a message indicating no marks for that subject
                return {
                    StudentId: result.StudentId,
                    StudentName: result.StudentName,
                    RollNo: result.RollNo,
                    Section: result.Section,
                    Message: `No marks found for subject: ${subjectName}`
                };
            }
        });

        // Return the response with subject-wise marks data
        return res.status(200).json(subjectWiseMarks);

    } catch (err) {
        console.error("Error fetching subject marks:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
