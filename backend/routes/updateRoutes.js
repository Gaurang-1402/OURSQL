import express from 'express';
import {
    updateCrime,
    updateCriminal,
    updateOfficer,
    updateProbationOfficer, updateAppeal, updateSentence, updateCrimeCharge,

} from '../controllers/updateControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';

const router = express.Router();

router.route('/crime/:id').put(protect, admin, updateCrime);

router.route('/criminal/:id').put(protect, admin, updateCriminal);
router.route('/officer/:id').put(protect, admin, updateOfficer);
router.route('/probation-officer/:id').put(protect, admin, updateProbationOfficer);

router.route('/appeal/:id').put(protect, admin, updateAppeal);

router.route('/sentence/:id').put(protect, admin, updateSentence);
router.route('/crime-charge/:id').put(protect, admin, updateCrimeCharge);

export default router;