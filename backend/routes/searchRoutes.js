import express from 'express';

const router = express.Router();

router.get('/crime', (req, res) => {
    res.send('Crime search');
})

router.get('/criminal', (req, res) => {
    res.send('Criminal search');
})

router.get('/officer', (req, res) => {
    res.send('Officer search');
})

router.get('/probation-officer', (req, res) => {
    res.send('Probation Officer search');
})

export default router;