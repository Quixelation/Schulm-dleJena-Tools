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
