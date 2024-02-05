<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

interface Post {
  id: number
  slug: string
  title: string
  image_path: any
  category: {
    id: number
    title: string
  }
  body: string
  createdAt: string
  author: {
    id: number
    name: string
  }
  comments: any[]
}

import { computed } from 'vue'

const store = useStore()
const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
const route = useRoute()
const postData = ref<Post>()
const commentText = ref('')

onMounted(async () => {
  const slug = route.params.slug
  if (slug) {
    try {
      await store.dispatch('posts/fetchSinglePost', slug)
      postData.value = store.state.posts.singlePost
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  } else {
    console.error('Invalid or missing "slug" parameter in the query.')
  }
})

// Watch for changes in store.state.posts.singlePost and update postData
watch(
  () => store.state.posts.singlePost,
  (newSinglePost) => {
    postData.value = newSinglePost
  }
)

const submitForm = async () => {
  if (isAuthenticated.value) {
    const postSlug = postData?.value?.slug ?? ''
    const comment = commentText.value
    try {
      await store.dispatch('posts/createComment', { postSlug, comment })
      // Clear the comment text area
      commentText.value = ''
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  } else {
    // Redirect to login page
    // Example: router.push('/login')
  }
}
</script>

<template>
  <main>
    <!-- floating assets -->
    <img
      class="floating-bubble-1 absolute right-0 top-0 -z-[1]"
      src="/images/floating-bubble-1.svg"
      alt=""
    />
    <img
      class="floating-bubble-2 absolute left-0 top-[387px] -z-[1]"
      src="/images/floating-bubble-2.svg"
      alt=""
    />
    <img
      class="floating-bubble-3 absolute right-0 top-[605px] -z-[1]"
      src="/images/floating-bubble-3.svg"
      alt=""
    />
    <!-- ./end floating assets -->

    <!-- blog single -->
    <section class="section blog-single">
      <div class="container">
        <div class="row justify-center">
          <div class="lg:col-10">
            <img class="rounded-xl" src="/images/blog-single.png" alt="" />
          </div>
          <div class="mt-10 max-w-[810px] lg:col-9">
            <h1 class="h2">{{ postData?.title }}</h1>
            <div class="mt-6 mb-5 flex items-center space-x-2">
              <div
                class="blog-author-avatar h-[58px] w-[58px] rounded-full border-2 border-primary p-0.5"
              >
                <img src="/images/blog-author.png" alt="" />
              </div>
              <div class="">
                <p class="text-dark">{{ postData?.author?.name }}</p>
                <span class="text-sm">{{ postData?.createdAt }} 5 Min read</span>
              </div>
            </div>

            <div class="content">
              <p>
                {{ postData?.body }}
              </p>
            </div>
            <div class="comments">
              <h3
                class="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8"
              >
                Comments
              </h3>
              <div
                v-for="item in postData?.comments"
                :key="item.id"
                class="comment flex-col space-x-4 border-b border-border py-8"
              >
                <div class="comment flex space-x-4 border-b border-border py-8">
                  <img
                    src="/images/comment-author-1.png"
                    class="h-[70px] w-[70px] rounded-full"
                    alt=""
                  />
                  <div>
                    <h4 class="font-primary text-lg font-medium capitalize">
                      {{ item.author.name }}
                    </h4>
                    <p class="mt-2.5">
                      {{ item.createdAt }}
                      <a class="ml-4 text-primary" href="#">Replay</a>
                    </p>
                    <p class="mt-5">
                      {{ item.comment }}
                    </p>
                  </div>
                </div>
                <div
                  class="comment flex space-x-4 py-8"
                  v-for="reply in item?.replies"
                  :key="reply.id"
                >
                  <img src="/images/icons/replay-arrow.svg" alt="" />
                  <img
                    src="/images/comment-author-2.png"
                    class="h-[70px] w-[70px] rounded-full"
                    alt=""
                  />
                  <div>
                    <h4 class="font-primary text-lg font-medium capitalize">Kathryn Murphy</h4>
                    <p class="mt-2.5">
                      April 18, 2020 at 6.25 pm
                      <a class="ml-4 text-primary" href="#">Replay</a>
                    </p>
                    <p class="mt-5">
                      {{ reply.comment }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="no-comments py-4" v-if="!postData?.comments.length">
                <h6>No comments yet. Be the first to leave a comment</h6>
              </div>
            </div>
            <form class="comment-form" @submit.prevent="submitForm">
              <p class="mb-4">LEAVE A REPLAY</p>
              <div class="form-group">
                <textarea cols="30" rows="10" v-model="commentText"></textarea>
              </div>
              <input
                type="submit"
                :class="{
                  btn: true,
                  'btn-primary': isAuthenticated,
                  'btn-disabled': !isAuthenticated
                }"
                :value="isAuthenticated ? 'Post Comment' : 'Login to Comment'"
                :disabled="!isAuthenticated"
              />
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ./end blog-single -->
  </main>
</template>

<style scoped>
/* Add your button styling here, e.g., btn-disabled styles */
.btn-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
