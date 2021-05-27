import {IUserRepository, UserRepository} from "./User/User.repository";
import {IProposalRepository, ProposalRepository} from "./Proposal/Proposal.repository";
import {CommentRepository, ICommentsRepository} from "./Comment/Comment.repository";
import {IUserController, UserController} from "./User/User.controller";
import {IProposalController, ProposalController} from "./Proposal/Proposal.controller";
import {CommentController, ICommentController} from "./Comment/Comment.controller";

type DependencyName =
    | 'userRepository'
    | 'proposalRepository'
    | 'commentRepository'
    | 'userController'
    | 'proposalController'
    | 'commentController';
type Dependency =
    | IUserRepository
    | IProposalRepository
    | ICommentsRepository
    | IUserController
    | IProposalController
    | ICommentController;

const userRepository = new UserRepository();
const proposalRepository = new ProposalRepository();
const commentRepository = new CommentRepository();
const userController = new UserController(userRepository);
const proposalController = new ProposalController(proposalRepository);
const commentController = new CommentController(commentRepository);

export default new Map<DependencyName, Dependency>([
    ['userRepository', userRepository],
    ['proposalRepository', proposalRepository],
    ['commentRepository', commentRepository],
    ['userController', userController],
    ['proposalController', proposalController],
    ['commentController', commentController]
])