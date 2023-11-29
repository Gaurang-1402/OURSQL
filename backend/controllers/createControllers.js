import catchAsync from "../utils/catchAsync.js";
import db from '../config/db.js';

export const createCrime = catchAsync(async (req, res, next) => {
    res.send('Crime create');
});

export const getCrimeIDs = catchAsync(async (req, res, next) => {
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
    } catch (err) {
        console.log(err);
    }
});

export const getCriminal = catchAsync(async (req, res, next) => {
    const criminalId = req.params.id;
    const query = `SELECT * FROM criminals WHERE criminal_id = ${criminalId}`;
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

export const getCrimeCodeIDs = catchAsync(async (req, res, next) => {
    // return all crime code IDs
    const query = 'SELECT * FROM crime_codes';
    try {
        const result = await db.query(query);
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

export const createProbationOfficer = catchAsync(async (req, res, next) => {
    const { last, first, zip, phone, email, status } = req.body;
    const newId = Math.floor(Math.random() * 100000000);

    const query = `INSERT INTO prob_officer (prob_id, last, first, zip, phone, email, status) VALUES (${newId}, '${last}', '${first}', '${zip}', '${phone}', '${email}', '${status}')`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            message: 'Created probation officer successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
    
    //res.send('Probation Officer create');
});

export const getProbationOfficer = catchAsync(async (req, res, next) => {
    const probOfficerId = req.params.id;
    const query = `SELECT * FROM prob_officer WHERE prob_id = ${probOfficerId}`;
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
    const { last, first, zip, phone, v_status, p_status } = req.body;
    const newId = Math.floor(Math.random() * 100000000);

    const query = `INSERT INTO criminal (criminal_id, last, first, zip, phone, v_status, p_status) VALUES (${newId}, '${last}', '${first}', '${zip}', '${phone}', '${v_status}', '${p_status}')`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            message: 'Created criminal successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
    //res.send('Criminal create');
})


export const createCrimeCharge = catchAsync(async (req, res, next) => {
    const { crime_id, crime_code, charge_status, fine_amount, court_fee, amount_paid, payment_due_date } = req.body;
    const newId = Math.floor(Math.random() * 1000000000);

    const fineAmountFloat = parseFloat(fine_amount).toFixed(2);
    const courtFeeFloat = parseFloat(court_fee).toFixed(2);
    const amountPaidFloat = parseFloat(amount_paid).toFixed(2);
    
    console.log(newId, crime_id, crime_code, charge_status, fineAmountFloat, courtFeeFloat, amountPaidFloat, payment_due_date);

    let query = `INSERT INTO crime_charges (charge_id, crime_id, crime_code, charge_status, fine_amount, court_fee, amount_paid, payment_due_date) VALUES (${newId}, ${crime_id}, ${crime_code}, '${charge_status}', ${fineAmountFloat}, ${courtFeeFloat}, ${amountPaidFloat}, '${payment_due_date}')`;
    try {
        const result = await db.query(query);
        res.status(200).json({
            message: 'Created crime charge successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
})

export const getCrimeCharge = catchAsync(async (req, res, next) => {
    const chargeId = req.params.id;
    const query = `SELECT * FROM crime_charges WHERE charge_id = ${chargeId}`;
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