"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProposalRoutes;
(function (ProposalRoutes) {
    ProposalRoutes["GET_PROPOSALS"] = "/";
    ProposalRoutes["GET_PROPOSAL"] = "/:id";
    ProposalRoutes["CREATE_PROPOSAL"] = "/";
    ProposalRoutes["LIKE_PROPOSAL"] = "/like";
    ProposalRoutes["DISLIKE_PROPOSAL"] = "/dislike";
    ProposalRoutes["GET_TAGS"] = "/tags";
})(ProposalRoutes || (ProposalRoutes = {}));
exports.default = ProposalRoutes;
