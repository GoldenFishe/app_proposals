import {Request, Response, Router} from "express";

import {ProposalRepository} from "./Proposal.repository";
import {ProposalController} from "./Proposal.controller";
import ProposalRoutes from "./Proposal.routes";
import {validateCreateProposal, validateProposalId} from "./Proposal.middleware";
import {validateAuthorization} from "../validators";

const proposalRepository = new ProposalRepository();
const proposalController = new ProposalController(proposalRepository);
const proposalRouter = Router();

proposalRouter.get(
    ProposalRoutes.GET_PROPOSALS,
    (req: Request, res: Response) => proposalController.getAll(req, res)
);

proposalRouter.get(
    ProposalRoutes.GET_PROPOSAL,
    validateProposalId,
    (req: Request, res: Response) => proposalController.getById(req, res)
);

proposalRouter.post(
    ProposalRoutes.CREATE_PROPOSAL,
    validateAuthorization,
    validateCreateProposal,
    (req: Request, res: Response) => proposalController.create(req, res)
);

proposalRouter.post(
    ProposalRoutes.LIKE_PROPOSAL,
    validateAuthorization,
    (req: Request, res: Response) => proposalController.likeProposal(req, res)
);

proposalRouter.post(
    ProposalRoutes.DISLIKE_PROPOSAL,
    validateAuthorization,
    (req: Request, res: Response) => proposalController.dislikeProposal(req, res)
);

export default proposalRouter;