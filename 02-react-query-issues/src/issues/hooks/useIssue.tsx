import { useQuery } from "@tanstack/react-query"
import { githubAPI } from "../../api/githubAPI";
import { Issue } from "../interfaces";
import { sleep } from "../../helpers/sleep";

export const getIssueInfo = async ( issueNumber: number ):Promise<Issue> => {
  await sleep(2);
  const { data } = await githubAPI.get(`/issues/${ issueNumber }`);
  return data;
}

export const getIssueComment = async ( issueNumber: number ):Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubAPI.get<Issue[]>(`/issues/${ issueNumber }/comments`);
  return data;
}

export const useIssue = ( issueNumber: number ) => {
  
  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssueInfo( issueNumber ),
  );

  const commentsQuery = useQuery(
    ['issue', issueNumber, "comments"],
    () => getIssueComment( issueQuery.data!.number ),
    {
      enabled: issueQuery.data !== undefined
    }
  );
  
  
  return {
    issueQuery,
    commentsQuery
  }
}
