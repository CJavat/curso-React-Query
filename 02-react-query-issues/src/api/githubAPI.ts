import axios from "axios";

export const githubAPI = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: "Bearer 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"
  }
});