<script setup lang="ts">
import { validateSignUpForm } from '@/libs/validations/authValidation'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errors = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

const signUp = async () => {
  try {
    const validationErrors = validateSignUpForm(
      name.value,
      email.value,
      password.value,
      passwordConfirmation.value
    )

    if (Object.values(validationErrors).every((error) => !error)) {
      const credentials = {
        name: name.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value
      }
      await store.dispatch('auth/register', credentials)
      if (store.state.auth.isAuthenticated) {
        name.value = ''
        email.value = ''
        password.value = ''
        passwordConfirmation.value = ''
      }
    } else {
      errors.value = validationErrors
    }
  } catch (error) {
    console.error('Error during registration:', error)
  }
}
</script>

<template>
  <main>
    <section class="">
      <div class="container max-w-full">
        <div class="row">
          <div class="min-h-[980px] bg-white py-10 lg:col-6 lg:py-[114px]">
            <div class="mx-auto w-full max-w-[480px]">
              <img class="mb-8" src="/images/flower.svg" alt="" />
              <h1 class="mb-4">Sing Up</h1>
              <p>Donec sollicitudin molestie malesda sollitudin</p>
              <div class="signin-options mt-10">
                <a class="btn btn-outline-white block w-full text-dark" href="#"
                  >Sign Up With Google</a
                >
              </div>
              <div
                class="relative my-8 text-center after:absolute after:left-0 after:top-1/2 after:z-[0] after:w-full after:border-b after:border-border after:content-['']"
              >
                <span class="relative z-[1] inline-block bg-white px-2">Or Sign Up With Email</span>
              </div>

              <form @submit.prevent="signUp">
                <div class="form-group">
                  <label for="name" class="form-label">Full Name</label>
                  <input
                    v-model="name"
                    type="text"
                    id="name"
                    class="form-control"
                    placeholder="Your Full Name"
                  />
                  <div v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</div>
                </div>
                <div class="form-group mt-4">
                  <label for="email" class="form-label">Email Adrdess</label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    class="form-control"
                    placeholder="Your Email Address"
                  />
                  <div v-if="errors.email" class="text-red-500 text-sm mt-1">
                    {{ errors.email }}
                  </div>
                </div>
                <div class="form-group mt-4">
                  <label for="password" class="form-label">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Your Password"
                  />
                  <div v-if="errors.password" class="text-red-500 text-sm mt-1">
                    {{ errors.password }}
                  </div>
                </div>
                <div class="form-group mt-4">
                  <label for="passwordConfirmation" class="form-label">Confirm Password</label>
                  <input
                    v-model="passwordConfirmation"
                    type="password"
                    id="passwordConfirmation"
                    class="form-control"
                    placeholder="Confirmation"
                  />
                  <div v-if="errors.passwordConfirmation" class="text-red-500 text-sm mt-1">
                    {{ errors.passwordConfirmation }}
                  </div>
                </div>

                <!-- Display success message -->
                <div
                  v-if="store.state.auth.message"
                  class="bg-green-500 text-white p-4 rounded-md my-4"
                >
                  <strong>Success:</strong> {{ store.state.auth.message }}
                </div>
                <!-- Display errors -->
                <div
                  v-if="store.state.auth.errors != null || store.state.auth.errors != ''"
                  class="text-red-500 text-sm mt-4"
                >
                  <ul v-if="typeof store.state.auth.errors === 'string'">
                    <!-- If error message is a string, display it directly -->
                    <li class="font-bold">{{ store.state.auth.errors }}</li>
                  </ul>
                  <ul v-else>
                    <!-- If error message is an array, display each item in the array -->
                    <li
                      v-for="(error, index) in store.state.auth.errors"
                      :key="index"
                      class="font-bold"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
                <input class="btn btn-primary mt-10 block w-full" type="submit" value="Sign Up" />
              </form>
              <div class="py-2">
                <p class="mt-6 text-center">
                  Already have an account?
                  <RouterLink class="text-dark" to="/login">Sign in</RouterLink>
                </p>
              </div>
            </div>
          </div>

          <div
            class="auth-banner bg-gradient flex flex-col items-center justify-center py-16 lg:col-6"
          >
            <img
              class="absolute top-0 left-0 h-full w-full"
              src="/images/login-banner-bg.svg"
              alt=""
            />
            <div class="w-full text-center">
              <h2 class="h3 text-white">
                A suite product accelerate <br />
                your career design
              </h2>
              <div class="swiper auth-banner-carousel">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img
                      width="667"
                      height="557"
                      class="mx-auto"
                      src="/images/signup-carousel-img-1.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
