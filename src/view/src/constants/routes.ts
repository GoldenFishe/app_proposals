import {FC} from "react";

import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Proposals from "../pages/Proposals/Proposals";
import CreateProposal from "../pages/CreateProposal/CreateProposal";
import Proposal from "../pages/Proposal/Proposal";
import Profile from "../pages/Profile/Profile";

type Route = {
    path: string;
    component: FC;
    exact?: boolean;
    getLinkPath: (param: number | string) => string;
}
type PageName = "signIn" | "signUp" | "proposals" | "createProposal" | "proposal" | "profile";
type Routes = Record<PageName, Route>

export const routes: Routes = {
    get signIn(): Route {
        return {
            path: "/sign-in",
            component: SignIn,
            getLinkPath: () => this.signIn.path
        }
    },
    get signUp(): Route {
        return {
            path: "/sign-up",
            component: SignUp,
            getLinkPath: () => this.signUp.path
        }
    },
    get proposals(): Route {
        return {
            path: "/proposals",
            component: Proposals,
            exact: true,
            getLinkPath: () => this.proposals.path
        }
    },
    get createProposal(): Route {
        return {
            path: `${this.proposals.path}/create`,
            component: CreateProposal,
            getLinkPath: () => this.createProposal.path
        }
    },
    get proposal(): Route {
        return {
            path: `${this.proposals.path}/:id`,
            component: Proposal,
            getLinkPath: (id: string | number) => this.proposal.path.replace(':id', String(id))
        }
    },
    get profile(): Route {
        return {
            path: "/profile/:id",
            component: Profile,
            getLinkPath: (id: string | number) => this.profile.path.replace(':id', String(id))
        }
    }
}

export const defaultRoute = routes.proposals.path;