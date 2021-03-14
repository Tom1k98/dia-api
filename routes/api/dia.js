const express = require('express');
const { Error } = require('mongoose');
const router = express.Router();
const DailyLevel = require('../../models/DailyLevel')

// get all records
router.get('/', (req, res) => {
    DailyLevel.find()
    .then(data => {
        res.json({
            msg: data
        })
    })
    .catch(err => {
        res.json({
            error: err
        })
    })
})

// get latest 7 records
router.get('/latest', (req, res) => {
    DailyLevel.find().sort({_id: -1}).limit(7)
    .then(data => {
        res.json({
            msg: data
        })
    })
    .catch(err => {
        res.json({
            error: err
        })
    })
})

// get n records
router.get('/records', (req, res) => {
    DailyLevel.find().sort({_id: -1}).limit(parseInt(req.query.n))
    .then(data => {
        res.json({
            msg: data
        })
    })
    .catch(err => {
        res.json({
            error: err
        })
    })
})


// find by criteria
router.get('/find', (req, res) => {
    if(req.query.day) {
        DailyLevel.find({ day : req.query.day })
        .then(data => {
            res.json({msg: data ? data : "No data found"})
        })
        .catch(err => {
            res.json({err : err})
        })
    } else if(req.query.year) {
        DailyLevel.find({ year : req.query.year })
        .then(data => {
            res.json({msg: data ? data : "No data found"})
        })
        .catch(err => {
            res.json({err : err})
        })
    } else {
        res.statusCode(400).jaon({err: "No valid query dound"})
    }
})

router.post('/', (req, res) => {
    if (!req.body.glucoseLevel) {
        res.json({msg: 'Error, you nned to provide glucose level as glucoseLevel'})
    } else {
        const newEntry = new DailyLevel({
            glucoseLevel: req.body.glucoseLevel,
            time: Date.now()
        })
        newEntry.save()
        .then(ok => {
            res.json({
                msg: 'Success! New entry created',
                entry: newEntry
            })
        })
        .catch(err => {
            res.json({
                msg: 'Error',
                error: err
            })
        })
    }
})

router.delete('/', (req, res) => {
    if(req.query.day) {
        DailyLevel.deleteMany({day : req.query.day})
        .then(result => {
            res.json({msg: result.deletedCount==0 ? 'no data deleted' : `Succesfully deleted ${result.deletedCount} item(s)`})
        })
        .catch(err => {
            res.json({msg: "Error", err: err})
        })
    } else if(req.query.month) {
        DailyLevel.deleteMany({month : req.query.month})
        .then(result => {
            res.json({msg: result.deletedCount==0 ? 'no data deleted' : `Succesfully deleted ${result.deletedCount} item(s)`})
        })
        .catch(err => {
            res.json({msg: "Error", err: err})
        })
    }
    else if(req.query.id) {
        DailyLevel.deleteOne({ _id : req.query.id })
        .then(res => {
            res.json({msg: 'Success! record deeted'})
        })
        .catch(err => {
            res.json({err : err})
        })
    }
})


module.exports = router;