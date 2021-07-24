const mongoose = require("mongoose");

const Student = mongoose.model("Students");

module.exports.getAllStudents = (req, res) => {
  Student.find().exec((err, students) => {
    const response = {
      status: 200,
      message: students,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.getOneStudent = (req, res) => {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec((err, student) => {
    const response = {
      status: 200,
      message: student,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.getCoursesStudentTaken = (req, res) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("courses")
    .exec((err, student) => {
      const response = {
        status: 200,
        message: student.courses,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      }

      res.status(response.status).json(response.message);
    });
};
module.exports.getCourseStudentTaken = (req, res) => {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  Student.findById(studentId).exec((err, student) => {
    const response = {
      status: 200,
      message: student,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (student) {
      student.courses.forEach((course) => {
        if (courseId === course.ID) {
          response.status = 200;
          response.message = course;
          return;
        }
      });
    } else {
      response.status = 404;
      response.message = `${student.name} did not take course ${courseId}`;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.addStudent = (req, res) => {
  const newStudent = {
    name: req.body.name,
    GPA: req.body.GPA,
    courses: [],
  };

  Student.create(newStudent, (err, createResponse) => {
    const response = {
      status: 201,
      message: createResponse,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }

    console.log(response.message);
    res.status(response.status).json(response.message);
  });
};

module.exports.deleteStudent = (req, res) => {
  const studentId = req.params.studentId;

  Student.findByIdAndDelete(studentId).exec((err, student) => {
    const response = {
      status: 204,
      message: student,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = "game with given ID not found";
    }

    res.status(response.status).json();
  });
};
module.exports.fullUpdateStudent = (req, res) => {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec((err, student) => {
    const response = {
      status: 204,
      message: student,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = "student with given ID not found";
    }

    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      student.name = req.body.name;
      student.GPA = req.body.GPA;
      student.courses = req.body.courses;

      student.save((err, updatedGame) => {
        if (err) {
          response.status = 500;
          response.message = err;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};
module.exports.partialUpdateStudent = (req, res) => {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec((err, student) => {
    const response = {
      status: 204,
      message: student,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = "student with given ID not found";
    }

    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      if (req.body.name) {
        student.name = req.body.name;
      }
      if (req.body.GPA) {
        student.GPA = req.body.GPA;
      }
      if (req.body.courses) {
        student.courses = req.body.courses;
      }

      student.save((err, updatedStudent) => {
        if (err) {
          response.status = 500;
          response.message = err;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};
