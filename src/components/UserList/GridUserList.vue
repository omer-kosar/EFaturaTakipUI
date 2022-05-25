<template>
  <q-table
    :rows="userList"
    :columns="columns"
    row-key="name"
    wrap-cells="true"
    :loading="loading"
    class="grid-height"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="firstName" :props="props">
          <b>{{ props.row.firstName }}</b>
        </q-td>
        <q-td key="lastName" :props="props">
          <b>{{ props.row.lastName }}</b>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, computed } from "vue";

const columns = [
  {
    name: "firstName",
    required: true,
    label: "Ad",
    align: "left",
    field: (row) => row.firstName,
    sortable: true,
  },

  {
    name: "lastName",
    required: true,
    label: "Soyad",
    align: "left",
    field: (row) => row.lastName,
    sortable: true,
  },
];
export default defineComponent({
  props: ["loading", "userList"],
  setup(props) {
    const userList = computed(() => props.userList);
    const loading = computed(() => props.loading);
    return {
      userList,
      loading,
      columns,
    };
  },
});
</script>
