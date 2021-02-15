import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {useFetch} from "../../hooks";
import IProposal from "../../interfaces/IProposal";

const Proposal: FC = () => {
    const {id}: { id: string } = useParams();
    const proposal: IProposal | null = useFetch(`/api/proposals/${id}`);
    return (
        <div>

        </div>
    );
};

export default Proposal;