const { exec } = require("child_process");
(async () => {
  const zipper = exec(
    `powershell Compress-Archive tsconfig.json,package.json,package-lock.json,README.md,dist,src code.zip`,
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
