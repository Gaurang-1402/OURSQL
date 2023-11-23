import catchAsync from "../utils/catchAsync.js";
import db from '../config/db.js';

export const getCrimeSearchResults = catchAsync(async (req, res, next) => {
    res.send('Crime Search Results');
});

export const getCriminalSearchResults = catchAsync(async (req, res, next) => {
    res.send('Criminal Search Results');
});

export const getOfficerSearchResults = catchAsync(async (req, res, next) => {
    res.send('Officer Search Results');
});

export const getProbationOfficerSearchResults = catchAsync(async (req, res, next) => {
    res.send('Probation Officer Search Results');
});


export const getAppealSearchResults = catchAsync(async (req, res, next) => {
    const { startHearingDate, startFilingDate, selectedStatus } = req.body;

    console.log(startHearingDate, startFilingDate, selectedStatus)
    
    const query = `SELECT * FROM appeals WHERE hearing_date >= '${startHearingDate}' AND filing_date >= '${startFilingDate}' AND status = '${selectedStatus}'`;
    try {
        const results = await db.query(query);

        res.status(200).json({
            status: 'success',
            data: {
                results: results[0]
            }
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })        
    }
})

export const getSentenceSearchResults = catchAsync(async (req, res, next) => {
    res.send('Sentence Search Results');
})

export const getCrimeChargeSearchResults = catchAsync(async (req, res, next) => {
    res.send('Crime Charge Search Results');
})