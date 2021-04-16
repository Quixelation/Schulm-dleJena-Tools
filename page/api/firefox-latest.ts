import { Octokit } from "@octokit/core";
import { VercelRequest, VercelResponse } from "@vercel/node";
const octokit = new Octokit({
  auth: process.env.GitHubApiToken,
});
export default async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> => {
  octokit
    .request("GET /repos/Quixelation/Schulm-dleJena-Tools/releases/latest", {
      owner: "Quixelation",
      repo: "Schulm-dleJena-Tools",
      accept: "application/vnd.github.v3+json",
    })
    .then((e) => response.redirect(e.data.assets[0].browser_download_url));
};
