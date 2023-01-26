<template>
  <q-table
    :rows="invoiceList"
    :columns="columns"
    :wrap-cells="true"
    :loading="loading"
    class="grid-height"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="customerName" :props="props">
          <b>{{ props.row.customerName }}</b>
        </q-td>

        <q-td key="date" :props="props">
          {{ format(props.row.date) }}
        </q-td>
        <q-td key="comment">
          {{ props.row.comment }}
        </q-td>
        <q-td key="total">
          {{ moneyFormat(props.row.total) }}
        </q-td>
        <q-td key="actions">
          <q-btn icon="more_horiz" :dense="$q.screen.lt.md">
            <q-menu>
              <q-list style="min-width: 120px">
                <q-item
                  clickable
                  v-close-popup
                  @click="btnUpdateClick(props.row)"
                  v-if="!props.row.isConverted"
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
                  v-if="!props.row.isConverted"
                >
                  <q-item-section avatar>
                    <q-icon name="delete"></q-icon>
                  </q-item-section>
                  <q-item-section>Sil</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="btnDetailClick(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="info"></q-icon>
                  </q-item-section>
                  <q-item-section>Detay</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="btnConvertClick(props.row)"
                  v-if="!props.row.isConverted"
                >
                  <q-item-section avatar>
                    <q-icon name="change_circle"></q-icon>
                  </q-item-section>
                  <q-item-section>E-Faturaya Dönüştür</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="btnShowClick(props.row)"
                  v-if="props.row.isConverted"
                >
                  <q-item-section avatar>
                    <q-icon name="visibility"></q-icon>
                  </q-item-section>
                  <q-item-section>Göster</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
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
import { defineComponent, computed } from "vue";
import { date } from "quasar";
const columns = [
  {
    name: "customerName",
    required: true,
    label: "Cari",
    align: "left",
    field: (row) => row.customerName,
    sortable: true,
  },
  {
    name: "date",
    required: true,
    label: "Tarih",
    align: "left",
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: "comment",
    required: true,
    label: "Açıklama",
    align: "left",
    field: (row) => row.comment,
    sortable: true,
  },
  {
    name: "total",
    required: true,
    label: "Toplam",
    align: "left",
    field: (row) => row.totalPrice,
    sortable: true,
  },
  {
    name: "actions",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },
];
export default defineComponent({
  props: ["invoiceList", "loading"],

  setup(props, { emit }) {
    const invoiceList = computed(() => props.invoiceList);
    const loading = computed(() => props.loading);
    const format = (value) => {
      return date.formatDate(value, "DD.MM.YYYY");
    };
    const moneyFormat = (value) => {
      return formatMoney(value);
    };
    const btnDeleteClick = (invoice) => {
      emit("invoice-delete", invoice);
    };
    const btnUpdateClick = (invoice) => {
      emit("invoice-update", invoice);
    };
    const btnDetailClick = (invoice) => {
      emit("show-invoice-items", invoice);
    };
    const btnShowClick = (invoice) => {
      emit("show-invoice", invoice);
    };
    const btnConvertClick = (invoice) => {
      emit("convert-einvoice", invoice);
    };

    return {
      invoiceList,
      loading,
      columns,
      format,
      moneyFormat,
      btnDeleteClick,
      btnUpdateClick,
      btnDetailClick,
      btnShowClick,
      btnConvertClick,
    };
  },
});
</script>
