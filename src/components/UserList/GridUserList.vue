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
        <q-td auto-width>
          <q-btn
            size="sm"
            color="accent"
            round
            dense
            @click="props.row.expand = !props.row.expand"
            :icon="props.row.expand ? 'remove' : 'add'"
          />
        </q-td>
        <q-td key="firstName" :props="props">
          <b>{{ props.row.firstName }}</b>
        </q-td>
        <q-td key="lastName" :props="props">
          <b>{{ props.row.lastName }}</b>
        </q-td>

        <q-td key="email" :props="props">
          <b>{{ props.row.email }}</b>
        </q-td>

        <q-td key="phone" :props="props">
          <b>{{ props.row.phone }}</b>
        </q-td>

        <q-td key="lastLoginDate" :props="props">
          <b>{{ formatDate(props.row.lastLoginDate) }}</b>
        </q-td>
        <q-td key="buttons" :props="props">
          <q-btn icon="more_horiz" :dense="$q.screen.lt.md">
            <q-menu>
              <q-list style="min-width: 120px">
                <q-item
                  clickable
                  v-close-popup
                  @click="btnUpdateClick(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="edit"></q-icon>
                  </q-item-section>
                  <q-item-section>Güncelle</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  v-close-popup
                  @click="btnDeleteClick(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="delete"></q-icon>
                  </q-item-section>
                  <q-item-section>Sil</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </q-tr>
      <q-tr v-show="props.row.expand" :props="props">
        <q-td colspan="100%">
          <q-card
            class="col q-mt-sm"
            :class="{ 'bg-grey-9 ': props.row.expand && $q.dark.isActive }"
          >
            <q-card-section
              v-show="props.row.expand"
              :props="props"
              class="q-gutter-y-sm"
            >
              <div class="row">
                <div class="col-6 text-justify">
                  <q-badge color="orange"
                    >Parola: {{ props.row.password }}</q-badge
                  >
                </div>
                <div class="col-6 text-justify">
                  <q-badge color="orange">
                    Roller:{{ roleFormat(props.row.roles) }}</q-badge
                  >
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, computed } from "vue";
import { date } from "quasar";

const columns = [
  {
    name: "",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },
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

  {
    name: "email",
    required: true,
    label: "E-Posta",
    align: "left",
    field: (row) => row.lastName,
    sortable: true,
  },

  {
    name: "phone",
    required: true,
    label: "Cep Tel.",
    align: "left",
    field: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "lastLoginDate",
    required: true,
    label: "Son Gir. Tar.",
    align: "left",
    field: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "buttons",
    label: "",
    align: "left",
  },
];
export default defineComponent({
  props: ["loading", "userList"],
  setup(props, { emit }) {
    const userList = computed(() => props.userList);
    const loading = computed(() => props.loading);
    const roleFormat = (roles) => {
      console.warn("roller===", roles);
      return roles.join(",");
    };
    const btnDeleteClick = (stock) => {
      emit("user-delete", stock);
    };
    const btnUpdateClick = (stock) => {
      console.warn();
      emit("user-update", stock);
    };
    const formatDate = (val) => {
      console.warn(val);
      return date.formatDate(val, "DD.MM.YYYY");
    };
    return {
      userList,
      loading,
      columns,
      roleFormat,
      btnDeleteClick,
      btnUpdateClick,
      formatDate,
    };
  },
});
</script>
