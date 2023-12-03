import catchAsync from "../utils/catchAsync.js";
import {dbAdmin, dbNonAdmin} from '../config/db.js';

export const getCrimeSearchResults = catchAsync(async (req, res, next) => {
    const { criminal_id, classification, date_charged, status, hearing_date, appeal_cut_date } = req.body;

    
    
    let query = 'SELECT * FROM crimes WHERE 1=1';

    if (criminal_id) {
        query += ` AND criminal_id = '${criminal_id}'`;
    }

    if (classification) {
        query += ` AND classification = '${classification}'`;
    }

    if (date_charged) {
        query += ` AND date_charged >= '${date_charged}'`;
    }

    if (status) {
        query += ` AND status = '${status}'`;
    }

    if (hearing_date) {
        query += ` AND hearing_date >= '${hearing_date}'`;
    }

    if (appeal_cut_date) {
        query += ` AND appeal_cut_date >= '${appeal_cut_date}'`;
    }
    

    try {
        let results;
        if (req.user && req.user.is_admin === 'Y') {
            results = await dbAdmin.query(query);

        } else{
            results = await dbNonAdmin.query(query);
        }

        res.status(200).json({
            data: {
                results: results[0]
            }
        })

    } catch (error) {
            
            console.log(error)
            res.status(500).json({
                message: 'Something went wrong'
            })
        }



    // res.send('Crime Search Results');
});

