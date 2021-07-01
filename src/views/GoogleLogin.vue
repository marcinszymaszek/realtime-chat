<template>
  <section class="main-chat-container  mx-auto">
    <div class="m-auto">
      <h1 class="w-full text-center text-2xl mb-7">
        Please sign in with your Google Account to continue
      </h1>
      <button
        class="focus:outline-none hover:bg-gray-100 hover:shadow-lg border-gray-100 border shadow-md p-2 pl-2 pr-2 rounded inline-flex items-center content-center"
        @click="loginWithGoogle"
      >
        <img class="google-logo ml-3 mr-3" src="../assets/google-logo.svg" />
        <span class="btn-txt font-semibold">Sign in with Google</span>
      </button>
    </div>
  </section>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/app";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const loginWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const token = result.credential.accessToken;
          const user = result.user;
          router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
        });
    };

    return {
      loginWithGoogle,
      signInWithPopup,
      GoogleAuthProvider,
    };
  },
};
</script>

<style>
.main-chat-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  width: 35vw;
}

.google-logo {
  width: 15%;
  height: auto;
}

button {
  width: 15rem;
  cursor: pointer;
}

.btn-txt {
  color: #757779;
}

@media screen and (max-width: 1200px) {
  .main-chat-container {
    width: 40vw;
  }
}

@media screen and (max-width: 1024px) {
  .main-chat-container {
    width: 60vw;
  }
}

@media screen and (max-width: 480px) {
  h1 {
    width: 80%;
  }

  .main-chat-container {
    width: 90vw;
  }
}
</style>
