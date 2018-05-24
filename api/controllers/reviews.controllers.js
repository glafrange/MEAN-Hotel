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
      var review = hotel.reviews.id(reviewId);
      var response = {
        status : 200,
        message : review
      }
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

var _addReview = function(req, res, hotel) {
  hotel.reviews.push({
    name : req.body.name,
    rating : parseInt(req.body.rating, 10),
    review : req.body.review
  });
  
  hotel.save(function(err, hotelUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(201)
        .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
    }
  });
}

// Add new review
module.exports.reviewsAddOne = function(req, res) {
  var hotelId = req.params.hotelId;
  console.log("GET hotelId", hotelId);
  
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        }
      } 
      if (doc) {
        _addReview(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
}

module.exports.reviewsUpdateOne = function(req, res) {
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
      if (response.status !== 200) {
        res
          .status(200)
          .json(response.message);
      } else {
        review.name = req.body.name;
        review.rating = parseInt(req.body.rating, 10);
        review.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err)
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
      
    });
}