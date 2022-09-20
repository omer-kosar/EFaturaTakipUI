<template>
  <q-table :rows="inboxInvoiceList" :columns="columns">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="invoiceNo" :props="props">
          <b>{{ props.row }}</b>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>
<script>
import { defineComponent, computed } from "vue";
const columns = [
  {
    name: "invoiceNo",
    required: true,
    label: "FAT. NO/FAT. ID",
    align: "left",
    sortable: true,
  },
];
export default defineComponent({
  props: ["inboxInvoiceList", "loading"],

  setup(props) {
    const inboxInvoiceList = computed(() => props.inboxInvoiceList);
    const loading = computed(() => props.loading);

    return {
      inboxInvoiceList,
      loading,
      columns,
    };
  },
});
</script>
