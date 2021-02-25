import {query} from "../db";
import {CommentMapper} from "./Comment.mapper";
import {ICommentDTO} from "./Comment.dto";
import {IProposal} from "../Proposal/Proposal.repository";

export interface IComment {
    id: number;
    comment: string;
    author_id: number;
    proposal_id: IProposal["id"];
    rating: number;
}

export interface ICommentsRepository {
    create(commentText: string, authorId: number, proposalId: number): Promise<ICommentDTO>;
}

export class CommentRepository implements ICommentsRepository {
    async create(commentText: string, authorId: number, proposalId: number): Promise<ICommentDTO> {
        const [comment]: IComment[] = await query(`INSERT INTO comments (comment, author_id, proposal_id) VALUES ('${commentText}', ${authorId}, ${proposalId}) RETURNING *`);
        return CommentMapper.toDTO(comment);
    }
}