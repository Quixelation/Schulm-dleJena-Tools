import { storage } from "@shared/types";

export default function (params: { options: storage }) {
  const { options } = params;
  function checkAndLogin({ passIn, userIn }, optionValue: any) {
    console.log({ passIn, userIn });
    if (userIn && passIn && optionValue) {
      localStorage.setItem("MoodleHelperTools_ReDirect", "true");
      document.getElementById("loginbtn").click();
    }
  }
  var loginContA = document.querySelector(".usermenu .login a");
  console.log(loginContA);
  if (location.href === "https://moodle.jsp.jena.de/") {
    var loginContA = document.querySelector(".usermenu .login a");
    console.log({ loginContA });
    console.log(options["autologinredirect"]);
    if (loginContA && options["autologinredirect"] === true) {
      location.replace("https://moodle.jsp.jena.de/login/index.php");
    } else if (
      options["autodashboardredirect"] === true &&
      localStorage.getItem("MoodleHelperTools_ReDirect") === "true"
    ) {
      localStorage.removeItem("MoodleHelperTools_ReDirect");
      location.replace("https://moodle.jsp.jena.de/my/");
    }
  } else if (location.href === "https://moodle.jsp.jena.de/login/index.php") {
    var userIn = false;
    var passIn = false;
    document.getElementById("password").addEventListener("input", (e) => {
      if (true) {
        userIn = true;
        checkAndLogin({ passIn, userIn }, options["autologin_untrusted"]);
      }
    });
    document.getElementById("username").addEventListener("input", (e) => {
      if (true) {
        passIn = true;
        checkAndLogin({ passIn, userIn }, options["autologin_untrusted"]);
      }
    });
  }
}
