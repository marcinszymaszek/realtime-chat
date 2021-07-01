<template>
  <section class="main-chat-container  mx-auto">
    <div class="m-auto">
      <h1 class="w-full text-center text-2xl mb-7">
        Welcome to the Realtime Chat
      </h1>
      <div class="border rounded-lg">
        <ul
          class="h-96 p-1 
        bg-gray-100 
        inner-chat-container"
        >
          <li
            v-for="(chat, index) in chats"
            :key="index"
            class="m-1 p-1 px-3 rounded shadow"
            :class="
              chat.author === authUser.displayName
                ? 'bg-green-300 float-right clear-both'
                : 'bg-white float-left clear-both'
            "
          >
            <div class="inline-flex pb-0 mb-0 message-details">
              <span
                class="text-black font-semibold text-left align-bottom pl-3 time-date"
              >
                {{ chat.author }}
              </span>
              <span
                class="text-gray-400 text-xs text-right align-bottom pl-3 time-date"
              >
                {{
                  moment()
                    .locale("pl")
                    .format("LT")
                }}
              </span>
            </div>

            <div class="message-txt">
              {{ chat.message }}
            </div>
          </li>
        </ul>
      </div>
      <div class="h-8 pt-2">
        <input
          class="w-full p-1 overflow-x-auto border rounded"
          v-model="message"
          placeholder="Type sth..."
          @keydown.enter="saveMessage"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import moment from "moment";
import firebase from "firebase";
// import { onMounted, reactive } from "vue";
// import firebase, { chatsRef } from "../utilities/firebase";

export default {
  setup() {
    const message = ref(null);
    const chats = ref([]);
    const authUser = ref({});

    const scrollToBottom = (timeout) => {
      setTimeout(() => {
        const chatContainer = document.querySelector(".inner-chat-container");
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, timeout);
    };

    const saveMessage = () => {
      db.collection("chat").add({
        message: message.value,
        author: authUser.value.displayName,
        // createdAt: moment()
        //   .locale("pl")
        //   .format("LT"),
        createdAt: new Date(),
      });
      message.value = null;
    };

    const fetchMessages = () => {
      db.collection("chat")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          let allMessages = [];
          querySnapshot.forEach((doc) => {
            allMessages.push(doc.data());
          });
          chats.value = allMessages;
          scrollToBottom(1);
        });
    };

    onMounted(async () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          authUser.value = user;
        } else {
          authUser.value = {};
        }
      });
      fetchMessages();
    });

    return { message, chats, authUser, saveMessage, moment };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          vm.$router.push("/google-login");
        }
      });
    });
  },
};
</script>

<style>
p {
  width: fit-content;
}

.inner-chat-container {
  overflow-y: auto;
}

.main-chat-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  width: 35vw;
}

li {
  max-width: 85%;
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
  .main-chat-container {
    width: 90vw;
  }
}
</style>
