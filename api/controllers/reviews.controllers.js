var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res) {
  var hotelId = req.params.hotelId;
  console.log("GET hotelId", hotelId);
  
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res
      .status(response.status)
      .json(response.message);
    });
};

// GET single review for a hotel
module.exports.reviewsGetOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);
  
  Hotel
    .findById(hotelId)
    .select("reviews")
    .exec(function(err, hotel) {
      var response = {
        status : 200,
        message : hotel
      }
      var review = hotel.reviews.id(reviewId);
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!review) {
        response.status = 404;
        response.message = {
          "message" : "Review not found"
        };
      }
      console.log("Returned review" + !review);
      res
      .status(200)
      .json(response.message);
    });
};