export const getCriminalSearchResults = catchAsync(async (req, res, next) => {
    const { lastName, selectedLastNameFilter, firstName, selectedFirstNameFilter, zip, phone, selectedVStatus, selectedPStatus } = req.body;

    let query = 'SELECT * FROM criminals LEFT JOIN alias ON criminals.criminal_id = alias.criminal_id WHERE 1=1';

    if (selectedVStatus) {
        query += ` AND v_status = '${selectedVStatus}'`;
    }

    if (selectedPStatus) {
        query += ` AND p_status = '${selectedPStatus}'`;
    }

    if (lastName) {
        query += selectedLastNameFilter === 'startswith' ?
            ` AND last LIKE '${lastName}%'` :
            ` AND last LIKE '%${lastName}%'`;
    }

    if (firstName) {
        query += selectedFirstNameFilter === 'startswith' ?
            ` AND first LIKE '${firstName}%'` :
            ` AND first LIKE '%${firstName}%'`;
    }

    if (zip) {
        query += ` AND zip = '${zip}'`;
    }

    if (phone) {
        query += ` AND phone = '${phone}'`;
    }

    try {
        let results;
        if (req.user && req.user.is_admin === 'Y') {
            results = await dbAdmin.query(query);

        } else{
            results = await dbNonAdmin.query(query);
        }

        res.status(200).json({
            data: {
                results: results[0]
            }
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
    //res.send('Criminal Search Results');
});


export const getOfficerSearchResults = catchAsync(async (req, res, next) => {
    const { lastName, selectedLastNameFilter, firstName, selectedFirstNameFilter, precinct, badge, phone, selectedStatus } = req.body;

    let query = 'SELECT * FROM officers WHERE 1=1';

    if (selectedStatus) {
        query += ` AND status = '${selectedStatus}'`;
    }

    if (lastName) {
        query += selectedLastNameFilter === 'startswith' ?
            ` AND last LIKE '${lastName}%'` :
            ` AND last LIKE '%${lastName}%'`;
    }

    if (firstName) {
        query += selectedFirstNameFilter === 'startswith' ?
            ` AND first LIKE '${firstName}%'` :
            ` AND first LIKE '%${firstName}%'`;
    }

    if (precinct) {
        query += ` AND precinct = '${precinct}'`;
    }

    if (badge) {
        query += ` AND badge = '${badge}'`;
    }

    if (phone) {
        query += ` AND phone = '${phone}'`;
    }

    try {
        let results;
        if (req.user && req.user.is_admin === 'Y') {
            results = await dbAdmin.query(query);

        } else{
            results = await dbNonAdmin.query(query);
        }

        res.status(200).json({
            data: {
                results: results[0]
            }
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
});


export const getProbationOfficerSearchResults = catchAsync(async (req, res, next) => {
    const { lastName, selectedLastNameFilter, firstName, selectedFirstNameFilter, zip, phone, email, selectedStatus } = req.body;

    let query = 'SELECT * FROM prob_officer WHERE 1=1';

    if (selectedStatus) {
        query += ` AND status = '${selectedStatus}'`;
    }

    if (lastName) {
        query += selectedLastNameFilter === 'startswith' ?
            ` AND last LIKE '${lastName}%'` :
            ` AND last LIKE '%${lastName}%'`;
    }

    if (firstName) {
        query += selectedFirstNameFilter === 'startswith' ?
            ` AND first LIKE '${firstName}%'` :
            ` AND first LIKE '%${firstName}%'`;
    }

    if (zip) {
        query += ` AND zip = '${zip}'`;
    }

    if (email) {
        query += ` AND email = '${email}'`;
    }

    if (phone) {
        query += ` AND phone = '${phone}'`;
    }

    try {
        let results;
        if (req.user && req.user.is_admin === 'Y') {
            results = await dbAdmin.query(query);

        } else{
            results = await dbNonAdmin.query(query);
        }

        res.status(200).json({
            data: {
                results: results[0]
            }
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
    
    //res.send('Probation Officer Search Results');
});


export const getAppealSearchResults = catchAsync(async (req, res, next) => {
    const { startHearingDate, startFilingDate, selectedStatus } = req.body;

    let query = 'SELECT * FROM appeals WHERE 1=1';

    if (startHearingDate) {
        query += ` AND hearing_date >= '${startHearingDate}'`;
    }

    if (startFilingDate) {
        query += ` AND filing_date >= '${startFilingDate}'`;
    }

    if (selectedStatus) {
        query += ` AND status = '${selectedStatus}'`;
    }

    try {
        let results;
        if (req.user && req.user.is_admin === 'Y') {
            results = await dbAdmin.query(query);

        } else{
            results = await dbNonAdmin.query(query);
        }

        res.status(200).json({
            data: {
                results: results[0]
            }
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
});

  
export const getSentenceSearchResults = catchAsync(async (req, res, next) => {
    const { type, start_date, end_date, violations } = req.body;

    let query = 'SELECT * FROM sentences WHERE 1=1';

    if (type) {
        query += ` AND type = '${type}'`;
    }

    if (start_date) {
        query += ` AND start_date >= '${start_date}'`;
    }

    if (end_date) {
        query += ` AND end_date <= '${end_date}'`;
    }

    if (violations) {
        query += ` AND violations = '${violations}'`;
    }

    try {
        let results;
        if (req.user && req.user.is_admin === 'Y') {
            results = await dbAdmin.query(query);

        } else{
            results = await dbNonAdmin.query(query);
        }

        res.status(200).json({
            data: {
                results: results[0]
            }
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
    // res.send('Sentence Search Results');
})

// {
//     crime_id: selectedCrimeID.crimeID,
//     crime_code: crimeCode,
//     charge_status: chargeStatus,
//     payment_due_date: paymentDueDate ? paymentDueDate.toISOString().split('T')[0] : null
//   }

export const getCrimeChargeSearchResults = catchAsync(async (req, res, next) => {
    const { crime_id, crime_code, charge_status, payment_due_date } = req.body;

    let query = 'SELECT * FROM crime_charges WHERE 1=1';

    if (crime_id) {
        query += ` AND crime_id = '${crime_id}'`;
    }

    if (crime_code) {
        query += ` AND crime_code = '${crime_code}'`;
    }

    if (charge_status) {
        query += ` AND charge_status = '${charge_status}'`;
    }

    if (payment_due_date) {
        query += ` AND payment_due_date = '${payment_due_date}'`;
    }

    try {
        let results;
        if (req.user && req.user.is_admin === 'Y') {
            results = await dbAdmin.query(query);

        } else{
            results = await dbNonAdmin.query(query);
        }

        res.status(200).json({
            data: {
                results: results[0]
            }
        })

    } catch (error) {
            
            console.log(error)
            res.status(500).json({
                message: 'Something went wrong'
            })
        }


})