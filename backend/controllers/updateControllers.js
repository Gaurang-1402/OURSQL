import catchAsync from "../utils/catchAsync.js";
import {dbAdmin} from '../config/db.js';

export const updateCrime = catchAsync(async (req, res, next) => {
    const { criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date } = req.body;
    const crimeId = req.params.id;

    
    const query = `UPDATE crimes SET criminal_id = ${criminal_id}, classification = '${classification}', date_charged = '${date_charged}',
                    status = '${status}', hearing_date = '${hearing_date}', appeal_cut_date = '${appeal_cut_date}' WHERE crime_id = ${crimeId}`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');
        res.status(200).json({
            message: 'Updated crime successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
    
    //res.send('Crime update');
});

export const updateCriminal = catchAsync(async (req, res, next) => {
    const criminalId = req.params.id;
    const { last, first, zip, phone, p_status, v_status } = req.body;


    const query = `UPDATE criminals SET last = '${last}', first = '${first}', zip = '${zip}', phone = '${phone}', v_status = '${v_status}', p_status = '${p_status}' WHERE criminal_id = ${criminalId}`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

        res.status(200).json({
            message: 'Updated probation officer successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
    
    //res.send('Criminal update');
});

export const updateOfficer = catchAsync(async (req, res, next) => {
    const officerId = req.params.id;
    const { last, first, precinct, badge, phone, status } = req.body;


    const query = `UPDATE officers SET last = '${last}', first = '${first}', precinct = '${precinct}', badge = '${badge}', phone = '${phone}', status = '${status}' WHERE officer_id = ${officerId}`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

        res.status(200).json({
            message: 'Updated officer successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
});


export const updateProbationOfficer = catchAsync(async (req, res, next) => {
    const probOfficerId = req.params.id;
    const { last, first, zip, phone, email, status } = req.body;


    const query = `UPDATE prob_officer SET last = '${last}', first = '${first}', zip = '${zip}', phone = '${phone}', email = '${email}', status = '${status}' WHERE prob_id = ${probOfficerId}`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

        res.status(200).json({
            message: 'Updated probation officer successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
    //res.send('Probation Officer update');
});

export const updateAppeal = catchAsync(async (req, res, next) => {
    const appealId = req.params.id;
    const { startHearingDate, startFilingDate, selectedCrimeID, selectedStatus } = req.body;


    const query = `UPDATE appeals SET crime_id = ${selectedCrimeID}, filing_date = '${startFilingDate}', hearing_date = '${startHearingDate}', status = '${selectedStatus}' WHERE appeal_id = ${appealId}`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

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
    const sentenceId = req.params.id;
    const { criminal_id, type, prob_id, start_date, end_date, violations } = req.body;


    const query = `UPDATE sentences SET criminal_id = ${criminal_id}, type = '${type}', prob_id = ${prob_id}, start_date = '${start_date}', end_date = '${end_date}', violations = ${violations} WHERE sentence_id = ${sentenceId}`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

        res.status(200).json({
            message: 'Updated sentence successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
})

export const updateCrimeCharge = catchAsync(async (req, res, next) => {
    const { crime_id, crime_code, charge_status, fine_amount, court_fee, amount_paid, payment_due_date} = req.body;
    const chargeId = req.params.id;


    const query = `UPDATE crime_charges SET crime_id = ${crime_id}, crime_code = '${crime_code}', charge_status = '${charge_status}',
            fine_amount = '${fine_amount}', court_fee = '${court_fee}', amount_paid = '${amount_paid}', payment_due_date = '${payment_due_date}' WHERE charge_id = ${chargeId}`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

        res.status(200).json({
            message: 'Updated crime charge successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
})