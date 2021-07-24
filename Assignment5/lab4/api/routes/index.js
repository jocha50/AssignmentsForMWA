const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/studentsController");

router
  .route("/students")
  .get(studentsController.getAllStudents)
  .post(studentsController.addStudent);
router
  .route("/students/:studentId")
  .get(studentsController.getOneStudent)
  .delete(studentsController.deleteStudent)
  .put(studentsController.fullUpdateStudent)
  .patch(studentsController.partialUpdateStudent);
router
  .route("/students/:studentId/courses")
  .get(studentsController.getCoursesStudentTaken);
router
  .route("/students/:studentId/courses/:courseId")
  .get(studentsController.getCourseStudentTaken);

// router.route('/games/:gameId').get(controllerGames.getOneGame);

// router.route('/games/:gameId/publisher').get(controllerPublisher.getOnePublisher);
module.exports = router;
