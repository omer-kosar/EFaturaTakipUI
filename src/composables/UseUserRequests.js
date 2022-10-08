import { getList, userDelete } from "src/api/user.api";
import { success } from "src/util/notify";
import { ref } from "vue";
const userList = ref([]);

export default function useUserListRequests() {
  const loading = ref(false);
  const fetchAll = () => {
    loading.value = true;
    getList()
      .then((response) => {
        userList.value = response.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  const deleteUser = (userId) => {
    loading.value = true;
    userDelete(userId)
      .then((response) => {
        userList.value = userList.value.filter((user) => user.userId != userId);
        success(response.data);
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return { fetchAll, loading, userList, deleteUser };
}
