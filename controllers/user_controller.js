const User = require('../models/user');
const Exercise = require('../models/exercise');
const mongoose = require('mongoose');

module.exports = {
    createUser: async function(req,res) {
        let user = new User({
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
        });

        user.save(function (err, user) {
            if (err) {
                res.status(500).json({
                    error: 'Internal server error'
                });
            } else {
                res.status(200).send(user);
            }
        }) 
    },
    createExercise: async function(req,res) {
        if(!req.params) return res.send('not found');
        let user = await User.findById(req.params.id);
        let date;
        if(!user) return res.send('not found');
        else {
            if(req.body.date) date = req.body.date;
            else date = new Date();
            let ex = new Exercise({
                _id: mongoose.Types.ObjectId(),
                username: user._doc.username,
                duration: req.body.duration,
                date: date,
                description: req.body.description
            })
            ex.save(function(err,exer){
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                } else {
                    let obj = {
                        _id: user._doc._id,
                        username: user._doc.username,
                        date: exer._doc.date.toDateString(),
                        duration: exer._doc.duration,
                        description: exer._doc.description
                    }
                    res.status(200).send(obj);
                }
            })
        }
    },
    getExercises: async function(req,res) {
        if(!req.params) return res.send('not found');
        let user = await User.findById(req.params._id);
        if(!user) return res.send('not found');
        else {
            let dateFrom = req.query.from;
            let dateTo = req.query.to;
            
            let conditions = [];
            if (!!dateFrom) {
                conditions.push({date: {$gte: dateFrom}});
            }
            if (!!dateTo) {
                conditions.push({date: {$lte: dateTo}});
            }
            conditions.push({username:user._doc.username});
            let final_condition = conditions.length ? {$and: conditions} : {};
            Exercise.find(final_condition)
            .limit(Number(req.query.limit)||10)
            .exec(function(err,exer){
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                } else {
                    let obj = {
                        _id: user._doc._id,
                        username: user._doc.username,
                        count: exer.length,
                        log: exer
                    }
                    res.status(200).send(obj);
                }
            })
        }
    },
    getUsers: function(req,res) {
        User.find(function(err,users) {
            if(err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(200).send(users);
            }
        })
    }
}