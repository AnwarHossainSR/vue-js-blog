<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

interface Post {
  id: number
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

const store = useStore()
const route = useRoute()
const postData = ref<Post>()

onMounted(async () => {
  const slug = route.params.slug
  if (slug) {
    try {
      await store.dispatch('fetchSinglePost', slug) // Update action name
      postData.value = store.getters.getSinglePost // Update getter name
      console.log('postData:', postData.value)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  } else {
    console.error('Invalid or missing "slug" parameter in the query.')
  }
})
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
                v-for="comment in postData?.comments"
                :key="comment.id"
                class="comment flex space-x-4 border-b border-border py-8"
              >
                <div class="comment flex space-x-4 border-b border-border py-8">
                  <img
                    src="/images/comment-author-1.png"
                    class="h-[70px] w-[70px] rounded-full"
                    alt=""
                  />
                  <div>
                    <h4 class="font-primary text-lg font-medium capitalize">ronin bishop</h4>
                    <p class="mt-2.5">
                      April 18, 2020 at 6.25 pm
                      <a class="ml-4 text-primary" href="#">Replay</a>
                    </p>
                    <p class="mt-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec et ipsum
                      ullamcorper venenatis fringilla. Pretium, purus eu nec vulputate vel habitant
                      egestas.ornare ipsum
                    </p>
                  </div>
                </div>
                <div class="comment flex space-x-4 py-8">
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec et ipsum
                      ullamcorper venenatis fringilla. Pretium, purus eu nec vulputate vel habitant
                      egestas.ornare ipsum
                    </p>
                  </div>
                </div>
              </div>

              <div class="no-comments py-4" v-if="!postData?.comments.length">
                <h6>No comments yet. Be the first to leave a comment</h6>
              </div>
            </div>
            <form class="comment-form" action="#" method="POST">
              <p class="mb-4">LEAVE A REPLAY</p>
              <div class="form-group">
                <textarea cols="30" rows="10"></textarea>
              </div>
              <div class="row mb-8">
                <div class="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Name" />
                </div>
                <div class="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Email" />
                </div>
                <div class="form-group mt-8 md:col-6 lg:col-4">
                  <input type="text" placeholder="Website" />
                </div>
              </div>
              <div class="form-group relative flex pl-6">
                <input class="absolute left-0 top-1" type="checkbox" id="save-info" />
                <label class="block" for="save-info"
                  >Save my name, email, and website in this browser for the next time I
                  comment.</label
                >
              </div>
              <input
                type="Submit"
                class="btn btn-primary mt-8 min-w-[189px] cursor-pointer"
                value="Post Comment"
              />
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ./end blog-single -->
  </main>
</template>
