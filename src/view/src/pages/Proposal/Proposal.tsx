import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {useFetch} from "../../hooks";
import IProposal from "../../interfaces/IProposal";

const Proposal: FC = () => {
    const {id}: { id: string } = useParams();
    const proposal: IProposal | null = useFetch(`/api/proposals/${id}`);
    return (
        <div>
            <div>
                <h6>{proposal?.title}</h6>
                <p>{proposal?.description}</p>
            </div>
            <ul>
                {proposal?.comments.map(comment => {
                    return (
                        <li>{comment.comment}</li>
                    )
                })}
            </ul>
        </div>
    )
};

export default Proposal;