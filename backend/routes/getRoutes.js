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

router.route('/crime').get(protect, admin, getCrimeIDs);
router.route('/crime/:id').get(protect, admin, getCrime);


router.route('/criminal').get(protect, admin, getCriminalIDs);
router.route('/criminal/:id').get(protect, admin, getCriminal);

router.route('/officer/:id').get(protect, admin, getOfficer);

router.route('/appeal/:id').get(protect, admin, getAppeal);

router.route('/probation-officer').get(protect, admin, getProbationOfficerIDs);
router.route('/probation-officer/:id').get(protect, admin, getProbationOfficer);

router.route('/sentence/:id').get(protect, admin, getSentence);

router.route('/crime-charge/:id').get(protect, admin, getCrimeCharge);

router.route('/crime-code').get(protect, admin, getCrimeCodeIDs);


export default router;