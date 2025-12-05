import { readFileContent } from './fileHandling.mjs';
import { parseTemperatureData } from './dataParsing.mjs';

//Performing Computation on the Data
export function processBatch(fileName){
    const fileContent=readFileContent(fileName);
    if(!fileContent){
        return null;
    }

    const rawParseResults = parseTemperatureData(fileContent);
    const parseResults=rawParseResults || {};
    const {validReadings=[]}=parseResults;

    if (validReadings.length === 0) {
        console.log('No valid temperature data found.')
        return null
    }

    const temps = validReadings.map(r => r.temp)
    const maxTemp = Math.max(...temps)
    const minTemp = Math.min(...temps)
    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length

    return{
        ...rawParseResults,
        fileName,
        maxTemp,
        minTemp,
        avgTemp,
    }
}