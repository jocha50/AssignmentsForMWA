const { Router } = require("express");
const countriesController = require("../controllers/countriesController");
const hotelsController = require("../controllers/hotelsController");

const router = Router();

router
  .route("/countries")
  .get(countriesController.getAllCountries)
  .post(countriesController.addOneCountry);

router
  .route("/countries/:countryId")
  .get(countriesController.getOneCountry)
  .delete(countriesController.deleteCountry)
  .put(countriesController.fullUpdateCountry)
  .patch(countriesController.partialUpdateCountry);



router
  .route("/countries/:countryId/hotels")
  .post(hotelsController.addOneHotel)
  .get(hotelsController.getAllHotels);

router
  .route("/countries/:countryId/hotels/:hotelId")
  .get(hotelsController.getOneHotel)
  .delete(hotelsController.deleteOneHotel)
  .put(hotelsController.fullUpdateOneHotel)
  .patch(hotelsController.partialUpdateOneHotel);
module.exports = router;
