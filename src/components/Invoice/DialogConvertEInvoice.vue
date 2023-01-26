<template>
  <q-dialog v-model="dialogState" full-width>
    <q-card>
      <q-bar class="bg-primary text-white full-width">
        <div>Elektronik Faturaya Dönüştür</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row">
          <div class="col-sm-5 col-xs-12 q-pa-xs">
            <q-select
              v-model="invoiceScenarioType"
              :options="invoiceScenarioTypeOptions"
              label="Senaryo Türü"
              clear-icon="close"
              dense
              emit-value
              map-options
            ></q-select>
          </div>
          <div class="col-sm-5 col-xs-12 q-pa-xs">
            <q-select
              v-model="invoiceType"
              :options="invoiceTypeOptions"
              label="Fatura Türü"
              clear-icon="close"
              dense
              emit-value
              map-options
            ></q-select>
          </div>
          <div class="col-sm-2 col-xs-12 q-pa-xs">
            <q-btn
              class="full-width"
              icon="change_circle"
              color="green"
              @click="convertClick"
              :disable="disable"
              >Dönüştür</q-btn
            >
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4 col-xs-12 q-pa-xs">
            <q-btn class="full-width" color="red" @click="inBoxInvoiceClick"
              >Gelen E-Faturalar</q-btn
            >
          </div>

          <div class="col-sm-4 col-xs-12 q-pa-xs">
            <q-btn class="full-width" color="orange" @click="outBoxInvoiceClick"
              >Giden E-Faturalar</q-btn
            >
          </div>

          <div class="col-sm-4 col-xs-12 q-pa-xs">
            <q-btn class="full-width" color="negative" @click="saveInvoiceClick"
              >Yeni Fatura</q-btn
            >
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, computed, ref } from "vue";
import {
  invoiceScenarioTypeOptions,
  invoiceTypeOptions,
} from "src/util/constants";

import { useRouter } from "vue-router";
import { success, warning } from "src/util/notify";
import { convertInvoiceToElectronicInvoice } from "src/api/electronicInvoice.api";

export default defineComponent({
  props: ["dialogState", "invoiceId"],
  setup(props, { emit }) {
    const router = useRouter();

    let dialogState = computed({
      get: () => {
        return props.dialogState;
      },
      set: () => {
        emit("dialog-convert-einvoice-close");
      },
    });
    let invoiceId = computed(() => props.invoiceId);
    let invoiceScenarioType = ref(0);
    let invoiceType = ref(0);
    let loading = ref(false);
    let disable = ref(false);
    const inboxInvoiceClick = () => {
      router.push("/inboxinvoicelist");
    };

    const outBoxInvoiceClick = () => {
      router.push("/outboxinvoicelist");
    };

    const saveInvoiceClick = () => {
      router.push("/saveinvoice");
    };
    const convertClick = () => {
      if (
        invoiceScenarioType.value === "" ||
        invoiceScenarioType.value === null
      ) {
        warning("Senaryo türünü seçiniz.");
        return;
      }
      if (invoiceType.value === "" || invoiceType.value === null) {
        warning("Fatura türünü seçiniz.");
        return;
      }

      convertInvoiceToElectronicInvoice(
        invoiceId.value,
        invoiceScenarioType.value,
        invoiceType.value
      )
        .then((response) => {
          success(response.data);
          disable.value = true;
          emit("dialog-convert-einvoice-close");
        })
        .finally(() => {
          loading.value = false;
        });
    };
    return {
      dialogState,
      invoiceScenarioType,
      invoiceType,
      invoiceScenarioTypeOptions,
      invoiceTypeOptions,
      inboxInvoiceClick,
      outBoxInvoiceClick,
      saveInvoiceClick,
      convertClick,
      loading,
      disable,
    };
  },
});
</script>
