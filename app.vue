<template>
  <div :class="{'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">

      <UILoadingPage v-if="isAuthLoading"></UILoadingPage>

      <!-- App -->
      <div class="min-h-full" v-else-if="user">
          <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

            <!-- Left sideBar -->

            <div class="hidden md:block xs-col-span-1 xl:col-span-2">
              <div class="sticky top-0">
                <SideBarLeft 
                @on-tweet="handleOpenTweetModal"
                @on-logout="handleUserLogout" 
                :user="user"
                ></SideBarLeft>
              </div>
            </div>


            <!-- Main -->

            <main class="col-span-12 md:col-span-8 xl:col-span-6">
              <RouterView></RouterView>
            </main>


            <!-- Right sideBar -->

            <div class="hidden md:block xl:col-span-4 md:col-span-3">
              <div class="sticky top-0">
                <SideBarRight></SideBarRight>
              </div>
            </div>

          </div>
      </div>

      <AuthPage v-else>

      </AuthPage>

      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose">
          <TweetForm 
          :user="user" 
          @on-success="handleFormSuccess"
          :replyTo="replyTweet"
          showReply
          ></TweetForm>
      </UIModal>

  </div>
  </div>
</template>

<script setup>
const darkMode = ref(false);
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()
const emitter = useEmitter()

const postTweetModal = usePostTweetModal()
const replyTweet = useReplyTweet()

emitter.$on('replyTweet', (tweet) => {
    openPostTweetModal(tweet)
})

emitter.$on('toggleDarkMode', () => {
    darkMode.value = !darkMode.value
})

onBeforeMount(() => {
  initAuth()
})

function handleFormSuccess(tweet) {
  closePostTweetModal()

  navigateTo({
    path: `/status/${tweet.id}`
  })
}

function handleModalClose() {
  closePostTweetModal()
}

function handleOpenTweetModal() {
  openPostTweetModal(null)
}

function handleUserLogout() {
    logout()
}
</script>
