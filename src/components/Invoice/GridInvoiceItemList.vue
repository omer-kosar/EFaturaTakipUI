<template>
  <q-table
    :rows="invoiceItemList"
    :columns="columns"
    :wrap-cells="true"
    :loading="loading"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="stockName" :props="props">
          <b>{{ props.row.stockName }}</b>
        </q-td>

        <q-td key="quantity" :props="props">
          {{ props.row.quantity }}
        </q-td>

        <q-td key="price" :props="props">
          {{ moneyFormat(props.row.price) }}
        </q-td>

        <q-td key="priceWithTax" :props="props">
          {{ moneyFormat(props.row.priceWithTax) }}
        </q-td>

        <q-td key="tax" :props="props"> %{{ props.row.tax }} </q-td>

        <q-td key="totalPrice" :props="props">
          {{ moneyFormat(props.row.totalPrice) }}
        </q-td>

        <q-td key="totalPriceWithTax" :props="props">
          {{ moneyFormat(props.row.totalPriceWithTax) }}
        </q-td>

        <q-td key="comment" :props="props">
          {{ props.row.comment }}
        </q-td>
      </q-tr>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script>
import { formatMoney } from "src/util/helper-methods";
import { computed, defineComponent } from "vue";
const columns = [
  {
    name: "stockName",
    required: true,
    label: "Ürün/Hizmet",
    align: "left",
    field: (row) => row.stockName,
    sortable: false,
  },
  {
    name: "quantity",
    required: true,
    label: "Miktar",
    align: "left",
    field: (row) => row.quantity,
    sortable: false,
  },
  {
    name: "price",
    required: true,
    label: "Satış Br. Fiyat",
    align: "left",
    field: (row) => row.price,
    sortable: false,
  },
  {
    name: "priceWithTax",
    required: true,
    label: "KDV'li Satış Br. Fiyat",
    align: "left",
    field: (row) => row.priceWithTax,
    sortable: false,
  },

  {
    name: "tax",
    required: true,
    label: "KDV",
    align: "left",
    field: (row) => row.tax,
    sortable: false,
  },

  {
    name: "totalPrice",
    required: true,
    label: "Toplam Fiyat",
    align: "left",
    field: (row) => row.totalPrice,
    sortable: false,
  },

  {
    name: "totalPriceWithTax",
    required: true,
    label: "KDV'li Toplam Fiyat",
    align: "left",
    field: (row) => row.totalPriceWithTax,
    sortable: false,
  },
  {
    name: "comment",
    required: true,
    label: "Açıklama",
    align: "left",
    field: (row) => row.comment,
    sortable: false,
  },
];
export default defineComponent({
  props: ["invoiceItemList", "loading"],

  setup(props) {
    const invoiceItemList = computed(() => props.invoiceItemList);
    const loading = computed(() => props.loading);
    const moneyFormat = (value) => {
      return formatMoney(value);
    };
    return { columns, invoiceItemList, loading, moneyFormat };
  },
});
</script>
