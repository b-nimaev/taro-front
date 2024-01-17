<template>
    <div>
        <DashboardHeadingComponent title="Статистические данные" />
        <div class="row">
            <div class="col-xl-5">
                <article class="mt-2">
                    <div>
                        <form action="" id="telegram-bot">
                            <h5 class="mb-3"># Приветствие</h5>
                            <div class="">
                                <label for="bot-token" class="form-label">Текст</label>
                                <textarea id="bot-token" class="form-control"></textarea>
                            </div>
                            <button class="btn btn-primary mt-3 disabled" aria-disabled="true">Соханить</button>
                        </form>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import { useReferalStore } from '@/stores/referal/referal';
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia

const store = useReferalStore()
const loading = storeToRefs(store).loading
const name = storeToRefs(store).name
const deeplink = storeToRefs(store).deeplink
</script>