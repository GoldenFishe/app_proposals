export interface ICommentDTO {
    id: number;
    comment: string;
    authorId: number;
    proposalId: number;
    rating: number;
}