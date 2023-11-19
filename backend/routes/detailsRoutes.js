import express from 'express';
import { getCrimeDetails, getCriminalDetails, getOfficerDetails, getProbationOfficerDetails } from '../controllers/detailsControllers.js';

const router = express.Router();

router.get('/crime', getCrimeDetails);

router.get('/criminal', getCriminalDetails);

router.get('/officer', getOfficerDetails);

router.get('/probation-officer', getProbationOfficerDetails)

export default router;