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
        @show-invoice="showInvoice"
        @send-email="sendEMail"
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
    <dialog-send-invoice-e-mail
      :dialogState="dialogSendEMailState"
      :invoice="invoiceAsEMail"
      @dialog-send-invoice-email-close="dialogSendEMailState = false"
    ></dialog-send-invoice-e-mail>
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
import { success, warning } from "src/util/notify";
import { useStore } from "vuex";
import DialogSendInvoiceEMail from "src/components/InboxInvoiceList/DialogSendInvoiceEMail.vue";
export default defineComponent({
  components: {
    GridInboxInvoiceList,
    GridInboxInvioceListMobile,
    DialogSendInvoiceEMail,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    let dialogSendEMailState = ref(false);
    let searchText = ref("");
    let inboxInvoiceList = ref([]);
    let loading = ref(false);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: $q.screen.lt.xl ? 7 : 10,
    });
    let invoiceAsEMail = ref({});
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
          success(response.data);
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
          success(response.data);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const sendEMail = (invoice) => {
      invoiceAsEMail.value = invoice;
      dialogSendEMailState.value = true;
    };
    const showInvoice = (invoice) => {
      let userCompanyId = store.getters["user/getCompanyId"];
      window.open(
        `${process.env.baseUrl}/Invoices/ShowInvoice/${invoice.eFaturaId}/${userCompanyId}`,
        "_blank"
      );
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
      showInvoice,
      sendEMail,
      dialogSendEMailState,
      invoiceAsEMail,
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
