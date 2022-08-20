<template>
  <q-page>
    <div class="row">
      <div
        v-for="(menuItem, index) in menu"
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
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
const menu = [
  {
    title: "Gelen Faturalar",
    icon: "receipt_long",
    routeLink: "/inboxinvoicelist",
  },
  {
    title: "Kullanıcı Kaydet",
    icon: "person_add",
    routeLink: "/saveuser",
  },
  {
    title: "Kullanıcı Listesi",
    icon: "view_list",
    routeLink: "/userlist",
  },
  {
    title: "Firma Kaydet",
    icon: "add_business",
    routeLink: "savecompany",
  },
  {
    title: "Firma Listesi",
    icon: "view_list",
    routeLink: "companylist",
  },
  {
    title: "Stok Kaydet",
    icon: "local_grocery_store",
    routeLink: "savestock",
  },
  {
    title: "Stok Listesi",
    icon: "view_list",
    routeLink: "stocklist",
  },
];
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
    const menuClick = (menuItem) => {
      router.push(menuItem.routeLink);
    };

    return {
      menu,
      colors,
      menuClick,
    };
  },
});
</script>
