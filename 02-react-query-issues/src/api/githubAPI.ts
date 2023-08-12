import axios from "axios";

export const githubAPI = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: "Bearer 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"
  }
});