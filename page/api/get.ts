import { VercelRequest, VercelResponse } from "@vercel/node";

export default (request: VercelRequest, response: VercelResponse): void => {
  const userAgent = request.headers["user-agent"];
  if (userAgent.indexOf("Chrome") != -1) {
    response.redirect("/chrome");
  } else if (userAgent.indexOf("Firefox") != -1) {
    response.redirect("/firefox");
  } else {
    response.redirect("/github");
  }
};
