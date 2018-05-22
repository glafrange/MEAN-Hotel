var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res){
  console.log("GET the hotels");
  res
    .status(200)
    .json(hotelData);
};

module.exports.hotelsGetOne = function(req, res){
  var hotelId = req.params.hotelId;
  console.log("GET hotelId", hotelId);
  var thisHotel = hotelData[hotelId];
  res
    .status(200)
    .json(thisHotel);
};