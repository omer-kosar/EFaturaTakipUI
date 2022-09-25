<template>
  <q-page>
    <div class="row">
      <div
        v-for="(menuItem, index) in getMenu()"
        :key="index"
        class="column col-xs-6 col-sm-4 q-pa-xs menu-item cursor-pointer"
        @click="menuClick(menuItem)"
      >
        <q-card
          class="card-pointer text-center full-height text-white"
          :class="`bg-${colors[index % colors.length]}`"
          square
        >
          <q-card-section
            ><q-icon :name="menuItem.icon" size="md"></q-icon>
            <div class="text-weight-medium">{{ menuItem.title }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  mobil kullanıcı listesi,mobil stok listesi, fatura gönder, stok kayıt nokta
  virgül
</template>

<script>
import {
  adminMenu,
  companyMenu,
  finiancialadvisorMenu,
  userType,
} from "src/util/constants";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const colors = [
  "negative",
  "teal",
  "primary",
  "pink",
  "deep-orange",
  "light-green",
  "cyan",
  "red",
];
export default defineComponent({
  name: "PageIndex",
  setup() {
    const router = useRouter();
    const store = useStore();

    const menuClick = (menuItem) => {
      router.push(menuItem.routeLink);
    };

    let type = store.getters["user/getUserType"];
    const getMenu = () => {
      if (type === userType.admin) return adminMenu;
      if (type === userType.taxPayer) return companyMenu;
      if (type === userType.accountant) return finiancialadvisorMenu;
      return [];
    };
    return {
      colors,
      menuClick,
      getMenu,
    };
  },
});
</script>
