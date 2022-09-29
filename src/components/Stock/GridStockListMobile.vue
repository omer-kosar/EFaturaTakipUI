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
          <q-card>
            <q-card-section>
              <div class="row text-justify q-gutter-y-xs">
                <div class="col-xs-12 col-sm-6">
                  Adı:
                  <span class="text-weight-bold">
                    {{ props.row.name }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  Fiyat:
                  {{ moneyFormat(props.row.price) }}
                </div>

                <div class="col-xs-12 col-sm-6">
                  Birim:
                  {{ props.row.unitDescription }}
                </div>
                <div class="col-xs-12 col-sm-6">
                  KDV: % {{ props.row.valueAddedTax }}
                </div>
                <div class="col-xs-12 col-sm-6">
                  KDV'li Fiyat:
                  <span class="text-weight-bold">
                    {{
                      countPriceWithTax(
                        props.row.price,
                        props.row.valueAddedTax
                      )
                    }}
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
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card></q-td
        >
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { formatMoney } from "src/util/helper-methods";
import { defineComponent, computed } from "vue";

const columns = [
  {
    name: "stockName",
    required: true,
    label: "Stok",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
];
export default defineComponent({
  props: ["loading", "stockList"],
  setup(props, { emit }) {
    const stockList = computed(() => props.stockList);
    const loading = computed(() => props.loading);
    const moneyFormat = (value) => {
      return formatMoney(value);
    };
    const btnDeleteClick = (stock) => {
      emit("stock-delete", stock);
    };
    const btnUpdateClick = (stock) => {
      emit("stock-update", stock);
    };
    const countPriceWithTax = (price, tax) => {
      let priceWithTax = price * (1 + tax / 100);
      return formatMoney(priceWithTax);
    };
    return {
      stockList,
      loading,
      columns,
      moneyFormat,
      btnDeleteClick,
      btnUpdateClick,
      countPriceWithTax,
    };
  },
});
</script>
