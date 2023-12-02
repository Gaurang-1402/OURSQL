import catchAsync from "../utils/catchAsync.js";
import { dbAdmin, dbNonAdmin } from '../config/db.js';


export const getCrimeIDs = catchAsync(async (req, res, next) => {
    const query = 'SELECT * FROM crimes';
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }
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

export const getCrime = catchAsync(async (req, res, next) => {
    const crimeId = req.params.id;
    const query = `SELECT * FROM crimes WHERE crime_id = ${crimeId}`;
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }
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

export const getSentence = catchAsync(async (req, res, next) => {
    const sentenceId = req.params.id;
    const query = `SELECT * FROM sentences WHERE sentence_id = ${sentenceId}`;
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }
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
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }
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
    } catch (err) {
        console.log(err);
    }
});

export const getCriminal = catchAsync(async (req, res, next) => {
    const criminalId = req.params.id;
    const query = `SELECT * FROM criminals WHERE criminal_id = ${criminalId}`;
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }
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

export const getOfficer = catchAsync(async (req, res, next) => {
    const officerId = req.params.id;
    const query = `SELECT * FROM officers WHERE officer_id = ${officerId}`;
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }

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

export const getCrimeCodeIDs = catchAsync(async (req, res, next) => {
    // return all crime code IDs
    const query = 'SELECT * FROM crime_codes';
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: result[0].map((crimeCode) => {
                    return {
                        id: crimeCode.crime_code,
                        label: crimeCode.crime_code,
                        value: crimeCode.crime_code
                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
});

export const getProbationOfficer = catchAsync(async (req, res, next) => {
    const probOfficerId = req.params.id;
    const query = `SELECT * FROM prob_officer WHERE prob_id = ${probOfficerId}`;
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }

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


export const getProbationOfficerIDs = catchAsync(async (req, res, next) => {
    // return all probation officer IDs
    const query = 'SELECT * FROM prob_officer';
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }
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

export const getAppeal = catchAsync(async (req, res, next) => {

    const appealId = req.params.id;
    const query = `SELECT * FROM appeals WHERE appeal_id = ${appealId}`;
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }
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

export const getCrimeCharge = catchAsync(async (req, res, next) => {
    const chargeId = req.params.id;
    const query = `SELECT * FROM crime_charges WHERE charge_id = ${chargeId}`;
    try {
        let result;
        if (req.user && req.user.is_admin === 'Y') {
            await dbAdmin.query('START TRANSACTION;');
            result = await dbAdmin.query(query);
            await dbAdmin.query('COMMIT;');
        } else {
            await dbNonAdmin.query('START TRANSACTION;');
            result = await dbNonAdmin.query(query);
            await dbNonAdmin.query('COMMIT;');
        }


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