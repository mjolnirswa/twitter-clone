import { getTweetById } from "~/server/db/tweet"
import { tweetTransformer } from "~/server/transformers/tweets"


export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    if(!id) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid ID'
        }))
    }

    const tweet = await getTweetById(id, {
        include: {
            author: true,
            mediaFiles: true,
            replyTo: {
                include: {
                    author: true
                }
            },
            replies: {
                include: {
                    mediaFiles: true,
                    author: true,
                    replyTo: {
                        include: {
                            author: true
                        }
                    }
                }
            }
        }
    })

    return {
        tweet: tweetTransformer(tweet)
    }
})