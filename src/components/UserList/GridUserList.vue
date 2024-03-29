<template>
  <q-table
    :rows="items"
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
                <div class="col-4 text-justify">
                  Parola:&nbsp;
                  <q-badge color="orange"> {{ props.row.password }}</q-badge>
                </div>
                <div class="col-4 text-justify">
                  Tip:&nbsp;
                  <q-badge color="orange">
                    {{ props.row.typeDescription }}</q-badge
                  >
                </div>
                <div class="col-4 text-justify" v-show="props.row.companyName">
                  Firma:&nbsp;
                  <q-badge color="info"> {{ props.row.companyName }}</q-badge>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script>
import { defineComponent } from "vue";
import { date } from "quasar";
import useUserRequests from "../../composables/UseUserRequests";
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
  setup(props, { emit }) {
    const { userList: items, loading, fetchAll } = useUserRequests();
    const btnDeleteClick = (user) => {
      emit("user-delete", user);
    };
    const btnUpdateClick = (user) => {
      emit("user-update", user);
    };
    const formatDate = (val) => {
      return date.formatDate(val, "DD.MM.YYYY");
    };
    fetchAll();
    return {
      items,
      loading,
      columns,
      btnDeleteClick,
      btnUpdateClick,
      formatDate,
    };
  },
});
</script>
