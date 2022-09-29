<template>
  <q-dialog v-model="dialogState" full-width>
    <q-card>
      <q-bar class="bg-primary text-white full-width">
        <di> Fatura Detayları</di>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <component
          :is="
            $q.screen.lt.sm
              ? 'GridInvoiceItemListMobile'
              : 'GridInvoiceItemList'
          "
          :invoiceItemList="invoiceItemList"
          :loading="loading"
        />
      </q-card-section>
      <q-card-section class="q-gutter-y-xs">
        <div class="row justify-end">
          <div class="col-xs-6 col-md-3">
            <q-separator></q-separator>
            ARA TOPLAM
          </div>
          <div class="col-xs-6 col-md-3">
            <q-separator></q-separator>
            {{ totalPriceWithoutTax }}
          </div>
        </div>
        <div class="row justify-end">
          <div class="col-xs-6 col-md-3">
            <q-separator></q-separator>
            TOPLAM KDV
          </div>
          <div class="col-xs-6 col-md-3">
            <q-separator></q-separator>
            {{ totalTax }}
          </div>
        </div>

        <div class="row text-weight-bold justify-end">
          <div class="col-xs-6 col-md-3">
            <q-separator></q-separator>
            GENEL TOPLAM
          </div>
          <div class="col-xs-6 col-md-3">
            <q-separator></q-separator>
            {{ totalPrice }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { convertDecimal, formatMoney } from "src/util/helper-methods";
import { defineComponent, computed, ref } from "vue";
import GridInvoiceItemList from "./GridInvoiceItemList.vue";
import GridInvoiceItemListMobile from "./GridInvoiceItemListMobile.vue";
export default defineComponent({
  props: ["dialogState", "invoiceItemList", "loading"],
  components: { GridInvoiceItemList, GridInvoiceItemListMobile },
  setup(props, { emit }) {
    let dialogState = computed({
      get: () => {
        return props.dialogState;
      },
      set: () => {
        emit("dialog-invoice-item-list-close");
      },
    });
    let invoiceItemList = computed(() => props.invoiceItemList);
    let loading = computed(() => props.loading);
    const totalPriceWithoutTax = computed(() => {
      const summary = invoiceItemList.value.reduce((total, invoiceItem) => {
        return total + invoiceItem.price * invoiceItem.quantity;
      }, 0);
      return formatMoney(summary);
    });

    const totalPrice = computed(() => {
      const summary = invoiceItemList.value.reduce((total, invoiceItem) => {
        return total + invoiceItem.totalPriceWithTax;
      }, 0);
      return formatMoney(summary);
    });
    const totalTax = computed(() => {
      let price = convertDecimal(totalPrice.value.replace("₺", ""));
      let priceWithoutTax = convertDecimal(
        totalPriceWithoutTax.value.replace("₺", "")
      );
      return formatMoney(price - priceWithoutTax);
    });
    return {
      dialogState,
      invoiceItemList,
      loading,
      totalPriceWithoutTax,
      totalPrice,
      totalTax,
    };
  },
});
</script>
