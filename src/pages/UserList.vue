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
        :userList="userList"
        :loading="loading"
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
import { getList, userDelete } from "src/api/user.api";
import { useRouter } from "vue-router";
import DialogDeleteWarning from "src/components/Common/DialogDeleteWarning.vue";
import { success } from "src/util/notify";

export default defineComponent({
  components: {
    GridUserList,
    GridUserListMobile,
    DialogDeleteWarning,
  },
  setup() {
    const router = useRouter();

    let userList = ref([]);
    let loading = ref(false);
    let dialogUserFormState = ref(false);
    const selectedUser = ref({});
    let deleteWarningState = ref(false);

    const btnNewUserClick = () => {
      router.push({ name: "save-user" });
    };
    const getUserList = () => {
      loading.value = true;
      getList()
        .then((response) => {
          userList.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const updateUser = (user) => {
      router.push({ name: "save-user", params: { id: user.userId } });
    };
    const openDeleteWarning = (user) => {
      selectedUser.value = user;
      deleteWarningState.value = true;
    };
    const deleteUser = () => {
      userDelete(selectedUser.value.userId)
        .then((response) => {
          deleteWarningState.value = false;
          userList.value = userList.value.filter(
            (user) => user.userId != selectedUser.value.userId
          );
          success(response.data);
        })
        .finally(() => {
          deleteWarningState.value = false;
        });
    };
    getUserList();
    return {
      userList,
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
  height: calc(100vh - 150px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 450px)
  @media (max-width:360px)
        height: calc(100vh - 470px)
</style>
