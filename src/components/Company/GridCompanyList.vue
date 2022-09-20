<template>
  <q-table
    :rows="companyList"
    :columns="columns"
    row-key="name"
    :wrap-cells="true"
    :loading="loading"
    class="grid-height"
    v-model:pagination="pagination"
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
        <q-td key="title" :props="props">
          <b>{{ getTitle(props.row) }}</b>
        </q-td>

        <q-td key="taxOffice" :props="props">
          <b>{{ props.row.taxOffice }}</b>
        </q-td>

        <q-td key="mobilePhone" :props="props">
          <b>{{ props.row.mobilePhone }}</b>
        </q-td>

        <q-td key="faxNumber" :props="props">
          <b>{{ props.row.faxNumber }}</b>
        </q-td>

        <q-td key="eMailAdress" :props="props">
          <b>{{ props.row.eMailAdress }}</b>
        </q-td>
        <q-td key="type" :props="props">
          <b>{{ props.row.typeDescription }} </b>
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
                  <q-badge color="orange"
                    >T.C. Kimlik No: {{ props.row.tcKimlikNo }}</q-badge
                  >
                </div>

                <div class="col-4 text-justify">
                  <q-badge color="orange"
                    >Vergi No: {{ props.row.vergiNo }}</q-badge
                  >
                </div>
              </div>
              <q-separator />
              <div class="row">
                <div class="col-4 text-justify">
                  <q-badge color="blue"
                    >İl/İlçe: {{ props.row.province }} /
                    {{ props.row.district }}</q-badge
                  >
                </div>
                <div class="col-4 text-justify">
                  <q-badge color="blue"
                    >Bina/Daire No: {{ props.row.apartmentNumber }} /
                    {{ props.row.flatNumber }}</q-badge
                  >
                </div>

                <div class="col-4 text-justify">
                  <q-badge color="blue"> Ülke:{{ props.row.country }}</q-badge>
                </div>
              </div>
              <q-separator />
              <div class="row">
                <div class="col-12 text-justify">
                  Açık adres: {{ props.row.adress }}
                </div>
              </div>
              <q-separator />
              <div class="row">
                <div class="col-3 text-justify">
                  Mersis No: {{ props.row.centralRegistrationNumber }}
                </div>

                <div class="col-3 text-justify">
                  Ticari Sicil No: {{ props.row.commercialRegistrationNumber }}
                </div>
                <div class="col-3 text-justify">
                  Servis Kullanıcı Adı: {{ props.row.serviceUserName }}
                </div>

                <div class="col-3 text-justify">
                  Servis Kullanıcı Parolası: {{ props.row.servicePassword }}
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
import { CompanyType } from "src/util/constants";
import { defineComponent, computed, ref } from "vue";

const columns = [
  {
    name: "",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },
  {
    name: "title",
    required: true,
    label: "Ad Soyad/Unvan",
    align: "left",
    sortable: true,
  },
  {
    name: "taxOffice",
    required: true,
    label: "Vergi Dairesi",
    align: "left",
    field: (row) => row.taxOffice,
    sortable: true,
  },

  {
    name: "mobilePhone",
    required: true,
    label: "Cep Tel.",
    align: "left",
    field: (row) => row.mobilePhone,
    sortable: true,
  },

  {
    name: "faxNumber",
    required: true,
    label: "Fax Tel.",
    align: "left",
    field: (row) => row.faxNumber,
    sortable: true,
  },

  {
    name: "eMailAdress",
    required: true,
    label: "EPosta",
    align: "left",
    field: (row) => row.eMailAdress,
    sortable: true,
  },

  {
    name: "type",
    required: true,
    label: "Tip",
    align: "left",
    field: (row) => row.type,
    sortable: true,
  },
  {
    name: "buttons",
    label: "",
    align: "left",
  },
];
export default defineComponent({
  props: ["loading", "companyList", "pagination"],

  setup(props, { emit }) {
    const companyList = computed(() => props.companyList);
    const loading = computed(() => props.loading);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });
    const btnDeleteClick = (company) => {
      emit("company-delete", company);
    };
    const btnUpdateClick = (company) => {
      console.warn();
      emit("company-update", company);
    };
    const getTitle = (row) => {
      return row.type === CompanyType.Corporate
        ? row.title
        : `${row.firstName} ${row.lastName}`;
    };
    return {
      companyList,
      loading,
      columns,
      btnDeleteClick,
      btnUpdateClick,
      getTitle,
      pagination,
    };
  },
});
</script>
