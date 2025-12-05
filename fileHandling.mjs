import fs from 'fs';

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
'09:20:00,25.0',
'09:20:30,28.0',
'09:21:00,35.0',
'09:21:30,22.0',
'09:22:00,28.0',
'09:22:30,26.3'
]


//Creating the Test File
export function createTestFile(testFileName){
    fs.writeFileSync(testFileName, testData.join('\n') + '\n')
    console.log(`Created test file: ${testFileName}` +'\n');
}

//Reading File Content
export function readFileContent(fileName){
    try{
        return fs.readFileSync(fileName,'utf-8');
    }
    catch(error){
        if(error.code === 'ENOENT'){
            console.log(`File not Found: ${fileName}`);
            return;
        }
        throw error
    }
}

//Writing Content to File
export function writeToFile(fileName,content){
    try{
        fs.writeFileSync(fileName, content);
    }
    catch(error){
        if(error.code === 'ENOENT'){
            console.log(`File not Found: ${fileName}`);
            return;
        }
        else if(error.code === 'EACCES'){
            console.log(`Permision Denied to access the File: ${fileName}`)
        }
        console.log('Error writing to file:',error.message);
    }
}

//Verfying the Summary Files and Cleaning up Test Files
export function cleanpUpTestFiles(testFileName,summaryFile){
    if (fs.existsSync(summaryFile)) {
        console.log(`\nSummary file created: ${summaryFile}`)
        const content = fs.readFileSync(summaryFile, 'utf8')

        const checks = [
        'Total readings: 15',
        'Valid readings: 15',
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