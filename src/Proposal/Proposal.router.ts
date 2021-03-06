import {Request, Response, Router} from "express";
import multer from "multer";
import {nanoid} from "nanoid";

import {IProposalController} from "./Proposal.controller";
import ProposalRoutes from "./Proposal.routes";
import {validateCreateProposal, validateProposalId} from "./Proposal.middleware";
import {addUserInfo, validateAuthorization} from "../middlewares";
import dependenciesResolver from "../dependenciesResolver";

const proposalController = dependenciesResolver.get('proposalController') as IProposalController;
const proposalRouter = Router();

const attachments = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, './src/resources/attachments/'),
        filename: (req, file, cb) => cb(null, nanoid())
    })
});

proposalRouter.get(
    ProposalRoutes.GET_PROPOSALS,
    addUserInfo,
    (req: Request, res: Response) => proposalController.getAll(req, res)
);

proposalRouter.get(
    ProposalRoutes.GET_PROPOSAL,
    validateProposalId,
    addUserInfo,
    (req: Request, res: Response) => proposalController.getById(req, res)
);

proposalRouter.post(
    ProposalRoutes.CREATE_PROPOSAL,
    validateAuthorization,
    attachments.array('attachments[]'),
    validateCreateProposal,
    (req: Request, res: Response) => proposalController.create(req, res)
);

proposalRouter.post(
    ProposalRoutes.LIKE_PROPOSAL,
    validateAuthorization,
    (req: Request, res: Response) => proposalController.like(req, res)
);

proposalRouter.post(
    ProposalRoutes.DISLIKE_PROPOSAL,
    validateAuthorization,
    (req: Request, res: Response) => proposalController.dislike(req, res)
);

export default proposalRouter;