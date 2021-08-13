const mongoose = require("mongoose");

const Country = mongoose.model("Country");

module.exports.getAllHotels = (req, res) => {
  const countryId = req.params.countryId;

  Country.findById(countryId)
    .select("additionalInfo")
    .exec((err, country) => {
      const response = {
        status: 200,
        message: country.additionalInfo.bestHotels,
      };
      if (err) {
        response.status = 500;
        response.message = `server error${err}`;
      } else if (!country) {
        response.status = 404;
        response.message = `we don't have a country by ID number ${countryId}`;
      }

      res.status(response.status).json(response.message);
    });
};

const _addOneHotel = (req, res, country) => {
  const newHotel = {
    hotelName: req.body.hotelName,
    address:req.body.address,
    phone: req.body.phone,
    description: req.body.description,

  };

  console.log(country.additionalInfo);
  country.additionalInfo.bestHotels.push(newHotel);
  country.save((err) => {
    const response = {
      status: 201, //creation successful
      message: country.additionalInfo.bestHotels,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};
module.exports.addOneHotel = (req, res) => {
  const countryId = req.params.countryId;

  Country.findById(countryId).exec((err, country) => {
    const response = {
      status: 200,
      message: country,
    };
    if (err) {
      response.status = 500;
      response.message = `server error${err}`;
    } else if (!country) {
      response.status = 404;
      response.message = `we don't have a country by ID number ${countryId}`;
    }

    if (response.status !== 200) {
      res.status(response.status).json(response.message);
    } else {
      _addOneHotel(req, res, country);
    }
  });
};

const _getOneHotel = (req, res, hotels) => {
  const hotelId = req.params.hotelId;

  const response = {
    status: 404,
    message: `sorry we do not have hotel by the id ${hotelId}`,
  };
  // console.log(country[0].additionalInfo.bestHotels,'get one hotel');
  // console.log(typeof(hotelId),"hotelId");
  // hotels.forEach(hotel=>{
  //     if(hotelId === hotel._id.toString()){
  //         // console.log(hotel);
  //         response.status=200; //successful
  //         response.message=hotel;
  //     }
  // })
  const hotel = hotels.id(hotelId);
  if (hotel) {
    response.status = 200;
    response.message = hotel;
  }

  res.status(response.status).json(response.message);
};
module.exports.getOneHotel = (req, res) => {
  const countryId = req.params.countryId;

  Country.findById(countryId)
    .select("additionalInfo")
    .exec((err, country) => {
      const response = {
        status: 200,
        message: country,
      };
      if (err) {
        response.status = 500;
        response.message = `server error${err}`;
      } else if (!country) {
        response.status = 404;
        response.message = `we don't have a country by ID number ${countryId}`;
      }

      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        // console.log(country,"country");
        _getOneHotel(req, res, country.additionalInfo.bestHotels);
      }
    });
};

const _deleteOneHotel = (req, res, country) => {
  const hotelId = req.params.hotelId;

  country.additionalInfo.bestHotels.id(hotelId).remove();

  country.save((err) => {
    const response = {
      status: 204,
      message: "successfuly deleted",
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};
module.exports.deleteOneHotel = (req, res) => {
  const countryId = req.params.countryId;

  Country.findById(countryId)
    .select("additionalInfo")
    .exec((err, country) => {
      const response = {
        status: 204,
        message: country.additionalInfo.bestHotels,
      };
      if (err) {
        response.status = 500;
        response.message = `server error${err}`;
      } else if (!country) {
        response.status = 404;
        response.message = `we don't have a country by ID number ${countryId}`;
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        // console.log(country,"country");
        _deleteOneHotel(req, res, country);
      }
    });
};

const _fullUpdateOneHotel = (req, res, country) => {
  const hotelId = req.params.hotelId;
  const response = {
    status: 404,
    message: `we do not have a hotel by the ID ${hotelId}`,
  };

  const hotelToBeUpdated = country.additionalInfo.bestHotels.id(hotelId);
  if (!hotelToBeUpdated) {
    res.status(response.status).json(response.message);
  } else {
    hotelToBeUpdated.hotelName = req.body.hotelName;
    hotelToBeUpdated.phone = req.body.phone;
    hotelToBeUpdated.description = req.body.description;
    hotelToBeUpdated.address= req.body.address;
    country.save((err) => {
      const response = {
        status: 204,
        message: hotelToBeUpdated,
      };
      if (err) {
        response.status = 500; //server error
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  }
};

module.exports.fullUpdateOneHotel = (req, res) => {
  const countryId = req.params.countryId;

  Country.findById(countryId)
    .select("additionalInfo")
    .exec((err, country) => {
      const response = {
        status: 204,
        message: country.additionalInfo.bestHotels,
      };
      if (err) {
        response.status = 500;
        response.message = `server error${err}`;
      } else if (!country) {
        response.status = 404;
        response.message = `we don't have a country by ID number ${countryId}`;
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        // console.log(country,"country");
        _fullUpdateOneHotel(req, res, country);
      }
    });
};

const _partialUpdateOneHotel = (req, res, country) => {
  const hotelId = req.params.hotelId;
  const response = {
    status: 404,
    message: `we do not have a hotel by the ID ${hotelId}`,
  };

  const hotelToBeUpdated = country.additionalInfo.bestHotels.id(hotelId);

  if (!hotelToBeUpdated) {
    res.status(response.status).json(response.message);
  } else  {
    if (req.body.hotelName) {
      hotelToBeUpdated.hotelName = req.body.hotelName;
    }
    if (req.body.phone) {
      hotelToBeUpdated.phone = req.body.phone;
    }
    if (req.body.description) {
      hotelToBeUpdated.description = req.body.description;
    }
    if(req.body.address){
        hotelToBeUpdated.address = req.body.address;
    }
    country.save((err) => {
      const response = {
        status: 204,
        message: hotelToBeUpdated,
      };
      if (err) {
        response.status = 500; //server error
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  }
};

module.exports.partialUpdateOneHotel = (req, res) => {
  const countryId = req.params.countryId;

  Country.findById(countryId)
    .select("additionalInfo")
    .exec((err, country) => {
      const response = {
        status: 204,
        message: country.additionalInfo.bestHotels,
      };
      if (err) {
        response.status = 500;
        response.message = `server error${err}`;
      } else if (!country) {
        response.status = 404;
        response.message = `we don't have a country by ID number ${countryId}`;
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        // console.log(country,"country");
        _partialUpdateOneHotel(req, res, country);
      }
    });
};
