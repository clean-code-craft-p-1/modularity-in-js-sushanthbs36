import fs from 'fs';
import { writeToFile, readFileContent } from './fileUtils.mjs';
const testData = [
'09:15:30,23.5',
'09:16:00,24.1',
'09:16:30,22.8',
'09:17:00,25.3',
'09:17:30,23.9',
'09:18:00,24.7',
'09:18:30,22.4',
'09:19:00,26.1',
'09:19:30,23.2',
'09:20:00,25.0'
]
// Creating the Test File
export function createTestFile(testFileName){
    writeToFile(testFileName, testData.join('\n') + '\n'); 
    console.log(`Created test file: ${testFileName}` +'\n');
}
// Verfying the Summary Files and Cleaning up Test Files
export function cleanpUpTestFiles(testFileName,summaryFile){
    if (fs.existsSync(summaryFile)) {
        console.log(`\nSummary file created: ${summaryFile}`)
        const content = readFileContent(summaryFile)

        const checks = [
        'Total readings: 10',
        'Valid readings: 10',
        'Errors: 0'
        ]

        const allChecksPass = checks.every(check => content.includes(check))

        if (allChecksPass) {
            console.log('✓ Summary file contents verified')
        } else {
            console.log('✗ Summary file verification failed')
        }
    }
    if (fs.existsSync(testFileName)) {
        fs.unlinkSync(testFileName)
    }
    if (fs.existsSync(summaryFile)) {
        fs.unlinkSync(summaryFile)
    }
}
