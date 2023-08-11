import axios from "axios";

export const githubAPI = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: "Bearer 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"
  }
});