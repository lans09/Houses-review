const Review = require('../models/review');
const House = require('../models/house');

const createReview = async (req, res, next) => {
  try {
    const { rating, comment, houseId } = req.body;

    // Find the house with the provided ID
    const house = await House.findById(houseId);

    // Check if the house exists
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'House not found'
      });
    }

    // Create a new review object
    const review = new Review({
      rating,
      comment,
      user: req.user._id, // assuming the user is authenticated and we have access to the user ID
      house: house._id
    });

    // Save the review to the database
    await review.save();

    // Add the review to the house reviews array
    house.reviews.push(review);

    // Update the house rating
    const totalRating = house.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    house.rating = totalRating / house.reviews.length;

    // Save the updated house to the database
    await house.save();

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
