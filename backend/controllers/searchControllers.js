import catchAsync from "../utils/catchAsync.js";
import mysql from 'mysql';

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
