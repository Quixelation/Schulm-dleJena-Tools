import Cryptr from "cryptr";

import { sha256 } from "crypto-hash";

import axios from "axios";

const sessionStorageKey = "moodle-api-token";

function getKeyToHash() {
  return (document.querySelector(
    ".usertext"
  ) as HTMLSpanElement).innerText.trim();
}

async function decryptToken(encryptedToken: string, key: string) {
  const cryptr = new Cryptr(await sha256(key));
  const decryptedString = cryptr.decrypt(encryptedToken);
  return decryptedString;
}

async function encryptToken(token: string, key: string) {
  const cryptr = new Cryptr(await sha256(key));
  const encryptString = cryptr.encrypt(token);
  return encryptString;
}

encryptToken("Hello", "rob").then((e) => {
  console.log(e);
  decryptToken(e, "rob").then(console.log);
});

async function saveToken(token: string) {
  chrome.storage.local.set({
    apiToken: encryptToken(token, await sha256(getKeyToHash())),
  });
}

function getToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("apiToken", async (values) => {
      resolve(decryptToken(values["apiToken"], await sha256(getKeyToHash())));
    });
  });
}

function getTokenFromApi(
  username: string,
  password: string
): Promise<{ token: string; privateToken: string }> {
  return new Promise((resolve, reject) => {
    axios(
      `https://moodle.jsp.jena.de/login/token.php?service=moodle_mobile_app`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          username,
          password,
        },
        method: "POST",
      }
    ).then((value) => {
      const token = value.data.token;
      const privateToken = value.data.privatetoken;
      resolve({ token, privateToken });
    });
  });
}

function loginToApi(username: string, password: string) {
  return new Promise((resolve, reject) => {
    getTokenFromApi(username, password).then((value) => {
      //TODO: Some Checking
      const token = value.token;
      const privateToken = value.privateToken;
      axios(
        `https://moodle.jsp.jena.de/webservice/rest/server.php?moodlewsrestformat=json`,
        {
          params: {
            wstoken: token,
            wsfunction: "core_webservice_get_site_info",
          },
        }
      ).then((value) => {
        //TODO: checking
        const userData = {
          username: value.data.username,
          firstname: value.data.firstname,
          lastname: value.data.lastname,
          fullname: value.data.fullname,
        };
        const userId = value.data.userid;
        resolve(new MoodleClient(userData, userId, token, privateToken));
      });
    });
  });
}

class MoodleClient {
  userData: {
    username: string;
    firstname: string;
    lastname: string;
    fullname: string;
  };
  sitename: string;
  url: "moodle.jsp.jena.de";
  token: string;
  userId: number;
  private privateToken: string;
  constructor(
    userData: {
      username: string;
      firstname: string;
      lastname: string;
      fullname: string;
    },
    userId: number,
    token: string,
    privateToken: string
  ) {
    this.userData = userData;
    this.userId = userId;
    this.token = token;
    this.privateToken = privateToken;
  }

  getCourses() {
    return new Promise((resolve, reject) => {
      axios(
        `https://${this.url}/webservice/rest/server.php?moodlewsrestformat=json`,
        {
          params: {
            wstoken: this.token,
            // wsfunction: "core_enrol_get_users_courses",
            wsfunction: "core_calendar_get_calendar_events",
            userid: this.userId,
          },
        }
      ).then((value) => {
        resolve(value.data);
      });
    });
  }
  getCourseContent(token: string) {
    return new Promise((resolve, reject) => {
      const params = {
        wstoken: token,
        // wsfunction: "core_enrol_get_users_courses",
        wsfunction: "core_course_get_contents",

        courseid: 2403,
      };
      axios(
        `https://${this.url}/webservice/rest/server.php?moodlewsrestformat=json`,
        {
          params,
        }
      ).then((value) => {
        resolve(value.data);
      });
    });
  }
}

function loginPageHandler() {
  document.getElementById("loginbtn").addEventListener("click", (e) => {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    console.log("Getting TOken with", { username, password });
    getTokenFromApi(username, password).then((value) => {
      saveToken(value.token);
    });
  });
}

export { loginPageHandler };
