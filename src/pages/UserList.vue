import { getList } from "src/api/user.api"; import { getList } from
"src/api/user.api";
<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-pb-sm justify-end">
        <q-btn icon="add" color="green" @click="btnNewUserClick"
          >Yeni Kullanıcı Kaydet</q-btn
        >
      </div>
      <component
        :is="$q.screen.lt.sm ? 'GridUserListMobile' : 'GridUserList'"
        @user-delete="openDeleteWarning"
        @user-update="updateUser"
      />
    </div>
    <dialog-delete-warning
      :dialogState="deleteWarningState"
      @dialog-delete-warning-close="deleteWarningState = false"
      @dialog-delete-click="deleteUser"
    >
      <template v-slot:title>Kullanıcı Sil</template>
      <template v-slot:content>
        <div class="text-subtitle2">
          Seçili kullanıcı silinecek. Devam etmek istiyor musunuz?
        </div>
      </template>
    </dialog-delete-warning>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import GridUserList from "src/components/UserList/GridUserList.vue";
import GridUserListMobile from "src/components/UserList/GridUserListMobile.vue";
import { userDelete } from "src/api/user.api";
import { useRouter } from "vue-router";
import DialogDeleteWarning from "src/components/Common/DialogDeleteWarning.vue";
import useUserRequests from "../composables/UseUserRequests";
export default defineComponent({
  components: {
    GridUserList,
    GridUserListMobile,
    DialogDeleteWarning,
  },
  setup() {
    const router = useRouter();

    let dialogUserFormState = ref(false);
    const selectedUser = ref({});
    let deleteWarningState = ref(false);
    const { deleteUser: removeUser } = useUserRequests();
    const btnNewUserClick = () => {
      router.push({ name: "save-user" });
    };

    const updateUser = (user) => {
      router.push({ name: "save-user", params: { id: user.userId } });
    };
    const openDeleteWarning = (user) => {
      selectedUser.value = user;
      deleteWarningState.value = true;
    };
    const deleteUser = () => {
      deleteWarningState.value = false;
      removeUser(selectedUser.value.userId);
    };

    return {
      dialogUserFormState,
      btnNewUserClick,
      updateUser,
      deleteUser,
      openDeleteWarning,
      deleteWarningState,
    };
  },
});
</script>
<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 140px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 185px)
  @media (max-width:360px)
        height: calc(100vh - 135px)
</style>
