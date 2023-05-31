import { getUserByUsername } from "~/server/db/users";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { createRefreshToken } from "~/server/db/refreshTokens";
import { sendError } from "h3";
import { userTransformer } from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    const { username, password } = body;

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    const user = await getUserByUsername(username);
    
    if(!user) {
        console.log("User is not defined!!!")
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }


    const doesThePasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Passwords does not match'
        }))
    }

    //Generate Tokens
    
    //Access Token

    //Refresh Token
    const {accessToken, refreshToken} = generateTokens(user);

    //Save in db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // Add cookie
    sendRefreshToken(event, refreshToken);

    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
})