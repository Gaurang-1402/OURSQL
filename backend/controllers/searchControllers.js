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
    res.send("Appeal Search Results");
})