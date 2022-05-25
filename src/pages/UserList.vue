<template>
  <q-page>
    <div class="q-pa-md">
      <div class="column items-end q-mb-sm">
        <div class="col">
          <q-btn icon="add" outline dense @click="btnNewUserClick"
            >Yeni Kullanıcı</q-btn
          >
        </div>
      </div>
      <component
        :is="$q.screen.lt.sm ? 'GridUserListMobile' : 'GridUserList'"
        :userList="userList"
        :loading="loading"
      />
    </div>
    <dialog-user-form
      :dialogUserForm="dialogUserFormState"
      @dialog-user-form-close="dialogUserFormState = false"
    ></dialog-user-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import GridUserList from "src/components/UserList/GridUserList.vue";
import GridUserListMobile from "src/components/UserList/GridUserListMobile.vue";
import DialogUserForm from "src/components/UserList/DialogUserForm.vue";
export default defineComponent({
  components: {
    GridUserList,
    GridUserListMobile,
    DialogUserForm,
  },
  setup() {
    let userList = ref([
      { firstName: "teset", lastName: "test" },
      { firstName: "teset", lastName: "test" },
      { firstName: "teset", lastName: "test" },
      { firstName: "teset", lastName: "test" },
      { firstName: "teset", lastName: "test" },
      { firstName: "teset", lastName: "test" },
      { firstName: "teset", lastName: "test" },
    ]);
    let dialogUserFormState = ref(false);
    const btnNewUserClick = () => {
      dialogUserFormState.value = true;
    };
    return { userList, dialogUserFormState, btnNewUserClick };
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
