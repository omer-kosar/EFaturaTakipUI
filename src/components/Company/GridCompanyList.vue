<template>
  <q-table
    :rows="companyList"
    :columns="columns"
    row-key="name"
    wrap-cells="true"
    :loading="loading"
    class="grid-height"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="title" :props="props">
          <b>{{ props.row.title }}</b>
        </q-td>

        <q-td key="tcknVkn" :props="props">
          <b>{{ props.row.tcknVkn }}</b>
        </q-td>

        <q-td key="taxOffice" :props="props">
          <b>{{ props.row.taxOffice }}</b>
        </q-td>

        <q-td key="adress" :props="props">
          <b>{{ props.row.adress }}</b>
        </q-td>

        <q-td key="provinceDistrict" :props="props">
          <b>{{ props.row.province }} / {{ props.row.district }}</b>
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

        <q-td key="country" :props="props">
          <b>{{ props.row.country }}</b>
        </q-td>
        <q-td key="apartmentNumberFlatNumber" :props="props">
          <b>{{ props.row.apartmentNumber }} / {{ props.row.flatNumber }}</b>
        </q-td>

        <q-td key="type" :props="props">
          <b>{{ props.row.typeDescription }} </b>
        </q-td>
        <q-td key="buttons" :props="props">
          <q-btn
            color="red"
            class="q-mr-sm full-width"
            @click="btnDeleteClick(props.row)"
            >Sil</q-btn
          >
          <q-btn
            color="info"
            @click="btnUpdateClick(props.row)"
            class="full-width"
            >Güncelle</q-btn
          >
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { defineComponent, computed } from "vue";
const columns = [
  {
    name: "title",
    required: true,
    label: "Ad Soyad/Unvan",
    align: "left",
    field: (row) => row.title,
    sortable: true,
  },

  {
    name: "tcknVkn",
    required: true,
    label: "TCKN/VKN",
    align: "left",
    field: (row) => row.tcknVkn,
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
    name: "adress",
    required: true,
    label: "Adres",
    align: "left",
    field: (row) => row.adress,
    sortable: true,
  },

  {
    name: "provinceDistrict",
    required: true,
    label: "İl/İlçe",
    align: "left",
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
    name: "country",
    required: true,
    label: "Ülke",
    align: "left",
    field: (row) => row.country,
    sortable: true,
  },

  {
    name: "apartmentNumberFlatNumber",
    required: true,
    label: "Bina/Daire No",
    align: "left",
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
  props: ["loading", "companyList"],

  setup(props, { emit }) {
    const companyList = computed(() => props.companyList);
    const loading = computed(() => props.loading);
    const btnDeleteClick = (company) => {
      emit("company-delete", company);
    };
    const btnUpdateClick = (company) => {
      console.warn();
      emit("company-update", company);
    };
    return {
      companyList,
      loading,
      columns,
      btnDeleteClick,
      btnUpdateClick,
    };
  },
});
</script>
