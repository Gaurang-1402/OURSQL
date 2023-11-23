import express from 'express';
import { getCrimeSearchResults, 
    getCriminalSearchResults, 
    getOfficerSearchResults, 
    getProbationOfficerSearchResults, getAppealSearchResults, getSentenceSearchResults, getCrimeChargeSearchResults } from '../controllers/searchControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';
    
const router = express.Router();

router.route('/crime').post(protect, getCrimeSearchResults);
router.route('/criminal').post(protect, getCriminalSearchResults);
router.route('/officer').post(protect, getOfficerSearchResults);
router.route('/probation-officer').post(protect, getProbationOfficerSearchResults);
router.route('/appeal').post(protect, getAppealSearchResults);
router.route('/sentence').post(protect, getSentenceSearchResults);
router.route('/crime-charge').post(protect, getCrimeChargeSearchResults);

export default router;