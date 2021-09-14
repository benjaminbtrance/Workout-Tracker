const router = require('express').Router();
const Workout = require('../models/Workout.js');

// View the total duration of each workout from the past seven workouts on the stats page
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
