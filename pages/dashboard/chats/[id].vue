<script lang="ts" setup>
const route = useRoute();
const {
  data: response,
  pending,
  error,
} = useFetch(() => `https://drvcash.com/backendapi/telegram/${route.params.id}`, {
  method: "get",
  headers: {
    Authorization: `Bearer ${useCookie("token").value}`,
    "Content-Type": "application/json", // Укажите тип контента, если это необходимо,
  },
});

const {
  data: responseChat,
  pending: pendingChat,
  error: errorChat,
} = useFetch(() => `https://drvcash.com/backendapi/telegram/dialog/${route.params.id}`, {
  method: "get",
  headers: {
    Authorization: `Bearer ${useCookie("token").value}`,
    "Content-Type": "application/json", // Укажите тип контента, если это необходимо,
  },
});
</script>
<template>
  <div>
    <DashboardHeadingComponent title="Чат" />
    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">Could not load quote: {{ error }}</pre>
    <div v-if="response">
      <!-- {{ response }} -->
      <ul class="usedata">
        <li v-if="response.user.firstName">
          Имя: {{ response.user.firstName }}
        </li>
        <li v-if="response.user.telegramChatId">
          ID: {{ response.user.telegramChatId }}
        </li>
        <li v-if="response.user.subscribe">
          Статус подписки: {{ response.user.subscribe ? "✅" : "❌" }}
        </li>
      </ul>

      <div class="chat" v-if="responseChat">
        <div
          class=""
          v-for="(chat, index) in responseChat.chat.content"
          :key="index"
        >
          <div class="">
            <div class="message-wrapper">
              <p class="uesr">{{ chat.sender }}:</p>
              <p class="message-content"><pre>{{ chat.text }}</pre></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else>Пользователь не найден</p>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0 5px;
  font-size: 12px;
}

.usedata {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1.3rem;
  li {
    line-height: 2rem;
    font-size: 1.2rem;
  }
}
.message-wrapper {
  background-color: #f9f9f9;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 14px;
}
</style>