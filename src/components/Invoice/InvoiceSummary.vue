<template>
  <q-card-section class="q-gutter-y-xs">
    <div class="row justify-end">
      <div class="col-xs-6 col-md-3">
        <q-separator></q-separator>
        ARA TOPLAM
      </div>
      <div class="col-xs-6 col-md-3">
        <q-separator></q-separator>
        {{ totalPriceWithoutTaxFormatted }}
      </div>
    </div>
    <div class="row justify-end">
      <div class="col-xs-6 col-md-3">
        <q-separator></q-separator>
        TOPLAM KDV
      </div>
      <div class="col-xs-6 col-md-3">
        <q-separator></q-separator>
        {{ totalTaxFormatted }}
      </div>
    </div>

    <div class="row text-weight-bold justify-end">
      <div class="col-xs-6 col-md-3">
        <q-separator></q-separator>
        GENEL TOPLAM
      </div>
      <div class="col-xs-6 col-md-3">
        <q-separator></q-separator>
        {{ totalPriceFormatted }}
      </div>
    </div>
  </q-card-section>
</template>

<script>
import { formatMoney } from "src/util/helper-methods";
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: ["totalPriceWithoutTax", "totalTax", "totalPrice"],
  setup(props) {
    let totalPriceWithoutTaxFormatted = computed(() => {
      return formatMoney(props.totalPriceWithoutTax);
    });
    let totalTaxFormatted = computed(() => {
      return formatMoney(props.totalTax);
    });
    let totalPriceFormatted = computed(() => {
      return formatMoney(props.totalPrice);
    });

    return {
      totalPriceWithoutTaxFormatted,
      totalTaxFormatted,
      totalPriceFormatted,
    };
  },
});
</script>
