import express from 'express';
import {
    createCrime,
    createCriminal,
    createOfficer,
    createProbationOfficer,
    createAppeal,
    createSentence,
    createCrimeCharge,

    getCrimeIDs,
    getProbationOfficerIDs,
    getCriminalIDs,
    getCrimeCodeIDs,
    
    getCrime,
    getAppeal,
    getOfficer,
    getProbationOfficer,
    getCriminal,
    getSentence,
    getCrimeCharge
} from '../controllers/createControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';

const router = express.Router();

router.route('/crime').post(protect, admin, createCrime);
router.route('/crime').get(protect, admin, getCrimeIDs);
router.route('/crime/:id').get(protect, admin, getCrime);

router.route('/criminal').post(protect, admin, createCriminal);
router.route('/criminal').get(protect, admin, getCriminalIDs);
router.route('/criminal/:id').get(protect, admin, getCriminal);

router.route('/officer').post(protect, admin, createOfficer);
router.route('/officer/:id').get(protect, admin, getOfficer);

router.route('/probation-officer').post(protect, admin, createProbationOfficer);
router.route('/probation-officer').get(protect, admin, getProbationOfficerIDs);
router.route('/probation-officer/:id').get(protect, admin, getProbationOfficer);

router.route('/appeal').post(protect, admin, createAppeal);
router.route('/appeal/:id').get(protect, admin, getAppeal);

router.route('/sentence').post(protect, admin, createSentence);
router.route('/sentence/:id').get(protect, admin, getSentence);

router.route('/crime-charge').post(protect, admin, createCrimeCharge);
router.route('/crime-charge/:id').get(protect, admin, getCrimeCharge);

router.route('/crime-code').get(protect, admin, getCrimeCodeIDs);

export default router;