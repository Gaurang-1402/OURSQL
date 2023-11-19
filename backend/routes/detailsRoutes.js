import express from 'express';

const router = express.Router();

router.get('/crime', (req, res) => {
    res.send('Crime details');
})

router.get('/criminal', (req, res) => {
    res.send('Criminal details');
})

router.get('/officer', (req, res) => {
    res.send('Officer details');
})

router.get('/probation-officer', (req, res) => {
    res.send('Probation Officer details');
})

export default router;