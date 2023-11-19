import catchAsync from "../utils/catchAsync.js";
import mysql from 'mysql';

export const getCrimeDetails = catchAsync(async (req, res, next) => {
    res.send('Crime details');
});

export const getCriminalDetails = catchAsync(async (req, res, next) => {
    res.send('Criminal details');
});

export const getOfficerDetails = catchAsync(async (req, res, next) => {
    res.send('Officer details');
});

export const getProbationOfficerDetails = catchAsync(async (req, res, next) => {
    res.send('Probation Officer details');
});
