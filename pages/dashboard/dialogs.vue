<script lang="ts" setup>
const {
  data: response,
  pending,
  error,
} = useFetch<{
  recipients: [{
    firstName?: string,
    telegramChatId: number,
    freeSpin: number,
    subscribe: boolean
  }];
}>(() => `https://drvcash.com/backendapi/telegram/all-recipients`, {
  method: "get",
  headers: {
    Authorization: `Bearer ${useCookie("token").value}`,
    "Content-Type": "application/json", // Укажите тип контента, если это необходимо,
  },
});

async function goto(id: number) {
    useRouter().push('/dashboard/chats/' + id)
}
</script>
<template>
  <div>
    <DashboardHeadingComponent title="Пользователи" />
    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">Could not load quote: {{ error }}</pre>
    <table v-else-if="response?.recipients.length" class="mt-4 table align-middle text-center table-sm">
      <thead>
        <tr>
          <th style="width: 15px; height: 15px" scope="col">
            <input
              style="display: block; margin-bottom: 4px"
              class="form-check-input mt-0"
              type="checkbox"
              value=""
              aria-label="check all"
            />
          </th>
          <th style="width: 15px" scope="col" class="small">#</th>
          <th scope="col" class="small" style="text-align: left">
            Имя пользователя
          </th>
          <th scope="col" class="small" style="text-align: left">ID пользователя</th>
          <th scope="col" class="small">Вопросов осталось</th>
          <th scope="col" class="small">Попдиска</th>
          <th scope="col" class="small">Диалог</th>
          <!-- <th scope="col" class="small">Удалить</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-item selected"
          v-for="(recipient, index) in response?.recipients"
          :key="index"
        >
          <td style="padding: 0">
            <input
              style="margin: auto; display: block"
              class="form-check-input mt-0"
              type="checkbox"
              value=""
              aria-label="выбрать пользователя"
            />
          </td>
          <th>{{ index + 1 }}</th>
          <td style="text-align: left">{{ recipient.firstName ? recipient.firstName : 'Нет имени пользователя' }}</td>
          <td style="text-align: left">
            <pre
              style="margin-bottom: 0; padding: 0"
            >{{ recipient.telegramChatId }}</pre>
          </td>
          <td>{{ recipient.subscribe ? '∞' : recipient.freeSpin }}</td>
          <td>{{ recipient.subscribe ? '✅' : '❌' }}</td>
          <td><button class="btn btn-dark btn-sm" @click="goto(recipient.telegramChatId)"><i class="bi bi-chat-square-text"></i></button></td>
          <!-- <td class="text-center"><button class="btn btn-danger btn-sm btn-delete"><i class="bi bi-trash"></i> -->
          <!-- </button></td> -->
        </tr>
      </tbody>
    </table>
    <p v-else>Пользователей ещё нет</p>
  </div>
</template>

<style lang="scss" scoped>
.btn {
    padding: 0 5px;
    font-size: 12px;
}</style>