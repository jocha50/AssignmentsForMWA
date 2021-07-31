const mongoose = require("mongoose");

const Job = mongoose.model("Job");

const _addLocation = (req, res, job) => {
  job.location.coordinates = [
    parseFloat(req.body.lng),
    parseFloat(req.body.lat),
  ];
  job.save((err, savedJob) => {
    const response = {
      status: 201,
      message: savedJob,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201; //creation
      response.message = savedJob.location;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.addLocation = (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId).exec((err, job) => {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!job) {
      response.status = 404;
      response.message = `job with ${jobId} not found`;
    }
    if (job) {
      _addLocation(req, res, job);
    } else {
      res.status(response.status).json(response.message);
    }
  });
};

module.exports.getLocation = (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select("location")
    .exec((err, job) => {
      const response = {
        status: 200,
        message: "",
      };
      console.log(job, "job");
      if (err) {
        response.status = 500;
        response.message = err;
      }
      if (!job) {
        response.status = 404;
        response.message = `job with ${jobId} not found`;
      } else {
        response.status - 200;
        response.message = job.location;
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.fullUpdateLocation = (req, res) => {
  console.log("inside full update location");
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select("location")
    .exec((err, job) => {
      const response = {
        status: 204,
        message: "Job fully updated Successfully",
      };
      if (err) {
        response.status = 500; //server error
        response.message = err;
      }
      if (!job) {
        response.status = 404;
        response.message = `sorry we do not have job by the id ${jobId}`;
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        job.location.coordinates = [
          parseFloat(req.body.lng),
          parseFloat(req.body.lat),
        ];

        job.save((err) => {
          if (err) {
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(response.message);
        });
      }
    });
};

module.exports.partialUpdateLocation = (req, res) => {
  console.log("inside partial update location");
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select("location")
    .exec((err, job) => {
      const response = {
        status: 204,
        message: "Job partial updated Successfully",
      };
      if (err) {
        response.status = 500; //server error
        response.message = err;
      }
      if (!job) {
        response.status = 404;
        response.message = `sorry we do not have job by the id ${jobId}`;
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        if (req.body.lng) {
          console.log(job.location.coordinates[0], "lng");
          job.location.coordinates.splice(0, 1, parseFloat(req.body.lng)); //remove one item from the array at index 0 and update it with the value ...
        }
        if (req.body.lat) {
          job.location.coordinates.splice(1, 1, parseFloat(req.body.lat));
        }
        job.save((err, updatedJob) => {
          if (err) {
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(response.message);
        });
      }
    });
};

module.exports.deleteLocation = (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select("location")
    .exec((err, job) => {
      const response = {
        status: 204,
        message: "",
      };
      console.log(job, "job");
      if (err) {
        response.status = 500;
        response.message = err;
      }
      if (!job) {
        response.status = 404;
        response.message = `job with ${jobId} not found`;
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        console.log(job.location.coordinates, "before deleting");
        job.location.coordinates.splice(0, 2); //remove 2 items in the array starting from index 0
        console.log(job.location.coordinates, "after deleting");
        job.save((err) => {
          if (err) {
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(response.message);
        });
      }
    });
};
