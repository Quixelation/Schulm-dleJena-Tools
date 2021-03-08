const fs = require("fs");

process.on("SIGINT", function () {
  process.exit();
});

var readlineSync = require("readline-sync");
const manifestFile = fs.readFileSync("dist/manifest.json");
const manifest = JSON.parse(manifestFile);
console.log("Current Version > " + manifest.version);
var newVersion = readlineSync.question("New Version     > ");
if (newVersion == "") {
  throw new Error("Versionsfehler");
}
manifest.version = newVersion;
fs.writeFileSync("dist/manifest.json", JSON.stringify(manifest, null, 2));

const files = fs.readdirSync(".");
files.forEach((file) => {
  if ((file.match("SmJT_[0-9]+-[0-9]+.zip") ?? [""])[0] === file) {
    fs.renameSync(file, "versions/" + file);
  }
});

const { exec } = require("child_process");
(async () => {
  const zipper = exec(
    `powershell Compress-Archive ${fs
      .readdirSync("./dist")
      .map((item) => "./dist/" + item)
      .join(",")} SmJT_${newVersion.replace(/\./g, "-")}.zip`,
    function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log("Error code: " + error.code);
        console.log("Signal received: " + error.signal);
      }
    }
  );
  zipper.on("exit", function (code) {
    console.log("zipper exited with exit code " + code);
  });
})();
