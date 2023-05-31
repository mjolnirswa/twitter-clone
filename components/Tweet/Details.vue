<template>
    <div>
        <TweetItem :tweet="props.tweet"></TweetItem>

        <TweetForm placeholder="Tweet your reply" :user="props.user" :replyTo="props.tweet"
        @onSuccess="handleFormSuccess"></TweetForm>

        <TweetListFeed :tweets="replies"></TweetListFeed>
    </div>
</template>

<script setup>
const props = defineProps({
    tweet: {
        type: Object,
        require: true
    },
    user: {
        type: Object,
        require: true
    },
})

const replies = computed(() => props.tweet?.replies || [])

function handleFormSuccess(tweet) {
    navigateTo({
        path: `/status/${tweet.id}`
    })
}
</script>