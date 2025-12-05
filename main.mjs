import {createTestFile,cleanpUpTestFiles} from './fileHandling.mjs';
import {processBatch} from './dataComputation.mjs';
import {generateAndSaveReport} from './reports.mjs';

//Creating test File
const testFileName='testfile.csv';
createTestFile(testFileName);

//Processing the data in the test file
const analysisResults= processBatch(testFileName);

//Generate and Save Report 
generateAndSaveReport(testFileName,analysisResults);

const summaryFile= testFileName.replace('.csv','_csv') + '_summary.txt';

//Verifying the Summary File and cleaning up the files
cleanpUpTestFiles(testFileName,summaryFile);



