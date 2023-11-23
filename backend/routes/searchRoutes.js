import express from 'express';
import { getCrimeSearchResults, 
    getCriminalSearchResults, 
    getOfficerSearchResults, 
    getProbationOfficerSearchResults, getAppealSearchResults } from '../controllers/searchControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';
    
const router = express.Router();

router.route('/crime').get(protect, getCrimeSearchResults);
router.route('/criminal').get(protect, getCriminalSearchResults);
router.route('/officer').get(protect, getOfficerSearchResults);
router.route('/probation-officer').get(protect, getProbationOfficerSearchResults);
router.route('/appeal').get(protect, getAppealSearchResults);


export default router;