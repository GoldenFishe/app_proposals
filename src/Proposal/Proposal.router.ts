import {Request, Response, Router} from "express";

import {ProposalRepository} from "./Proposal.repository";
import {ProposalController} from "./Proposal.controller";
import ProposalRoutes from "./Proposal.routes";
import {validateCreateProposal, validateProposalId} from "./Proposal.middleware";

const proposalRepository = new ProposalRepository();
const proposalController = new ProposalController(proposalRepository);
const proposalRouter = Router();

proposalRouter.use(ProposalRoutes.GET_PROPOSAL, validateProposalId);
proposalRouter.use(ProposalRoutes.CREATE_PROPOSAL, validateCreateProposal);

proposalRouter.get(ProposalRoutes.GET_PROPOSALS, (req: Request, res: Response) => proposalController.getAll(req, res));
proposalRouter.get(ProposalRoutes.GET_PROPOSAL, (req: Request, res: Response) => proposalController.getById(req, res));
proposalRouter.post(ProposalRoutes.CREATE_PROPOSAL, (req: Request, res: Response) => proposalController.create(req, res));

export default proposalRouter;