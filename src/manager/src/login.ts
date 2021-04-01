import { storage } from "@shared/types";

export default function (params: { options: storage }): void {
  const { options } = params;

  /**
   * Checkt beim Call, ob Benutzername und Passwort eingegeben wurden und loggt den Benutzer, wenn beides gemacht wurde, ein.
   * @param data Die Booleans, ob Benutzername & Passwort eingegeben wurden
   */
  function checkAndLogin(data: { passIn: boolean; userIn: boolean }) {
    console.log({
      passIn: data.passIn,
      userIn: data.userIn,
    });
    if (data.userIn && data.passIn && options["autologin_untrusted"]) {
      localStorage.setItem("MoodleHelperTools_ReDirect", "true");
      document.getElementById("loginbtn").click();
    }
  }

  /**
   * Der Login Knopf auf der Startseite, oben rechts
   */
  const loginContA = document.querySelector(".usermenu .login a");
  console.log(loginContA);

  // Startseite. Von Hier entweder zum Login oder zum Dashboard
  if (location.href === "https://moodle.jsp.jena.de/") {
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
  }

  // Login Seite.
  else if (location.href === "https://moodle.jsp.jena.de/login/index.php") {
    if (!options["autologin_untrusted"]) {
      const login_form = document.getElementById("login");
      const login_button = document.getElementById("loginbtn");
      login_button.style.marginBottom = "15px";
      login_form.insertAdjacentHTML(
        "afterend",
        '<span style="color: grey;">Benutzt du einen<br><b>Passwort-Manager</b>?<br />Dann kanst du<br><b>"AutoFill-AutoLogin"</b> in den <b>Schulm**dleJena Tools Einstelungen</b> einschalten, um dich noch schneller Anzumelden!</span>'
      );
    } else {
      let userIn = false;
      let passIn = false;

      const input_username = document.getElementById("username");
      const input_password = document.getElementById("password");

      // Check both, for the occasion the extension loaded too late
      {
        if ((input_username as HTMLInputElement | null)?.value?.length > 0) {
          userIn = true;
          checkAndLogin({ passIn, userIn });
        }
        if ((input_password as HTMLInputElement | null)?.value?.length > 0) {
          passIn = true;
          checkAndLogin({ passIn, userIn });
        }
      }

      // Benutzername Observen
      input_username.addEventListener("input", (e) => {
        if ((e.target as HTMLInputElement | null)?.value?.length > 0) {
          userIn = true;
          checkAndLogin({ passIn, userIn });
        }
      });

      // Passwort observen
      input_password.addEventListener("input", (e) => {
        if ((e.target as HTMLInputElement | null)?.value?.length > 0) {
          passIn = true;
          checkAndLogin({ passIn, userIn });
        }
      });
    }
  }
}
