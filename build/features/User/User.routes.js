"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRoutes;
(function (UserRoutes) {
    UserRoutes["SIGN_IN"] = "/sign-in";
    UserRoutes["SIGN_UP"] = "/sign-up";
    UserRoutes["ACCESS_TOKEN"] = "/access-token";
    UserRoutes["INFO"] = "/";
    UserRoutes["UPDATE_INFO"] = "/";
    UserRoutes["GET_USER"] = "/:id";
})(UserRoutes || (UserRoutes = {}));
exports.default = UserRoutes;
