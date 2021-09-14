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

// Add exercises to the most recent workout plan
router.put('/api/workouts/:id', (req, res) => {
	Workout.updateOne(
		{ _id: req.params.id },
		{ $push: { exercises: req.body } },
		(err, dbWorkout) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.send(dbWorkout);
			}
		}
	);
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

// View the combined weight of multiple exercises from the past seven workouts on the stats page
router.get('/api/workouts', (req, res) => {
	Workout.aggregate([
		{ $addFields: { totalDuration: { $sum: '$exercises.duration' } } },
	])
		.sort({ day: -1 })
		.limit(1)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
});

module.exports = router;
