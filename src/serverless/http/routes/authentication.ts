import * as Postgres from "../../../common/postgres";
import {
  Serverless,

  authenticationMiddleware,
  queryToJsonMiddleware
} from "../../../common/serverless";
import * as controller from "../controllers/authentication";

// Connect to Postgres.
Postgres.setup();

// Create a new serverless application.
const app = new Serverless();
app.use(queryToJsonMiddleware);

/**
 * @api {get} /authentication/check-availability Check Availability
 * @apiName CheckAvailability
 * @apiGroup Authentication
 * @apiDescription Checks if an email address is available.
 *
 * @apiParam {String} email The email address.
 *
 * @apiSuccess {Boolean} isAvailable True if the email is available, false otherwise.
 */
app.get("check-availability", controller.checkAvailability);

/**
 * @api {post} /authentication/login Log In
 * @apiName LogIn
 * @apiGroup Authentication
 * @apiDescription Logs in a user with given email address and password and returns an access token.
 *
 * @apiParam {String} email The user's email address.
 * @apiParam {String} password The user's password.
 *
 * @apiSuccess {String} refreshToken The new refresh token.
 * @apiSuccess {String} token The new access token.
 * @apiSuccess {Object} user The user.
 */
app.post("login", controller.login);

/**
 * @api {delete} /authentication/logout Log Out
 * @apiName LogOut
 * @apiGroup Authentication
 * @apiDescription Logs a user out.
 */
app.delete("logout", authenticationMiddleware, controller.logout);

/**
 * @api {post} /authentication/refresh-token Refresh Token
 * @apiName RefreshToken
 * @apiGroup Authentication
 * @apiDescription Returns a new access token if the refresh token is valid.
 *
 * @apiParam {String} token The user's refresh token.
 *
 * @apiSuccess {String} refreshToken The new refresh token.
 * @apiSuccess {String} token The new access token.
 * @apiSuccess {Object} user The user.
 */
app.post("refresh-token", controller.refreshTokenn);

/**
 * @api {post} /authentication/request-password-reset Request Password Reset
 * @apiName RequestPasswordReset
 * @apiGroup Authentication
 * @apiDescription Sends password reset email to the user.
 *
 * @apiParam {String} email The user's email address.
 */
app.post("request-password-reset", controller.requestPasswordReset);

/**
 * @api {post} /authentication/reset-password Reset Password
 * @apiName ResetPassword
 * @apiGroup Authentication
 * @apiDescription Resets a user's password.
 *
 * @apiParam {String} resetHash The reset password hash.
 * @apiParam {String} password The new password.
 */
app.post("reset-password", controller.resetPassword);

/**
 * @api {post} /authentication/signup Sign Up
 * @apiName SignUp
 * @apiGroup Authentication
 * @apiDescription Creates a user with given email address and password.
 *
 * @apiParam {String} email The user's email address.
 * @apiParam {String} password The user's password.
 *
 * @apiSuccess {Object} user The created user.
 */
app.post("signup", controller.signup);

export const index = app.listen.bind(app);