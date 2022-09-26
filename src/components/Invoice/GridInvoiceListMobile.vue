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
          <q-card class="my-card">
            <q-card-section>
              <div class="row text-justify q-gutter-y-xs">
                <div class="col-xs-12 col-sm-6">
                  Cari:
                  <span class="text-weight-bold">
                    {{ props.row.customerName }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  Tarih:
                  <span class="text-weight-bold">
                    {{ props.row.date }}
                  </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Açıklama:
                  <span class="text-weight-bold">
                    {{ props.row.comment }}
                  </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Toplam:
                  <span class="text-weight-bold">
                    {{ moneyFormat(props.row.total) }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-12">
                  <q-btn
                    class="full-width"
                    icon="more_horiz"
                    :dense="$q.screen.lt.md"
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
                        <q-item
                          clickable
                          v-close-popup
                          @click="btnDetailClick(props.row)"
                        >
                          <q-item-section avatar>
                            <q-icon name="visibility"></q-icon>
                          </q-item-section>
                          <q-item-section>Detay</q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="btnDeleteClick(props.row)"
                        >
                          <q-item-section avatar>
                            <q-icon name="change_circle"></q-icon>
                          </q-item-section>
                          <q-item-section>E-Faturaya Dönüştür</q-item-section>
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
    const btnDeleteClick = (stock) => {
      emit("invoice-delete", stock);
    };
    const btnUpdateClick = (stock) => {
      emit("invoice-update", stock);
    };
    const btnDetailClick = (invoice) => {
      emit("show-invoice-items", invoice);
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
    };
  },
});
</script>
