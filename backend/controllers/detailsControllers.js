import catchAsync from "../utils/catchAsync.js";
import db from '../config/db.js';


// Crime Controllers

/*
Depends on 
Crime table
Criminal table

*/
export const getCrimeByID = catchAsync(async (req, res, next) => {
    res.send('Get Crime ByID');

});

export const updateCrime = catchAsync(async (req, res, next) => {
    res.send('Update Crime ByID');
    
});

export const deleteCrime = catchAsync(async (req, res, next) => {
    res.send('Delete Crime ByID');
});

// Criminal Controllers

/*
Criminals
Alias
Sentences
Probation Officer
Crimes
Crime Charges
Crime_Codes
*/
export const getCriminalByID = catchAsync(async (req, res, next) => {
    res.send('Criminal ByID');
});

export const updateCriminal = catchAsync(async (req, res, next) => {
    res.send('Update Criminal ByID');
});

export const deleteCriminal = catchAsync(async (req, res, next) => {
    res.send('Delete Criminal ByID');
});


// Officer Controllers

export const getOfficerByID = catchAsync(async (req, res, next) => {
    res.send('Officer ByID');
});

export const updateOfficer = catchAsync(async (req, res, next) => {
    res.send('Update Officer ByID');
});

export const deleteOfficer = catchAsync(async (req, res, next) => {
    res.send('Delete Officer ByID');
});


// Probation Officer Controllers

export const getProbationOfficerByID = catchAsync(async (req, res, next) => {
    res.send('Probation Officer ByID');
});

export const updateProbationOfficer = catchAsync(async (req, res, next) => {
    res.send('Update Probation Officer ByID');
});

export const deleteProbationOfficer = catchAsync(async (req, res, next) => {
    res.send('Delete Probation Officer ByID');
});