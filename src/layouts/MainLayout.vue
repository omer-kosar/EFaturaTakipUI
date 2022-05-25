<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> EFaturaTakip </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="q-mt-sm">
        <Menu v-for="link in menuList" :key="link.title" v-bind="link"></Menu>
        <q-item clickable @click="modClick">
          <q-item-section avatar>
            <q-icon :name="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{
              $q.dark.isActive ? "Aydınlık Mod" : "Karanlık Mod"
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="logOutClick">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Çıkış Yap</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import Menu from "components/Menu.vue";
import { defineComponent, ref } from "vue";
import { saveItemToStorage } from "src/util/local-storage";
const adminMenuList = [
  {
    title: "Kullanıcılar",
    icon: "person",
    link: "/userlist",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    Menu,
  },

  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const modClick = () => {
      $q.dark.toggle();
      saveItemToStorage("darkMode", $q.dark.isActive);
    };
    return {
      menuList: adminMenuList,
      leftDrawerOpen,
      modClick,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
