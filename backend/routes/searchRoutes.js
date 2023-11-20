import express from 'express';
import { getCrimeSearchResults, 
    getCriminalSearchResults, 
    getOfficerSearchResults, 
    getProbationOfficerSearchResults } from '../controllers/searchControllers.js';

    
const router = express.Router();

router.get('/crime', getCrimeSearchResults);
    
router.get('/criminal', getCriminalSearchResults);

router.get('/officer', getOfficerSearchResults);

router.get('/probation-officer', getProbationOfficerSearchResults);


export default router;