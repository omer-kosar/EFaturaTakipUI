<template>
  <q-page class="q-pa-xs">
    <div class="row q-mt-xs">
      <div class="col-md-11 col-xs-12 col-ms-12">
        <q-input dense label="Fatura Ara" v-model="search"></q-input>
      </div>
      <div class="col-md-1 col-xs-12 col-sm-12">
        <q-btn
          icon="add"
          color="green"
          class="full-width"
          @click="btnNewStockClick"
        ></q-btn>
      </div>
    </div>
    <div class="q-mt-sm">
      <component
        :is="$q.screen.lt.sm ? 'GridInvoiceListMobile' : 'GridInvoiceList'"
        :invoiceList="invoiceList"
        :loading="loading"
        @invoice-delete="openDeleteWarning"
        @invoice-update="updateInvoice"
      />
    </div>
    <dialog-delete-warning
      :dialogState="deleteWarningState"
      @dialog-delete-warning-close="deleteWarningState = false"
      @dialog-delete-click="deleteInvoice"
    >
      <template v-slot:title>Fatura Sil</template>
      <template v-slot:content>
        <div class="text-subtitle2">
          Seçili fatura silinecek. Devam etmek istiyor musunuz?
        </div>
      </template>
    </dialog-delete-warning>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import DialogDeleteWarning from "src/components/Common/DialogDeleteWarning.vue";
import GridInvoiceList from "src/components/Invoice/GridInvoiceList.vue";
import GridInvoiceListMobile from "src/components/Invoice/GridInvoiceListMobile.vue";
import { getList } from "src/api/invoice.api";

export default defineComponent({
  components: { DialogDeleteWarning, GridInvoiceList, GridInvoiceListMobile },
  setup() {
    let loading = ref(false);
    let invoiceList = ref([]);
    let search = ref("");
    let selectedInvoice = ref({});
    let deleteWarningState = ref(false);

    const getInvoiceList = () => {
      loading.value = true;
      getList()
        .then((response) => {
          invoiceList.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const deleteInvoice = () => {
      invoiceDelete(selectedInvoice.value.invoiceId)
        .then((response) => {
          deleteWarningState.value = false;
          invoiceList.value = invoiceList.value.filter(
            (invoice) => invoice.invoiceId != selectedInvoice.value.invoiceId
          );
          success(response.data);
        })
        .finally(() => {
          deleteWarningState.value = false;
        });
    };
    const updateInvoice = (invoice) => {
      router.push({ name: "save-invoice", params: { id: invoice.invoiceId } });
    };
    const openDeleteWarning = (invoice) => {
      selectedInvoice.value = invoice;
      deleteWarningState.value = true;
    };
    getInvoiceList();
    return {
      loading,
      invoiceList,
      search,
      deleteInvoice,
      updateInvoice,
      openDeleteWarning,
      deleteWarningState,
    };
  },
});
</script>
<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 130px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 180px)
  @media (max-width:360px)
        height: calc(100vh - 180px)
</style>
