<template>
  <q-page class="q-pa-xs">
    <div class="row q-mt-xs">
      <div class="col-md-11 col-xs-10">
        <q-input
          square
          outlined
          dense
          label="Ara"
          class="full-width"
          v-model="searchText"
          clearable
          clear-icon="close"
        />
      </div>
      <div class="col-md-1 q-pl-xs col-xs-2">
        <q-btn
          class="full-width full-height"
          dense
          outline
          icon="refresh"
          :loading="loading"
          @click="btnRefresh"
        ></q-btn>
      </div>
    </div>
    <div class="q-mt-sm">
      <component
        :is="
          $q.screen.lt.sm
            ? 'GridInboxInvioceListMobile'
            : 'GridInboxInvoiceList'
        "
        :inboxInvoiceList="inboxInvoiceList"
        :loading="loading"
        :pagination="pagination"
        :filter="searchText"
        @approve="approve"
        @decline="decline"
      ></component>
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          :max-pages="5"
          size="md"
          input
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import GridInboxInvoiceList from "src/components/InboxInvoiceList/GridInboxInvoiceList.vue";
import GridInboxInvioceListMobile from "src/components/InboxInvoiceList/GridInboxInvioceListMobile.vue";
import {
  approveInboxInvoices,
  declineInboxInvoices,
  getInboxInvoiceList,
} from "src/api/invoice.api";
import { useQuasar } from "quasar";
import { warning } from "src/util/notify";
export default defineComponent({
  components: { GridInboxInvoiceList, GridInboxInvioceListMobile },
  setup() {
    const $q = useQuasar();

    let searchText = ref("");
    let inboxInvoiceList = ref([]);
    let loading = ref(false);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: $q.screen.lt.xl ? 7 : 10,
    });

    const getInvoiceList = () => {
      loading.value = true;
      pagination.value.page = 1;
      getInboxInvoiceList()
        .then((response) => {
          inboxInvoiceList.value = response.data.map((invoice) => {
            return { selected: false, ...invoice };
          });
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const btnRefresh = () => {
      getInvoiceList();
    };
    const approve = (approvedInvoiceList) => {
      if (approvedInvoiceList.length === 0) {
        warning("Onaylamak istediğiniz faturaları seçiniz");
        return;
      }
      let invoiceIdList = approvedInvoiceList.map((invoice) => {
        return invoice.eFaturaId;
      });
      loading.value = true;
      approveInboxInvoices(invoiceIdList)
        .then((response) => {
          console.warn("approve response", response);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const decline = (declineInvoiceList) => {
      if (declineInvoiceList.length === 0) {
        warning("Reddetmek istediğiniz faturaları seçiniz");
        return;
      }
      let invoiceIdList = declineInvoiceList.map((invoice) => {
        return invoice.eFaturaId;
      });
      loading.value = true;

      declineInboxInvoices(invoiceIdList)
        .then((response) => {
          console.warn("approve response", response);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    getInvoiceList();
    return {
      searchText,
      inboxInvoiceList,
      loading,
      pagination,
      pagesNumber: computed(() =>
        Math.ceil(inboxInvoiceList.value.length / pagination.value.rowsPerPage)
      ),
      btnRefresh,
      approve,
      decline,
    };
  },
});
</script>

<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 170px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 450px)
  @media (max-width:360px)
        height: calc(100vh - 470px)
</style>
