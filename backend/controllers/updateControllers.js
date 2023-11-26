import catchAsync from "../utils/catchAsync.js";
import db from '../config/db.js';

export const updateCrime = catchAsync(async (req, res, next) => {
    res.send('Crime update');
});

export const updateCriminal = catchAsync(async (req, res, next) => {
    res.send('Criminal update');
});

export const updateOfficer = catchAsync(async (req, res, next) => {
    const officerId = req.params.id;
    const { last, first, precinct, badge, phone, status } = req.body;

    console.log(last, first, precinct, badge, phone, status, officerId)

    const query = `UPDATE officers SET last = '${last}', first = '${first}', precinct = '${precinct}', badge = '${badge}', phone = '${phone}', status = '${status}' WHERE officer_id = ${officerId}`;
    try {
        const result = await db.query(query);
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

// {
//     "criminal_id": 3,
//     "type": "P", // Changed type to 'P' for example
//     "prob_id": 2,
//     "start_date": "2023-01-01",
//     "end_date": "2023-07-01", // Extended the end date for example
//     "violations": 1 // Changed the number of violations
//   }
  
 
// CREATE TABLE sentences (
//     sentence_id NUMERIC(6),
//     criminal_id NUMERIC(6),
//     type CHAR(1),
//     prob_id NUMERIC(5),
//     start_date DATE,
//     end_date DATE,
//     violations NUMERIC(3) NOT NULL,
//     CONSTRAINT sentence_date_chk CHECK (end_date > start_date),
//     CONSTRAINT sentence_type_coding CHECK (type = 'J' OR type = 'H' OR type = 'P'),
//     PRIMARY KEY(sentence_id),
//     FOREIGN KEY(criminal_id) REFERENCES criminals(criminal_id),
//     FOREIGN KEY(prob_id) REFERENCES prob_officer(prob_id)
// );

export const updateSentence = catchAsync(async (req, res, next) => {
    const sentenceId = req.params.id;
    const { criminal_id, type, prob_id, start_date, end_date, violations } = req.body;

    console.log(criminal_id, type, prob_id, start_date, end_date, violations, sentenceId)

    const query = `UPDATE sentences SET criminal_id = ${criminal_id}, type = '${type}', prob_id = ${prob_id}, start_date = '${start_date}', end_date = '${end_date}', violations = ${violations} WHERE sentence_id = ${sentenceId}`;
    try {
        const result = await db.query(query);
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
    const { crime_id, crime_code, charge_status, payment_due_date } = req.body;
    const chargeId = req.params.id;

    console.log(crime_id, crime_code, charge_status, payment_due_date, chargeId)

    const query = `UPDATE crime_charges SET crime_id = ${crime_id}, crime_code = '${crime_code}', charge_status = '${charge_status}', payment_due_date = '${payment_due_date}' WHERE charge_id = ${chargeId}`;
    try {
        const result = await db.query(query);
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