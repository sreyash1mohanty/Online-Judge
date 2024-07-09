const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const dirInputs = path.join(__dirname, "inputs");
if(!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, {recursive: true});
}
const generateInput = (input) => {
    const jobId = uuid();
    const inputfileName = `${jobId}.txt`
    const inputFilePath = path.join(dirInputs, inputfileName);
    fs.writeFileSync(inputFilePath , input);
    return inputFilePath;
}
module.exports={generateInput,};