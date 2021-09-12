const Workout = require('../models/Workout.js');
const router = require('express').Router();

// Route for Dashboard - only display 7 days. Sum up the duration of exercises
router.get('/api/workouts/range', (req, res) => {
	Workout.aggregate([
		{ $addFields: { totalDuration: { $sum: '$exercises.duration' } } },
	])
		.sort({ day: -1 })
		.limit(7)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
});

module.exports = router;
