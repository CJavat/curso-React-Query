import axios from "axios";

export const githubAPI = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: "Bearer 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"
  }
});