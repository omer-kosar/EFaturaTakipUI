<template>
  <q-dialog v-model="dialogState" full-width>
    <q-card>
      <q-bar class="bg-primary text-white full-width">
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row">
          <div class="col-sm-6 col-xs-12 q-pa-xs">
            <q-btn class="full-width" color="red" @click="invoiceListClick"
              >Fatura Listesi</q-btn
            >
          </div>

          <div class="col-sm-6 col-xs-12 q-pa-xs">
            <q-btn
              class="full-width"
              color="orange"
              @click="convertInvoiceClick"
              >E-Faturaya Dönüştür</q-btn
            >
          </div>

          <div class="col-sm-6 col-xs-12 q-pa-xs">
            <q-btn
              class="full-width"
              color="negative"
              @click="updateInvoiceClick"
              >Güncelle</q-btn
            >
          </div>

          <div class="col-sm-6 col-xs-12 q-pa-xs">
            <q-btn
              class="full-width"
              color="deep-orange"
              @click="newInvoiceClick"
              >Yeni Fatura Kaydet</q-btn
            >
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <dialog-convert-e-invoice
    :dialogState="dialogConvertEInvoiceState"
    @dialog-convert-einvoice-close="dialogConvertEInvoiceState = false"
    :invoiceId="invoiceId"
  ></dialog-convert-e-invoice>
</template>
<script>
import { defineComponent, computed, ref } from "vue";
import { useRouter } from "vue-router";
import DialogConvertEInvoice from "./DialogConvertEInvoice.vue";
export default defineComponent({
  props: ["dialogState", "id"],
  components: { DialogConvertEInvoice },
  setup(props, { emit }) {
    const router = useRouter();
    let dialogState = computed({
      get: () => {
        return props.dialogState;
      },
      set: () => {
        emit("dialog-invoice-menu-close");
      },
    });
    let invoiceId = computed(() => props.id);
    let dialogConvertEInvoiceState = ref(false);
    const invoiceListClick = () => {
      router.push("/invoiceList");
    };
    const convertInvoiceClick = () => {
      dialogConvertEInvoiceState.value = true;
    };
    const updateInvoiceClick = () => {
      router.replace(`/saveInvoice/${invoiceId.value}`);
    };
    const newInvoiceClick = () => {
      emit("dialog-invoice-menu-close");
    };
    console.warn("convert id==", props.id);
    return {
      dialogState,
      invoiceListClick,
      dialogConvertEInvoiceState,
      invoiceId,
      convertInvoiceClick,
      updateInvoiceClick,
      newInvoiceClick,
    };
  },
});
</script>
