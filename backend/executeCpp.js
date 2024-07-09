const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}
const executeCpp = (filepath,inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        exec(
            `g++-14 '${filepath}' -o '${outPath}' && cd '${outputPath}' && ./'${jobId}.out' < '${inputPath}'`,
            
            (error, stdout, stderr) => {
                if (error) {
                    console.log(error);                  
                    reject({ error, stderr });
                } else if (stderr) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
};

module.exports = {
    executeCpp,
};
