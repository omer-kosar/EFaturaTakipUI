<template>
  <q-table
    :rows="invoiceItemList"
    :columns="columns"
    :wrap-cells="true"
    :loading="loading"
    :rows-per-page-options="[2, 5, 10]"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="stockName" :props="props">
          <q-card>
            <q-card-section>
              <div class="row text-justify q-gutter-y-xs">
                <div class="col-xs-12 col-sm-6">
                  Ürün Hizmet:
                  <span class="text-weight-bold">
                    {{ props.row.stockName }}
                  </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Miktar:
                  {{ props.row.quantity }}
                </div>

                <div class="col-xs-12 col-sm-6">
                  Satış Br. Fiyat:
                  {{ moneyFormat(props.row.price) }}
                </div>

                <div class="col-xs-12 col-sm-6">
                  KDV'li Satış Br. Fiyat:
                  {{ moneyFormat(props.row.priceWithTax) }}
                </div>

                <div class="col-xs-12 col-sm-6">KDV: %{{ props.row.tax }}</div>

                <div class="col-xs-12 col-sm-6">
                  Toplam Fiyat: {{ moneyFormat(props.row.totalPrice) }}
                </div>

                <div class="col-xs-12 col-sm-6">
                  KDV'li Toplam Fiyat:<span class="text-weight-bold">{{
                    moneyFormat(props.row.totalPriceWithTax)
                  }}</span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  Açıklama: {{ props.row.comment }}
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
