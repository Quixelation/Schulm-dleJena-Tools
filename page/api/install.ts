import axios from "axios";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default (request: VercelRequest, response: VercelResponse): void => {
  if (
    /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)
  ) {
    response.redirect(
      "https://github.com/Quixelation/SchulmoodleJena-Tools/wiki/Danke",
    );
  } else {
    axios
      .post(
        process.env.WebhookUrl,
        {
          username: "SchulmoodleJena Tools",
          avatar_url: "https://i.ibb.co/YbqCBVc/icon.png",
          content: "Die Erweiterung wurde gerade installiert.",
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        },
      )
      .then(() => {
        response.redirect(
          "https://github.com/Quixelation/SchulmoodleJena-Tools/wiki/Danke",
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
