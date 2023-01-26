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
      <invoice-summary
        :totalTax="totalTax"
        :totalPrice="totalPrice"
        :totalPriceWithoutTax="totalPriceWithoutTax"
      ></invoice-summary>
    </q-card>
  </q-dialog>
</template>
<script>
import { formatMoney } from "src/util/helper-methods";
import { defineComponent, computed, ref } from "vue";
import GridInvoiceItemList from "./GridInvoiceItemList.vue";
import GridInvoiceItemListMobile from "./GridInvoiceItemListMobile.vue";
import InvoiceSummary from "./InvoiceSummary.vue";
export default defineComponent({
  props: ["dialogState", "invoiceItemList", "loading"],
  components: {
    GridInvoiceItemList,
    GridInvoiceItemListMobile,
    InvoiceSummary,
  },
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
      return summary;
    });

    const totalPrice = computed(() => {
      const summary = invoiceItemList.value.reduce((total, invoiceItem) => {
        return total + invoiceItem.totalPriceWithTax;
      }, 0);
      return summary;
    });

    const totalTax = computed(() => {
      return totalPrice.value - totalPriceWithoutTax.value;
    });

    return {
      dialogState,
      invoiceItemList,
      loading,
      totalTax,
      totalPrice,
      totalPriceWithoutTax,
    };
  },
});
</script>
