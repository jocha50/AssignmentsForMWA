const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Job = mongoose.model("Job");

module.exports.getAllJobs = (req, res) => {

let currentDate= new Date();
console.log('current date:',currentDate.getMonth() + 1)

  let count = parseInt(process.env.COUNT);
  let offset = parseInt(process.env.OFFSET);
  const MAX_DISPLAY = 7;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
    console.log(count);
    if (count >= MAX_DISPLAY) {
      //making sure the user sees no more than 7 games
      count = MAX_DISPLAY;
    }
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (isNaN(count) || isNaN(offset)) {
    res.status(400).json({ message: "count and offset must be numbers" }); // status code 400 -> user error
  } else {
    Job.find()
      .limit(count)
      .skip(offset)
      .exec((err, jobs) => {
        const response = {
          status: 200,
          message: jobs,
        };
        if (err) {
          response.status = 500; //server error
          response.message = err;
        }
        res.status(response.status).json(response.message);
      });
  }
};

module.exports.addOneJob = (req, res) => {

  // bcrypt.genSalt(10,(err,salt)=>{
  //   bcrypt.hash(req.body.salary,salt,(err,hashedSalary)=>{
      // console.log('hashed salary',hashedSalary)

      let skillsAsArray = null;
  if (req.body.skills) {
    skillsAsArray = req.body.skills.toString().split(","); //converts string of skills separated by comma to an array of skills, ofcouse this should be stated in the documentation we will provide for our API
    console.log(skillsAsArray);
  }else{
    skillsAsArray=req.body.skills; //just incase they want to make skills filed empty
}
  const newJob = {
    title: req.body.title,
    salary: req.body.salary,
    description: req.body.description,
    skills: skillsAsArray,
    postDate: req.body.postDate,
    location:{},
    reviews: {},
  };

  Job.create(newJob, (err, createdJob) => {
    
    const response = {
      status: 201,
      message: createdJob,
    };
    if (err) {
      response.status = 500; //server error
      response.message = err;
    }
    console.log('response message',response.message);
    res.status(response.status).json(response.message);
  });

  //bcrypt
  //   })
  // })

  
};

module.exports.getOneJob = (req, res) => {

  const jobId = req.params.jobId;

  Job.findById(jobId).exec((err, job) => {
    console.log('month ', job.postDate.getMonth())
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      response.status = 500; //server error
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.fullUpdateOneJob = (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select("-location -reviews")
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
        //NB - > since mongoose does the parsing , i don't need to do it.
        
       

        job.title = req.body.title;
        job.salary = req.body.salary;
        job.description = req.body.description;
        job.postDate = req.body.postDate;
        if (req.body.skills) {
          
          // console.log('type of skills',typeof(req.body.skills))

            job.skills = req.body.skills.toString().split(","); //converts string of skills separated by comma to an array of skills, ofcouse this should be stated in the documentation we will provide for our API
            
          }else{
              job.skills=req.body.skills; //just incase they want to make skills filed empty
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
module.exports.partialUpdateOneJob = (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .select("-location -reviews")
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
        //NB - > since mongoose does the parsing , i don't need to do it.
        if (req.body.title) {
          job.title = req.body.title;
        }
        if (req.body.salary) {
          job.salary = req.body.salary;
        }
        if (req.body.description) {
          job.description = req.body.description;
        }
        if (req.body.skills) {
          job.skills = req.body.skills;
        }
        if (req.body.skills) {
            job.skills = req.body.skills.toString().split(","); //converts string of skills separated by comma to an array of skills, ofcouse this should be stated in the documentation we will provide for our API
            
          }
          else{
            job.skills=req.body.skills; //just incase they want to make skills filed empty
        }
       
        if(req.body.postDate){
            job.postDate = req.body.postDate;
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
module.exports.deleteOneJob = (req, res) => {
  const jobId = req.params.jobId;

  Job.findByIdAndDelete(jobId).exec((err) => {
    const response = {
      status: 204,
      message: "job deleted",
    };
    if (err) {
      response.status = 500; //server error
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};
