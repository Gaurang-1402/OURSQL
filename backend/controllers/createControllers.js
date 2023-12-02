import catchAsync from "../utils/catchAsync.js";
import {dbAdmin} from '../config/db.js';


export const createCrime = catchAsync(async (req, res, next) => {
    const { criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date } = req.body;
    const newId = Math.floor(Math.random() * 1000000000);

    console.log(criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date);


    let query = `INSERT INTO crimes (criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date )
            VALUES (${newId}, ${criminal_id}, ${classification}, '${date_charged}', ${status},
                    ${hearing_date}, ${appeal_cut_date})`;
    try {
        
        const result = await dbAdmin.query(query);
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
    
    //res.send('Crime create');
});




export const createSentence = catchAsync(async (req, res, next) => {

    const { criminal_id, type, prob_id, start_date, end_date, violations } = req.body;
    const newId = Math.floor(Math.random() * 1000000);

    const query = `INSERT INTO sentences (sentence_id, criminal_id, type, prob_id, start_date, end_date, violations) VALUES (${newId}, ${criminal_id}, '${type}', ${prob_id}, '${start_date}', '${end_date}', ${violations})`;
    try {
        const result = await dbAdmin.query(query);
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
    const newId = Math.floor(Math.random() * 100000000);

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
    const newId = Math.floor(Math.random() * 10000);

    const query = `INSERT INTO prob_officer (prob_id, last, first, zip, phone, email, status) VALUES (${newId}, '${last}', '${first}', '${zip}', '${phone}', '${email}', '${status}')`;
    try {
        const result = await dbAdmin.query(query);
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



export const createAppeal = catchAsync(async (req, res, next) => {
    const { startHearingDate, startFilingDate, selectedCrimeID, selectedStatus } = req.body;
    const newId = Math.floor(Math.random() * 100000);

    const query = `INSERT INTO appeals (appeal_id, crime_id, filing_date, hearing_date, status) VALUES (${newId}, ${selectedCrimeID}, '${startFilingDate}', '${startHearingDate}', '${selectedStatus}')`;
    try {
        const result = await dbAdmin.query(query);
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
    const newId = Math.floor(Math.random() * 100000);

    const query = `INSERT INTO criminal (criminal_id, last, first, zip, phone, v_status, p_status) VALUES (${newId}, '${last}', '${first}', '${zip}', '${phone}', '${v_status}', '${p_status}')`;
    try {
        const result = await dbAdmin.query(query);
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
        const result = await dbAdmin.query(query);
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