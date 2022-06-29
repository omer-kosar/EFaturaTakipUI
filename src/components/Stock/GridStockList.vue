<template>
  <q-table
    :rows="stockList"
    :columns="columns"
    row-key="name"
    wrap-cells="true"
    :loading="loading"
    class="grid-height"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="stockName" :props="props">
          <b>{{ props.row.name }}</b>
        </q-td>

        <q-td key="price" :props="props">
          <b>{{ props.row.price }}</b>
        </q-td>

        <q-td key="unit" :props="props">
          <b>{{ props.row.unitDescription }}</b>
        </q-td>

        <q-td key="valueAddedTax" :props="props">
          <b>{{ props.row.valueAddedTax }}</b>
        </q-td>

        <q-td key="buttons" :props="props">
          <q-btn color="red" class="q-mr-sm" @click="btnDeleteClick(props.row)"
            >Sil</q-btn
          >
          <q-btn color="info" @click="btnUpdateClick(props.row)"
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
    name: "stockName",
    required: true,
    label: "Ad",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },

  {
    name: "price",
    required: true,
    label: "Fiyat",
    align: "left",
    field: (row) => row.price,
    sortable: true,
  },

  {
    name: "unit",
    required: true,
    label: "Birim",
    align: "left",
    field: (row) => row.unit,
    sortable: true,
  },

  {
    name: "valueAddedTax",
    required: true,
    label: "KDV",
    align: "left",
    field: (row) => row.valueAddedTax,
    sortable: true,
  },
  {
    name: "buttons",
    label: "",
    align: "left",
  },
];
export default defineComponent({
  props: ["loading", "stockList"],
  setup(props, { emit }) {
    const stockList = computed(() => props.stockList);
    const loading = computed(() => props.loading);
    const btnDeleteClick = (stock) => {
      emit("stock-delete", stock);
    };
    const btnUpdateClick = (stock) => {
      console.warn();
      emit("stock-update", stock);
    };
    return {
      stockList,
      loading,
      columns,
      btnDeleteClick,
      btnUpdateClick,
    };
  },
});
</script>
