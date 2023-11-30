import catchAsync from "../utils/catchAsync.js";
import db from '../config/db.js';

export const deleteCrime = catchAsync(async (req, res, next) => {
    const crimeId = req.params.id;

    try {
        // First, delete related records in crime_charges, appeals, crime_officers
        const deleteChargesQuery = `DELETE FROM crime_charges WHERE crime_id = ${crimeId}`;
        await db.query(deleteChargesQuery);
        
        const deleteAppealsQuery = `DELETE FROM appeals WHERE crime_id = ${crimeId}`;
        await db.query(deleteAppealsQuery);

        const deleteCrimeOfficersQuery = `DELETE FROM crime_officers WHERE crime_id = ${crimeId}`;
        await db.query(deleteCrimeOfficersQuery);

        // Then, delete the crime
        const deleteCrimeQuery = `DELETE FROM crimes WHERE crime_id = ${crimeId}`;
        const result = await db.query(deleteCrimeQuery);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Crime not found'
            });
        }

        res.status(200).json({
            message: 'Success, crime deleted'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, crime not deleted'
        });
    }
    // res.send('Crime Delete');
});

export const deleteCriminal = catchAsync(async (req, res, next) => {
    
    const criminalId = req.params.id;

    try {
        // First, delete related records in sentences
        const deleteSentencesQuery = `DELETE FROM sentences WHERE criminal_id = ${criminalId}`;
        await db.query(deleteSentencesQuery);

        // Then, delete the criminal
        const deleteCriminalsQuery = `DELETE FROM criminals WHERE criminal_id = ${criminalId}`;
        const result = await db.query(deleteCriminalsQuery);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Criminal not found'
            });
        }

        res.status(200).json({
            message: 'Success, criminal deleted'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, criminal not deleted'
        });
    }
    //res.send('Criminal Delete');
});

// TODO: Test
export const deleteOfficer = catchAsync(async (req, res, next) => {
    const officerID = req.params.id;

    try {
        // First, delete related records in crime_officers
        const deleteCrimeOfficersQuery = `DELETE FROM crime_officers WHERE officer_id = ${officerID}`;
        await db.query(deleteCrimeOfficersQuery);

        // Then, delete the officer
        const deleteOfficerQuery = `DELETE FROM officers WHERE officer_id = ${officerID}`;
        const result = await db.query(deleteOfficerQuery);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Officer not found'
            });
        }

        res.status(200).json({
            message: 'Success, officer deleted'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, officer not deleted'
        });
    }
});



export const deleteProbationOfficer = catchAsync(async (req, res, next) => {
    const probOfficerID = req.params.id;

    try {
        // First, delete related records in sentences
        const deleteSentencesQuery = `DELETE FROM sentences WHERE prob_id = ${probOfficerID}`;
        await db.query(deleteSentencesQuery);

        // Then, delete the officer
        const deleteProbOfficerQuery = `DELETE FROM prob_officer WHERE prob_id = ${probOfficerID}`;
        const result = await db.query(deleteProbOfficerQuery);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Officer not found'
            });
        }

        res.status(200).json({
            message: 'Success, probation officer deleted'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, probation officer not deleted'
        });
    }
});


export const deleteAppeal = catchAsync(async (req, res, next) => {
    const appealID = req.params.id;
    const query = `DELETE FROM appeals WHERE appeal_id = ${appealID}`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            message: 'Success, appeal deleted'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, appeal not deleted'
        });
    }
})

export const deleteSentence = catchAsync(async (req, res, next) => {
    const sentenceID = req.params.id;

    try {
        // Delete the sentence
        const deleteSentenceQuery = `DELETE FROM sentences WHERE sentence_id = ${sentenceID}`;
        const result = await db.query(deleteSentenceQuery);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Sentence not found'
            });
        }

        res.status(200).json({
            message: 'Success, sentence deleted'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, sentence not deleted'
        });
    }
});

// TODO: Test
export const deleteCrimeCharge = catchAsync(async (req, res, next) => {
    const chargeID = req.params.id;

    try {
        // Delete the crime charge
        const deleteCrimeChargeQuery = `DELETE FROM crime_charges WHERE charge_id = ${chargeID}`;
        const result = await db.query(deleteCrimeChargeQuery);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Crime charge not found'
            });
        }

        res.status(200).json({
            message: 'Success, crime charge deleted'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, crime charge not deleted'
        });
    }
});
