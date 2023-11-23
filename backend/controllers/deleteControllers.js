import catchAsync from "../utils/catchAsync.js";
import db from '../config/db.js';

export const deleteCrime = catchAsync(async (req, res, next) => {
    res.send('Crime Delete');
});

export const deleteCriminal = catchAsync(async (req, res, next) => {
    res.send('Criminal Delete');
});

export const deleteOfficer = catchAsync(async (req, res, next) => {
    res.send('Officer Delete');
});

export const deleteProbationOfficer = catchAsync(async (req, res, next) => {
    res.send('Probation Officer Delete');
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
    res.send('Sentence Delete');
})

export const deleteCrimeCharge = catchAsync(async (req, res, next) => {
    res.send('Crime Charge Delete');
})