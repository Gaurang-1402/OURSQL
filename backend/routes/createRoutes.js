import express from 'express';
import {
    createCrime,
    createCriminal,
    createOfficer,
    createProbationOfficer, createAppeal, createSentence, createCrimeCharge,

    getCrime
} from '../controllers/createControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';

const router = express.Router();

router.route('/crime').post(protect, admin, createCrime);
router.route('/crime').get(protect, admin, getCrime);


router.route('/criminal').post(protect, admin, createCriminal);
router.route('/officer').post(protect, admin, createOfficer);
router.route('/probation-officer').post(protect, admin, createProbationOfficer);
router.route('/appeal').post(protect, admin, createAppeal);
router.route('/sentence').post(protect, admin, createSentence);
router.route('/crime-charge').post(protect, admin, createCrimeCharge);

export default router;