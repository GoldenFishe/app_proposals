import {query} from "../utils/db";
import IProposal from "../interfaces/Proposal.interface";

class ProposalsService {
    selectAll(): Promise<IProposal[]> {
        return query('SELECT * FROM proposals');
    }

    async selectById(id: number): Promise<IProposal> {
        const [proposal]: IProposal[] = await query(`SELECT * FROM proposals WHERE id=${id}`);
        return proposal;
    }

    async add(title: string, description: string, authorId: number): Promise<IProposal> {
        const [proposal]: IProposal[] = await query(`INSERT INTO proposals (title, description, author_id) VALUES ('${title}', '${description}', ${authorId}) RETURNING *`);
        return proposal;
    }
}

export default new ProposalsService();