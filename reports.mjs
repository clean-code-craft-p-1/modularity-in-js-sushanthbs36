import { writeToFile, generateSummaryFilename } from './fileUtils.mjs'

//Generating and Saving the Report
function formatSummary(results) {
    let reportContent = 'Temperature Analysis Summary\n' + '='.repeat(60) + '\n';
    const totalReadings = results.totalLines - results.blankLines;

    reportContent += `File analyzed: ${results.fileName}\n`;
    reportContent += `Total readings: ${totalReadings}\n`;
    reportContent += `Valid readings: ${results.validReadings.length}\n`;
    reportContent += `Errors: ${results.errors}\n`;
    reportContent += `Max temperature: ${results.maxTemp.toFixed(2)}\n`;
    reportContent += `Min temperature: ${results.minTemp.toFixed(2)}\n`;
    reportContent += `Average temperature: ${results.avgTemp.toFixed(2)}\n`;
    reportContent += '-'.repeat(60) + '\n';

    if (results.errors > 0) {
        reportContent += '\nInvalid lines:\n';
        for (const { index, line } of results.badLines) {
            reportContent += `  Line ${index + 1}: ${line}\n`;
        }
    }
    return reportContent;
}

export function generateAndSaveReport(filename, results) {
    if (!results) return;

    console.log('='.repeat(60));
    console.log(formatSummary(results));

    // Save to file
    const outName = generateSummaryFilename(filename);
    const fileReportContent = formatSummary(results, true);
    writeToFile(outName, fileReportContent);
    console.log(`Report saved to ${outName}`);
}

