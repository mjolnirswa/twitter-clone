import { sendError } from "h3";
import { createUser } from "~/server/db/users";
import { userTransformer } from "~/server/transformers/user";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { createRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {username, email, password, repeatPassword, name} = body;

    if (!username || !email || !password || !repeatPassword || !name) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }));
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Password do not match'
        }));
    }

    const userData = {
        username,
        email,
        password,
        name,
        profileImage: 'https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
    }

    const user = await createUser(userData);

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