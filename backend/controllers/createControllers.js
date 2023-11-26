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


export const createSentence = catchAsync(async (req, res, next) => {

    const { criminal_id, type, prob_id, start_date, end_date, violations } = req.body;
    const newId = Math.floor(Math.random() * 1000000);

    const query = `INSERT INTO sentences (sentence_id, criminal_id, type, prob_id, start_date, end_date, violations) VALUES (${newId}, ${criminal_id}, '${type}', ${prob_id}, '${start_date}', '${end_date}', ${violations})`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            message: 'Created sentence successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
})



export const getSentence = catchAsync(async (req, res, next) => {
    const sentenceId = req.params.id;
    const query = `SELECT * FROM sentences WHERE sentence_id = ${sentenceId}`;
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
})


export const getCriminalIDs = catchAsync(async (req, res, next) => {
    // return all criminal IDs
    const query = 'SELECT * FROM criminals';
    try {
        const result = await db.query(query);
        res.status(200).json({
            status: 'success',
            data: {
                data: result[0].map((criminal) => {
                    return {
                        id: criminal.criminal_id,
                        label: criminal.last + ', ' + criminal.first,
                        value: criminal.criminal_id
                    }
                })
            }
        });
    } catch(err) {
        console.log(err);
    }
});

export const createOfficer = catchAsync(async (req, res, next) => {
    const { last, first, precinct, badge, phone, status } = req.body;
    const newId = Math.floor(Math.random() * 100000000);

    const query = `INSERT INTO officers (officer_id, last, first, precinct, badge, phone, status) VALUES (${newId}, '${last}', '${first}', '${precinct}', '${badge}', '${phone}', '${status}')`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            message: 'Created officer successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
});

export const getOfficer = catchAsync(async (req, res, next) => {
    const officerId = req.params.id;
    const query = `SELECT * FROM officers WHERE officer_id = ${officerId}`;
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
})

export const createProbationOfficer = catchAsync(async (req, res, next) => {
    res.send('Probation Officer create');
});

export const getProbationOfficerIDs = catchAsync(async (req, res, next) => {
    // return all probation officer IDs
    const query = 'SELECT * FROM prob_officer';
    try {
        const result = await db.query(query);
        res.status(200).json({
            status: 'success',
            data: {
                data: result[0].map((officer) => {
                    return {
                        id: officer.prob_id,
                        label: officer.last + ', ' + officer.first,
                        value: officer.prob_id
                    }
                }
                )
            }
        });
    }
    catch (err) {
        console.log(err);
    }
})

export const createAppeal = catchAsync(async (req, res, next) => {
    const { startHearingDate, startFilingDate, selectedCrimeID, selectedStatus } = req.body;
    const newId = Math.floor(Math.random() * 100000);

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


export const createCriminal = catchAsync(async (req, res, next) => {

    res.send('Criminal create');
})

export const createCrimeCharge = catchAsync(async (req, res, next) => {
    res.send('Crime Charge create');
})