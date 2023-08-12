import { FC } from "react";
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue } from "../interfaces";
import { State } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getIssueComment, getIssueInfo } from "../hooks/useIssue";
import { timeSince } from "../../helpers";

// Props
interface Props {
    issue: Issue;
}

export const IssueItem:FC<Props> = ({ issue }) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const prefetchData = () => {
        //* CARGA LOS DATOS ANTICIPADAMENTE
        queryClient.prefetchQuery(
            ['issue', issue.number],
            () => getIssueInfo( issue.number )
        );

        queryClient.prefetchQuery(
            ['issue', issue.number, 'comments'],
            () => getIssueComment( issue.number )
        );
    }

    const preSetData = () => {
        queryClient.setQueryData(
            [ 'issue', issue.number ],
            issue,
            {
                // ÉSTO HACE QUE QUEDE LOS DATOS CARGADOS HASTA QUE LLEGUE A ESA FECHA
                updatedAt: new Date().getTime() + 100000
            }
        );
    }

    return (
        <div className="card mb-2 issue" 
            onClick={ () => navigate(`/issues/issue/${issue.number}`) }
            onMouseEnter={ preSetData }
            // onMouseEnter={ prefetchData }
        >
            <div className="card-body d-flex align-items-center">
                
                {
                    issue.state === State.Open
                        ? ( <FiInfo size={30} color="red" /> )
                        : ( <FiCheckCircle size={30} color="green" /> )
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ issue.title }</span>
                    <span className="issue-subinfo">#{ issue.number } opened { timeSince(issue.created_at) } days ago by <span className='fw-bold'>{ issue.user.login }</span></span>
                    <div>
                        {
                            issue.labels.map( label => (
                                <span 
                                    key={ label.id } 
                                    className="badge rounded-pill m-1"
                                    style={{ backgroundColor: `#${ label.color }`, color: "black" }}
                                >
                                    { label.name }
                                </span>
                            ) )
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={ issue.user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className='px-2'>{ issue.comments }</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
