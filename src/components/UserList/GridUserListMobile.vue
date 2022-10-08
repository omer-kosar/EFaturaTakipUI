<template>
  <q-table
    :rows="items"
    :columns="columns"
    class="grid-height"
    :loading="loading"
    row-key="id"
    :wrap-cells="true"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="user" :props="props" class="text-center">
          <q-card class="my-card">
            <q-card-section>
              <div class="row text-justify q-gutter-y-xs">
                <div class="col-xs-12 col-sm-6">
                  Ad Soyad :
                  <span class="text-weight-bold">
                    {{ `${props.row.firstName} ${props.row.lastName}` }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  E-Posta :
                  <span class="text-weight-bold">
                    {{ props.row.email }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  Cep Tel. :
                  <span class="text-weight-bold">
                    {{ props.row.phone }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  Son Gir. Tar. :
                  <span class="text-weight-bold">
                    {{ formatDate(props.row.lastLoginDate) }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  Parola :
                  <span class="text-weight-bold">
                    {{ props.row.password }}
                  </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Tip :
                  <span class="text-weight-bold">
                    {{ props.row.typeDescription }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-6" v-show="props.row.companyName">
                  Firma :
                  <span class="text-weight-bold">
                    {{ props.row.companyName }}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <q-btn
                    class="full-width"
                    icon="more_horiz"
                    :dense="$q.screen.lt.md"
                    :loading="props.row.loading"
                    :disable="props.row.loading"
                  >
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
import { defineComponent } from "vue";
import { date } from "quasar";

import useUserRequests from "../../composables/UseUserRequests";

const columns = [
  {
    name: "user",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },
];
export default defineComponent({
  setup(props, { emit }) {
    const { userList: items, loading, fetchAll } = useUserRequests();
    const formatDate = (val) => {
      return date.formatDate(val, "DD.MM.YYYY");
    };
    const btnDeleteClick = (user) => {
      emit("user-delete", user);
    };
    const btnUpdateClick = (user) => {
      emit("user-update", user);
    };
    fetchAll();
    return {
      items,
      loading,
      columns,
      formatDate,
      btnUpdateClick,
      btnDeleteClick,
    };
  },
});
</script>
