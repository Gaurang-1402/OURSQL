import catchAsync from "../utils/catchAsync.js";
import {dbAdmin} from '../config/db.js';


export const createCrime = catchAsync(async (req, res, next) => {
    const { criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date } = req.body;
    const newId = getLastInsertedId('crimes') + 1;

    let query = `INSERT INTO crimes (criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date )
            VALUES (${newId}, ${criminal_id}, ${classification}, '${date_charged}', ${status},
                    ${hearing_date}, ${appeal_cut_date})`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');
        
        res.status(200).json({
            message: 'Created crime successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid data',
        });
        console.log(err);
    }
    
});


export const createSentence = catchAsync(async (req, res, next) => {

    const { criminal_id, type, prob_id, start_date, end_date, violations } = req.body;
    const newId = getLastInsertedId('sentences') + 1;

    const query = `INSERT INTO sentences (sentence_id, criminal_id, type, prob_id, start_date, end_date, violations) VALUES (${newId}, ${criminal_id}, '${type}', ${prob_id}, '${start_date}', '${end_date}', ${violations})`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');
        
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

export const createOfficer = catchAsync(async (req, res, next) => {
    const { last, first, precinct, badge, phone, status } = req.body;
    const newId = getLastInsertedId('officers') + 1;

    const query = `INSERT INTO officers (officer_id, last, first, precinct, badge, phone, status) VALUES (${newId}, '${last}', '${first}', '${precinct}', '${badge}', '${phone}', '${status}')`;
    try {
        const result = await dbAdmin.query(query);
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



export const createProbationOfficer = catchAsync(async (req, res, next) => {
    const { last, first, zip, phone, email, status } = req.body;
    const newId = getLastInsertedId('prob_officer') + 1;

    const query = `INSERT INTO prob_officer (prob_id, last, first, zip, phone, email, status) VALUES (${newId}, '${last}', '${first}', '${zip}', '${phone}', '${email}', '${status}')`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

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
    
});



export const createAppeal = catchAsync(async (req, res, next) => {
    const { startHearingDate, startFilingDate, selectedCrimeID, selectedStatus } = req.body;
    const newId = getLastInsertedId('appeals') + 1;

    const query = `INSERT INTO appeals (appeal_id, crime_id, filing_date, hearing_date, status) VALUES (${newId}, ${selectedCrimeID}, '${startFilingDate}', '${startHearingDate}', '${selectedStatus}')`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

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



export const createCriminal = catchAsync(async (req, res, next) => {
    const { last, first, zip, phone, v_status, p_status } = req.body;
    const newId = getLastInsertedId('criminal') + 1

    const query = `INSERT INTO criminal (criminal_id, last, first, zip, phone, v_status, p_status) VALUES (${newId}, '${last}', '${first}', '${zip}', '${phone}', '${v_status}', '${p_status}')`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');

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
})


export const createCrimeCharge = catchAsync(async (req, res, next) => {
    const { crime_id, crime_code, charge_status, fine_amount, court_fee, amount_paid, payment_due_date } = req.body;
    const newId = getLastInsertedId('crime_charges') + 1

    const fineAmountFloat = parseFloat(fine_amount).toFixed(2);
    const courtFeeFloat = parseFloat(court_fee).toFixed(2);
    const amountPaidFloat = parseFloat(amount_paid).toFixed(2);
    
    let query = `INSERT INTO crime_charges (charge_id, crime_id, crime_code, charge_status, fine_amount, court_fee, amount_paid, payment_due_date) VALUES (${newId}, ${crime_id}, ${crime_code}, '${charge_status}', ${fineAmountFloat}, ${courtFeeFloat}, ${amountPaidFloat}, '${payment_due_date}')`;
    try {
        await dbAdmin.query('START TRANSACTION;');
        const results = await dbAdmin.query(query);
        await dbAdmin.query('COMMIT;');
        
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

const getLastInsertedId = async (entity) => {
    const result = await db.query('SELECT MAX(id) as lastId FROM '+ entity+';');
    return result[0].lastId;
  };
  