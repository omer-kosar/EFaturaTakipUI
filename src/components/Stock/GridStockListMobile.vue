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
          <b>{{ props.row.unit }}</b>
        </q-td>

        <q-td key="valueAddedTax" :props="props">
          <b>{{ props.row.unit }}</b>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { defineComponent } from "vue";

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
    name: "Birim",
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
];
export default defineComponent({
  props: ["loading", "stockList"],
  setup() {
    const stockList = computed(() => props.stockList);
    const loading = computed(() => props.loading);
    return {
      stockList,
      loading,
      columns,
    };
  },
});
</script>
