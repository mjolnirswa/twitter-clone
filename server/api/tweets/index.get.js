import { getTweets } from "~/server/db/tweet"
import { tweetTransformer } from "~/server/transformers/tweets"


export default defineEventHandler(async (event) => {
    const { query } = getQuery(event)

    let primsaQuery = {
        include: {
            author: true,
            mediaFiles: true,
            replies: {
                include: {
                    author: true
                }
            },
            replyTo: {
                include: {
                    author: true
                }
            }
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    }

    if (!!query) {
        primsaQuery = {
            ...primsaQuery,
            where: {
                text: {
                    contains: query
                }
            }
        }
    }

    const tweets = await getTweets(primsaQuery)


    return {
        tweets: tweets.map(tweetTransformer)
    }
})