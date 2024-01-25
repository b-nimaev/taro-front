<script lang="ts" setup>
const customPrompts = ref([]);
const {
  data: promts,
  pending,
  error,
} = useFetch<{
  promts: [
    {
      text: string;
      is_edit: boolean;
      _id: string;
    }
  ];
}>(() => `https://drvcash.com/backendapi/promt`, {
  method: "get",
  headers: {
    Authorization: `Bearer ${useCookie("token").value}`,
    "Content-Type": "application/json", // Укажите тип контента, если это необходимо,
  },
  onResponse({ request, response, options }) {
    let prompt = {};

    const promts = response._data.promts;

    for (let i = 0; i < promts.length; i++) {
      promts[i].is_edit = false;
    }
  },
});

async function edit(id: string) {
  try {
    if (promts) {
      if (promts.value) {
        if (promts.value.promts) {
          for (let i = 0; i < promts.value.promts.length; i++) {
            let current_promt = promts.value.promts[i];

            if (current_promt._id === id) {
              current_promt.is_edit = true;
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function save(id: string) {
  try {
    if (promts) {
      if (promts.value) {
        if (promts.value.promts) {
          for (let i = 0; i < promts.value.promts.length; i++) {
            let current_promt = promts.value.promts[i];

            const {
              data: savePromt,
              pending: pendingSavePromt,
              error,
            } = useFetch(() => `https://drvcash.com/backendapi/promt/edit`, {
              method: "put",
              headers: {
                Authorization: `Bearer ${useCookie("token").value}`,
                "Content-Type": "application/json", // Укажите тип контента, если это необходимо,
              },
              body: {
                id: current_promt._id,
                value: current_promt.text,
              },
            });

            if (current_promt._id === id) {
              current_promt.is_edit = false;
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function deletePromt(id: string) {
  try {
    if (promts) {
      if (promts.value) {
        if (promts.value.promts) {
          for (let i = 0; i < promts.value.promts.length; i++) {
            let current_promt = promts.value.promts[i];

            const {
              data: savePromt,
              pending: pendingSavePromt,
              error,
            } = useFetch(() => `https://drvcash.com/backendapi/promt/delete`, {
              method: "delete",
              headers: {
                Authorization: `Bearer ${useCookie("token").value}`,
                "Content-Type": "application/json", // Укажите тип контента, если это необходимо,
              },
              body: {
                id: current_promt._id,
              },
              onResponse({ request, response, options }) {
                promts.value?.promts.splice(i, 1);
              },
            });

          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">Could not load quote: {{ error }}</pre>
    <form v-else-if="promts?.promts.length" @submit.prevent="">
      <table class="table align-middle text-center table-sm table-borderless">
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
            <th style="width: 100%; text-align: left" scope="col" class="small">
              Текст промта
            </th>
            <th scope="col" class="small"><i class="bi bi-pencil"></i></th>
            <th scope="col" class="small"><i class="bi bi-trash2"></i></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table-item selected"
            v-for="(promt, index) in promts?.promts"
            :key="index"
          >
            <td style="padding: 0">
              <input
                style="margin: auto; display: block"
                class="form-check-input mt-0"
                type="checkbox"
                value=""
                :aria-label="promt.text"
              />
            </td>
            <th>{{ index + 1 }}</th>
            <td style="text-align: left">
              <p v-if="promt.is_edit === false">{{ promt.text }}</p>
              <input
                v-else
                type="text"
                class="form-control"
                v-model="promt.text"
              />
            </td>
            <td style="text-align: left" v-if="promt.is_edit === false">
              <button @click="edit(promt._id)" class="btn btn-sm btn-primary">
                <i class="bi bi-pencil"></i>
              </button>
            </td>
            <td style="text-align: left" v-else>
              <button @click="save(promt._id)" class="btn btn-sm btn-primary">
                <i class="bi bi-check-all"></i>
              </button>
            </td>
            <td style="text-align: left">
              <button
                @click="deletePromt(promt._id)"
                class="btn btn-sm btn-danger"
              >
                <i class="bi bi-trash2"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <p v-else>Промтов нет</p>
  </div>
</template>

<style lang="scss" scoped>
.table-item {
  transition: 400ms;
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;
  &:hover {
    left: 3px;
  }
}

.table {
  font-size: 0.8rem;
  .btn {
    padding: 0 5px;
  }
}
</style>