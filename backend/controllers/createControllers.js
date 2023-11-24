import catchAsync from "../utils/catchAsync.js";
import db from '../config/db.js';

export const createCrime = catchAsync(async (req, res, next) => {
    res.send('Crime create');
});

export const getCrimeIDs = catchAsync(async (req, res, next) => {
    // return all crime IDs
    const query = 'SELECT * FROM crimes';
    try {
        const result = await db.query(query);
        res.status(200).json({
            status: 'success',
            data: {
                data: result[0].map((crime) => {
                    return {
                        crimeID: crime.crime_id,
                    }
                }
                )
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});

export const createCriminal = catchAsync(async (req, res, next) => {
    res.send('Criminal create');
});

export const createOfficer = catchAsync(async (req, res, next) => {
    res.send('Officer create');
});

export const createProbationOfficer = catchAsync(async (req, res, next) => {
    res.send('Probation Officer create');
});

export const createAppeal = catchAsync(async (req, res, next) => {
    const { startHearingDate, startFilingDate, selectedCrimeID, selectedStatus } = req.body;
    const newId = Math.floor(Math.random() * 100000);

    console.log(startHearingDate, startFilingDate, selectedStatus, selectedCrimeID, newId)

    const query = `INSERT INTO appeals (appeal_id, crime_id, filing_date, hearing_date, status) VALUES (${newId}, ${selectedCrimeID}, '${startFilingDate}', '${startHearingDate}', '${selectedStatus}')`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            message: 'Created appeal successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
})


export const getAppeal = catchAsync(async (req, res, next) => {

    const appealId = req.params.id;
    const query = `SELECT * FROM appeals WHERE appeal_id = ${appealId}`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            status: 'success',
            data: {
                data: result[0]
            }
        });
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Invalid ID provided',
        });
    }
}
);



export const createSentence = catchAsync(async (req, res, next) => {
    res.send('Sentence create');
})

export const createCrimeCharge = catchAsync(async (req, res, next) => {
    res.send('Crime Charge create');
})