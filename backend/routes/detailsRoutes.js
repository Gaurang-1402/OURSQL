import express from 'express';
import { getCrimeByID, updateCrime, deleteCrime } from '../controllers/detailsControllers.js';
import { getCriminalByID, updateCriminal, deleteCriminal } from '../controllers/detailsControllers.js';
import { getOfficerByID, updateOfficer, deleteOfficer } from '../controllers/detailsControllers.js';
import { getProbationOfficerByID, updateProbationOfficer, deleteProbationOfficer } from '../controllers/detailsControllers.js';

const router = express.Router();

router.route('/crime/:id')
    .get(protect, getCrimeByID)
    .put(protect, updateCrime)
    .delete(protect, deleteCrime);

router.route('/criminal/:id')
    .get(protect, getCriminalByID)
    .put(protect, updateCriminal)
    .delete(protect, deleteCriminal);

router.route('/officer/:id')
    .get(protect, getOfficerByID)
    .put(protect, updateOfficer)
    .delete(protect, deleteOfficer);

router.route('/probation-officer/:id')
    .get(protect, getProbationOfficerByID)
    .put(protect, updateProbationOfficer)
    .delete(protect, deleteProbationOfficer);
    
export default router;