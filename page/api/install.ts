import axios from "axios";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default (request: VercelRequest, response: VercelResponse): void => {
  if (
    /bot|googlebot|crawler|spider|robot|crawling/i.test(
      request.headers["user-agent"],
    )
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

          content: null,
          embeds: [
            {
              title: "Die Erweiterung wurde gerade installiert.",
              description: request.headers["user-agent"],
              color: 5814783,
            },
          ],
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
