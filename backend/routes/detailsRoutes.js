import express from 'express';
import { getCrimeByID, updateCrime, deleteCrime } from '../controllers/detailsControllers.js';
import { getCriminalByID, updateCriminal, deleteCriminal } from '../controllers/detailsControllers.js';
import { getOfficerByID, updateOfficer, deleteOfficer } from '../controllers/detailsControllers.js';
import { getProbationOfficerByID, updateProbationOfficer, deleteProbationOfficer } from '../controllers/detailsControllers.js';

const router = express.Router();

router.route('/crime/:id')
    .get(getCrimeByID)
    .put(updateCrime)
    .delete(deleteCrime);

router.route('/criminal/:id')
    .get(getCriminalByID)
    .put(updateCriminal)
    .delete(deleteCriminal);

router.route('/officer/:id')
    .get(getOfficerByID)
    .put(updateOfficer)
    .delete(deleteOfficer);

router.route('/probation-officer/:id')
    .get(getProbationOfficerByID)
    .put(updateProbationOfficer)
    .delete(deleteProbationOfficer);
    
export default router;