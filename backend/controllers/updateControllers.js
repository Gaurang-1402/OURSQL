import catchAsync from "../utils/catchAsync.js";
import db from '../config/db.js';

export const updateCrime = catchAsync(async (req, res, next) => {
    res.send('Crime update');
});

export const updateCriminal = catchAsync(async (req, res, next) => {
    res.send('Criminal update');
});

export const updateOfficer = catchAsync(async (req, res, next) => {
    res.send('Officer update');
});

export const updateProbationOfficer = catchAsync(async (req, res, next) => {
    res.send('Probation Officer update');
});

export const updateAppeal = catchAsync(async (req, res, next) => {
    const appealId = req.params.id;
    const { startHearingDate, startFilingDate, selectedCrimeID, selectedStatus } = req.body;

    console.log(startHearingDate, startFilingDate, selectedStatus, selectedCrimeID, appealId)

    const query = `UPDATE appeals SET crime_id = ${selectedCrimeID}, filing_date = '${startFilingDate}', hearing_date = '${startHearingDate}', status = '${selectedStatus}' WHERE appeal_id = ${appealId}`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            message: 'Updated appeal successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
})



export const updateSentence = catchAsync(async (req, res, next) => {
    res.send('Sentence update');
})

export const updateCrimeCharge = catchAsync(async (req, res, next) => {
    res.send('Crime Charge update');
})