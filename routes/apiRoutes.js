const router = require('express').Router();
const Workout = require('../models/Workout.js');

// Add new exercises to a new workout plan
router.post('/api/workouts', (req, res) => {
	Workout.create({})
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
			res.sendStatus(500);
		});
});

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
