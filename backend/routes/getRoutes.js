import express from 'express';
import {getCrimeIDs,
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
} from '../controllers/getControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';

const router = express.Router();

router.route('/crime').get(protect, getCrimeIDs);
router.route('/crime/:id').get(protect, getCrime);


router.route('/criminal').get(protect, getCriminalIDs);
router.route('/criminal/:id').get(protect, getCriminal);

router.route('/officer/:id').get(protect, getOfficer);

router.route('/appeal/:id').get(protect, getAppeal);

router.route('/probation-officer').get(protect, getProbationOfficerIDs);
router.route('/probation-officer/:id').get(protect, getProbationOfficer);

router.route('/sentence/:id').get(protect, getSentence);

router.route('/crime-charge/:id').get(protect, getCrimeCharge);

router.route('/crime-code').get(protect, getCrimeCodeIDs);


export default router;