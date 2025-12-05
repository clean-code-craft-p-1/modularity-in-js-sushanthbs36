//Parsing the temperature data and returning the results
export function parseTemperatureData(fileContent){
      const lines = fileContent.split('\n')
      const validReadings = []
      const badLines = []
      let num_blank_lines = 0
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) {
          num_blank_lines++
          continue
        }
        const parts = line.split(',')
        if (parts.length !== 2) {
          badLines.push({ index: i, line })
          continue
        }
        const timeStamp = parts[0].trim()
        const value = parts[1].trim()
        // Validate timestamp
        if (timeStamp.split(':').length !== 3) {
          badLines.push({ index: i, line })
          continue
        }
        let temp
        try {
          temp = parseFloat(value)
          if (isNaN(temp)) {
            throw new Error('Invalid number')
          }
        } catch (error) {
          badLines.push({ index: i, line })
          continue
        }
        // Drop impossible temperatures ranges
        if (temp < 20 || temp > 110) {
          badLines.push({ index: i, line })
          continue
        }
        validReadings.push({ timeStamp, temp })
      }
      return {
        validReadings,
        totalLines: lines.length,
        blankLines: num_blank_lines,
        badLines,
        errors: badLines.length
      }
}