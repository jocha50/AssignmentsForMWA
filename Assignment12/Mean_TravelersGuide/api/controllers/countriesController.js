const mongoose = require("mongoose");

const Country = mongoose.model("Country");

//************************************************************************************************************************* */
//get all countries
//************************************************************************************************************************* */

function __getAllCountries(res, countries) {
  const response = {
    status: 200,
    message: countries,
  };
  if (!countries) {
    response.status = 404;
    response.message =
      "please make sure you are requesting from the right database.";
  }
  res.status(response.status).json(response.message);
}
function __getAllCountriesError(res) {
  res.status(500).json(err);
}

function __searchResultError(res, err) {
  res.status(500).json(err);
}
function __searchResult(res, countries) {
  const response = {
    status: 200,
    message: countries,
  };
  if (!countries) {
    response.status = 404;
    response.message = "no countries found";
  }
  res.status(response.status).json(response.message);
}

const geoSearch = (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  let minDistance = parseFloat(req.query.minDistance);
  let maxDistance = parseFloat(req.query.maxDistance);

  if (!minDistance) {
    //minimum distance to start with
    minDistance = 0;
  }

  if (!maxDistance) {
    //maximum distance to cover
    maxDistance = 1000;
  }

  console.log("Geo search lng,lat", lng, lat);

  const query = {
    coordinates: {
      $near: {
        $geometry: {
          coordinates: [lng, lat],
        },
        $maxDistance: maxDistance,
        $minDistance: minDistance,
      },
    },
  };
  Country.find(query)
    .exec()
    .then(__searchResult.bind(null, res))
    .catch(__searchResultError.bind(null, res));

  // Country.find(query).exec(function (err, countries) {
  //   console.log(countries, "countries");
  //   const response = {
  //     status: 200,
  //     message: countries,
  //   };
  //   if (err) {
  //     response.status = 500;
  //     response.message = err;
  //   }
  //   res.status(response.status).json(response.message);
  // });
};

