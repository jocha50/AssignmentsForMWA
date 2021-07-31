const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");
const locationController = require("../controllers/locationController");

router
  .route("/jobs")
  .get(jobsController.getAllJobs)
  .post(jobsController.addOneJob);

router
  .route("/jobs/:jobId")
  .get(jobsController.getOneJob)
  .put(jobsController.fullUpdateOneJob)
  .patch(jobsController.partialUpdateOneJob)
  .delete(jobsController.deleteOneJob);
router
  .route("/jobs/:jobId/location")
  .post(locationController.addLocation)
  .get(locationController.getLocation)
  .put(locationController.fullUpdateLocation)
  .patch(locationController.partialUpdateLocation)
  .delete(locationController.deleteLocation);

module.exports = router;
