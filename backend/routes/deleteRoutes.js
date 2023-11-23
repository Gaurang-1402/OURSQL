import express from 'express';
import {
    deleteCrime,
    deleteCriminal,
    deleteOfficer,
    deleteProbationOfficer, deleteAppeal, deleteSentence, deleteCrimeCharge
} from '../controllers/deleteControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';

const router = express.Router();

router.route('/crime/:id').delete(protect, admin, deleteCrime);
router.route('/criminal/:id').delete(protect, admin, deleteCriminal);
router.route('/officer/:id').delete(protect, admin, deleteOfficer);
router.route('/probation-officer/:id').delete(protect, admin, deleteProbationOfficer);
router.route('/appeal/:id').delete(protect, admin, deleteAppeal);
router.route('/sentence/:id').delete(protect, admin, deleteSentence);
router.route('/crime-charge/:id').delete(protect, admin, deleteCrimeCharge);

export default router;