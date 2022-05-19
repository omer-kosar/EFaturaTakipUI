<template>
  <router-view />
</template>
<script>
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
import { getItemFromStorage } from "./util/local-storage";
export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    $q.dark.set(getItemFromStorage("darkMode"));
  },
});
</script>
