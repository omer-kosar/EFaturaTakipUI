<template>
  <q-dialog v-model="dialogState">
    <q-card style="width: 700px; max-width: 80vw">
      <q-bar class="bg-primary text-white full-width">
        <di> Faturayı Mail Olarak Gönder</di>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <di class="row q-mt-md">
          <div class="col-12">
            <q-input
              square
              dense
              clearable
              clear-icon="close"
              v-model="invoiceEMailmodel.emailAdress"
              label="EMail Adresi"
              :rules="[
                (val) => (val && val.length > 0) || 'EMail adresi boş olamaz',
              ]"
              ref="txtEMailAdress"
            />
          </div>
        </di>
        <div class="row justify-start q-mt-md">
          <div class="col-12">
            <q-btn
              class="full-width"
              color="primary"
              @click="btnSendEMail"
              :loading="loading"
            >
              Gönder
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { sendInvoiceEMail } from "src/api/invoice.api";
import { success } from "src/util/notify";
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: ["dialogState", "invoice"],
  setup(props, { emit }) {
    const store = useStore();

    let dialogState = computed({
      get: () => {
        return props.dialogState;
      },
      set: () => {
        emit("dialog-send-invoice-email-close");
      },
    });
    let invoice = computed(() => props.invoice);
    let invoiceEMailmodel = ref({
      emailAdress: "",
      userId: store.getters["user/getUserId"],
      invoiceId: "",
    });
    let txtEMailAdress = ref("");
    let loading = ref(false);
    const btnSendEMail = () => {
      txtEMailAdress.value.validate();
      if (txtEMailAdress.value.hasError) return;
      invoiceEMailmodel.value.invoiceId = invoice.value.eFaturaId;
      loading.value = true;
      invoiceEMailmodel.value.emailAdress =
        invoiceEMailmodel.value.emailAdress.trim();
      sendInvoiceEMail(invoiceEMailmodel.value)
        .then((response) => {
          success(response.data);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    return {
      dialogState,
      invoice,
      btnSendEMail,
      invoiceEMailmodel,
      txtEMailAdress,
      loading,
    };
  },
});
</script>
