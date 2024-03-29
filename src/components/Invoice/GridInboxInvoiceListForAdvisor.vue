<template>
  <q-table
    :rows="inboxInvoiceList"
    :columns="columns"
    class="grid-height"
    wrap-cells="true"
    hide-pagination
    v-model:pagination="pagination"
    :loading="loading"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="invoiceNo" :props="props" class="text-center">
          <span class="text-weight-bold">{{ props.row.eFaturaNo }}</span>
          <br />
          <span class="text-weight-regular">
            {{ props.row.eFaturaId }}
          </span>
        </q-td>
        <q-td key="targetVknTckn" :props="props">
          <span class="text-weight-regular">{{ props.row.targetTcknVkn }}</span>
          <br />
          <span class="text-weight-bold">
            {{ props.row.targetTitle }}
          </span>
        </q-td>
        <q-td key="scenario" :props="props">
          <q-chip
            square
            text-color="white"
            :style="{ 'background-color': props.row.typeCodeRenk }"
          >
            {{ props.row.typeCodeF }}
          </q-chip>
          <q-chip square text-color="white" style="background-color: #90a4ae">
            {{ props.row.invoiceTipTypeCodeF }}
          </q-chip>
        </q-td>
        <q-td key="status" :props="props">
          <q-chip
            square
            text-color="white"
            :style="{ 'background-color': props.row.statusCodeRenk }"
          >
            {{ props.row.statusCodeF }}
          </q-chip>
        </q-td>
        <q-td key="date" :props="props">
          <span class="text-weight-bold">{{
            formatDate(props.row.executionDate)
          }}</span>
          <br />
          <span class="text-weight-regular">
            {{ formatDate(props.row.createDate) }}
          </span>
        </q-td>
        <q-td key="kdv" :props="props">
          <span>{{ props.row.partialTaxF }}</span>
          <br />
          <span>{{ props.row.totalTaxF }}</span>
        </q-td>
        <q-td key="total" :props="props">
          <span class="text-weight-regular">{{
            props.row.taxExclusiveAmountF
          }}</span>
          <br />
          <span class="text-weight-bold">
            <q-chip square text-color="white" color="positive">
              {{ props.row.payableAmountF }}
            </q-chip>
          </span>
        </q-td>
        <q-td key="actions">
          <q-btn
            icon="more_horiz"
            :dense="$q.screen.lt.md"
            :loading="props.row.loading"
            :disable="props.row.loading"
          >
            <q-menu>
              <q-list style="min-width: 120px">
                <q-item clickable v-close-popup @click="showInvoice(props.row)">
                  <q-item-section avatar>
                    <q-icon name="visibility"></q-icon>
                  </q-item-section>
                  <q-item-section>Göster</q-item-section>
                </q-item>
                <q-separator />
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
import { defineComponent, computed, ref } from "vue";
import { date } from "quasar";

const columns = [
  {
    name: "invoiceNo",
    required: true,
    label: "FAT. NO/FAT. ID",
    align: "left",
    field: (row) => row.eFaturaNo,
    sortable: true,
  },
  {
    name: "targetVknTckn",
    required: true,
    label: "GÖNDEREN VKN-TCKN/UNVAN",
    align: "left",
    sortable: true,
  },
  {
    name: "scenario",
    required: true,
    label: "SENARYO/TÜRÜ",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "DURUMU",
    align: "left",
    sortable: true,
  },
  {
    name: "date",
    required: true,
    label: "DÜZ. TARİHİ",
    align: "left",
    sortable: true,
  },
  {
    name: "kdv",
    required: true,
    label: "KDV",
    align: "left",
    sortable: true,
  },
  {
    name: "total",
    required: true,
    label: "GENEL TOPLAM",
    align: "left",
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
  props: ["inboxInvoiceList", "loading", "pagination", "filter"],

  setup(props, { emit }) {
    let inboxInvoiceList = computed(() => {
      return props.inboxInvoiceList;
    });
    const pagination = computed(() => props.pagination);
    const loading = computed(() => props.loading);
    const filter = computed(() => props.filter);
    const selected = ref([]);
    const formatDate = (val) => {
      return date.formatDate(val, "DD.MM.YYYY HH:mm:ss");
    };

    const showInvoice = (invoice) => {
      emit("show-invoice", invoice);
    };

    return {
      inboxInvoiceList,
      loading,
      columns,
      formatDate,
      pagination,
      filter,
      selected,
      showInvoice,
    };
  },
});
</script>
