import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default (request: VercelRequest, response: VercelResponse): void => {
  if (request.query["state"] === request.query["smjt_state"]) {
    axios
      .post("https://todoist.com/oauth/access_token", null, {
        params: {
          client_id: request.query["client_id"],
          client_secret: process.env.todoist_client_secret,
          code: request.query["code"],
        },
      })
      .then(
        (result) => {
          console.log("Resolved");
          console.log(result);
          response.redirect(
            "https://smjt.robertstuendl.com/api/todoist-loggedin?token=" +
              result.data.access_token,
          );
        },
        (result) => {
          console.log("Rejected");
          console.log(result);
          response.json(result.data);
        },
      );
  } else {
    response
      .status(500)
      .send(
        "Fehler! State stimmt nicht überein: Ihre Anfrage von anderen Parteien kompromittiert wurde und der Vorgang wurde abgebrochen.",
      );
  }
};