module.exports.getAllCountries = (req, res) => {
  if (req.query && req.query.lat && req.query.lng) {
    geoSearch(req, res);
    return;
  }
  let count = parseInt(process.env.COUNT);
  let offset = parseInt(process.env.OFFSET);
  const maxToDisplay = process.env.MAX_TO_DISPLAY;

  console.log("count and offset", count, offset);

  if (req.query && req.query.count) {
    count = parseInt(req.query.count);

    if (count > maxToDisplay) {
      count = maxToDisplay;
    }
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (isNaN(count) || isNaN(offset)) {
    res.status(400).json({ message: `count and offset should be numbers` });
  } else {
    console.log("count and offset", count, offset);
    Country.find()
      .limit(count)
      .skip(offset)
      .exec()
      .then(__getAllCountries.bind(null, res))
      .catch(__getAllCountriesError.bind(null, res));
  }
};

//************************************************************************************************************************* */
//add one country
//************************************************************************************************************************* */

function __addOneCountry(res, createdCountry) {
  res.status(201).json(createdCountry);
}
function __addOneCountryError(res, err) {
  res.status(500).json(err);
}

module.exports.addOneCountry = (req, res) => {
  const newCountry = {
    countryName: req.body.countryName,
    capitalCity: req.body.capitalCity,
    officialLanguage: req.body.officialLanguage,
    currency: req.body.currency,
    population: req.body.population,
    coordinates: [parseFloat(req.body.lat), parseFloat(req.body.lng)],
    additionalInfo: {
      timeZone: req.body.timeZone,
      bestTimeToVisit: req.body.bestTimeToVisit,
    },
  };

  Country.create(newCountry)
    .then(__addOneCountry.bind(null, res))
    .catch(__addOneCountryError.bind(null, res));
};

//************************************************************************************************************************* */

//************************************************************************************************************************* */
//get one country
//************************************************************************************************************************* */

function __getOneCountry(res, country) {
  const response = {
    status: 200,
    message: country,
  };
  if (!country) {
    response.status = 404;
    response.message = `we don't have a country by ID number ${countryId}`;
  }
  res.status(response.status).json(response.message);
}

function __getOneCountryError(res, err) {
  res.status(500).json({ err: err });
}

module.exports.getOneCountry = (req, res) => {
  const countryId = req.params.countryId;
  Country.findById(countryId)
    .exec()
    .then(__getOneCountry.bind(null, res))
    .catch(__getOneCountryError.bind(null, res));
};

//************************************************************************************************************************* */

//************************************************************************************************************************* */
//delete a country
//************************************************************************************************************************* */

function __deleteCountry(res, country) {
  const response = {
    status: 204,
    message: country,
  };
  if (!country) {
    response.status = 404;
    response.message = `we don't have a country by that ID number `;
  }
  res.status(response.status).json(response.message);
}

function __deleteCountryError(res, err) {
  res.status(500).json(err);
}

module.exports.deleteCountry = (req, res) => {
  const countryId = req.params.countryId;

  Country.findByIdAndDelete(countryId)
    .exec()
    .then(__deleteCountry.bind(null, res))
    .catch(__deleteCountryError.bind(null, res));
};

//************************************************************************************************************************* */

//************************************************************************************************************************* */
//full update country
//************************************************************************************************************************* */

function __saveCountry(res, updatedCountry) {
  console.log("saved!!!!");
  res.status(204).json(updatedCountry);
}
function __saveCountryError(res, err) {
  console.log("saving error");
  res.status(500).json(err);
}

function __fullUpdateCountryError(res, err) {
  console.log("updating error", err);
  res.status(500).json(err);
}
function __fullUpdateCountry(req, res, country) {
  const response = {
    status: 204, //updating
    message: country,
  };
  if (!country) {
    response.status = 404;
    response.message = `we don't have a country by that ID number}`;
  }

  if (response.status !== 204) {
    res.status(response.status).json(response.message);
  } else {
    console.log("about to update");
    country.countryName = req.body.countryName;
    country.capitalCity = req.body.capitalCity;
    country.officialLanguage = req.body.officialLanguage;
    country.currency = req.body.currency;
    country.population = req.body.population;
    country.coordinates = [parseFloat(req.body.lat), parseFloat(req.body.lng)];
    country.additionalInfo.timeZone = req.body.timeZone;
    country.additionalInfo.bestTimeToVisit = req.body.bestTimeToVisit;

    country
      .save()
      .then(__saveCountry.bind(null, res))
      .catch(__saveCountryError.bind(null, res));
  }
}

module.exports.fullUpdateCountry = (req, res) => {
  const countryId = req.params.countryId;
  Country.findById(countryId)
    .exec()
    .then(__fullUpdateCountry.bind(null, req, res))
    .catch(__fullUpdateCountryError.bind(null, res));
};

//************************************************************************************************************************* */

//************************************************************************************************************************* */
//partial update country
//************************************************************************************************************************* */

function __partialUpdateCountryError() {
  console.log("updating error", err);
  res.status(500).json(err);
}
function __partialUpdateCountry(req, res, country) {
  const response = {
    status: 204, //updating
    message: country,
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
    if (req.body.countryName) {
      country.countryName = req.body.countryName;
    }
    if (req.body.capitalCity) {
      country.capitalCity = req.body.capitalCity;
    }
    if (req.body.officialLanguage) {
      country.officialLanguage = req.body.officialLanguage;
    }
    if (req.body.currency) {
      country.currency = req.body.currency;
    }
    if (req.body.population) {
      country.population = req.body.population;
    }
    if (req.body.lat && req.body.lng) {
      country.coordinates = [
        parseFloat(req.body.lat),
        parseFloat(req.body.lng),
      ];
    }

    if (req.body.timeZone) {
      country.additionalInfo.timeZone = req.body.timeZone;
    }
    if (req.body.bestTimeToVisit) {
      country.additionalInfo.bestTimeToVisit = req.body.bestTimeToVisit;
    }

    country
      .save()
      .then(__saveCountry.bind(null, res))
      .catch(__saveCountryError.bind(null, res));
  }
}

module.exports.partialUpdateCountry = (req, res) => {
  const countryId = req.params.countryId;
  Country.findById(countryId)
    .exec()
    .then(__partialUpdateCountry.bind(null, req, res))
    .catch(__partialUpdateCountryError.bind(null, res));
};
