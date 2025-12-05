import fs from 'fs';

//Error Handling in Files
export function handleFileError(error, fileName) {
    if (error.code === 'ENOENT') {
        console.log(`File not Found: ${fileName}`);
        return true;
    } else if (error.code === 'EACCES') {
        console.log(`Permission Denied to access the File: ${fileName}`);
        return true;
    }
    return false;
}

// Reading File Content
export function readFileContent(fileName) {
    try {
        return fs.readFileSync(fileName, 'utf-8');
    } catch (error) {
        if (!handleFileError(error, fileName)) {
            throw error;
        }
    }
}

// Writing Content to File
export function writeToFile(fileName, content) {
    try {
        fs.writeFileSync(fileName, content);
    } catch (error) {
        if (!handleFileError(error, fileName)) {
            console.log('Error writing to file:', error.message);
            throw error;
        }
    }
}
//Generating consistent summary filenames
export function generateSummaryFilename(originalFilename) {
    return originalFilename.replace('.csv', '_csv') + '_summary.txt';
}
