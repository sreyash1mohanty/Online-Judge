import path from 'path';
import fs from 'fs'
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
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