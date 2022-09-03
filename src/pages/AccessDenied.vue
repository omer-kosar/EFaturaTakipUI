<template>
  <q-page>
    <q-card class="full-height">
      <q-card-section>
        <div class="row text-weight-medium text-justify justify-center">
          Bu sayfaya erişim yetkiniz bulunmamaktadır.
        </div>
        <div class="row justify-center">
          <q-icon name="warning" class="text-red" style="font-size: 4rem" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <q-btn to="/">Ana sayfaya dönmek için tıklayınız</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccessDenied",
  setup() {
    return {};
  },
});
</script>
