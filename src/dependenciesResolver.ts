import {IUserRepository, UserRepository} from "./features/User/User.repository";
import {IProposalRepository, ProposalRepository} from "./features/Proposal/Proposal.repository";
import {CommentRepository, ICommentsRepository} from "./features/Comment/Comment.repository";
import {IUserController, UserController} from "./features/User/User.controller";
import {IProposalController, ProposalController} from "./features/Proposal/Proposal.controller";
import {CommentController, ICommentController} from "./features/Comment/Comment.controller";

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