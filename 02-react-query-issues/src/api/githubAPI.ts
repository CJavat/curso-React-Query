import axios from "axios";

export const githubAPI = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: "Bearer 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"
  }
});