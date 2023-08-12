import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githubAPI";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers/sleep";
import { useState } from "react";

interface Props {
  state: State;
  labels: string[];
  page?: number;
}

const getIssues = async ( { labels, page, state }:Props ):Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if( state ) params.append("state", state);

  if( labels.length > 0 ) {
    const labelString = labels.join(",");
    params.append('labels', labelString);
  }

  params.append("page", "1");
  params.append("per_page", "5");

  const { data } = await githubAPI.get<Issue[]>("/issues", { params });

  return data;
}

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState();

  const issuesQuery = useQuery(
    ['issues', { state, labels, page }],
    () => getIssues(labels, state, page)
  );


  return {
    // Properties
    issuesQuery,

    // Getter
    page,

    // Methods
    // nextPage,
    // prevPage
  }
}
