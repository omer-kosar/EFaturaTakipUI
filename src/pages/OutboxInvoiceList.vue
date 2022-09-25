<template>
  <q-page class="q-pa-xs">
    <div class="row q-mt-xs">
      <div class="col-md-5 col-xs-6 q-pa-xs">
        <q-input square dense label="Başlangıç Tarihi" v-model="baslangicTarih">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date today-btn v-model="baslangicTarih" mask="DD.MM.YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Kapat" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col-md-5 col-xs-6 q-pa-xs">
        <q-input square dense v-model="bitisTarih" label="Bitiş Tarihi">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date today-btn v-model="bitisTarih" mask="DD.MM.YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Kapat" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-md-2 q-pl-xs col-xs-12 column justify-center">
        <q-btn
          class="full-width"
          size="md"
          outline
          icon="search"
          :loading="loading"
          @click="btnRefresh"
          >Getir</q-btn
        >
      </div>
      <div class="col-md-12 col-xs-12">
        <q-input
          square
          dense
          label="Ara"
          class="full-width"
          v-model="searchText"
          clearable
          clear-icon="close"
        />
      </div>
    </div>
    <div class="q-mt-sm">
      <q-table
        v-if="$q.screen.gt.sm"
        :rows="filteredList"
        :columns="columnsInboxInvoice"
        class="grid-height"
        :wrap-cells="true"
        :loading="invoiceLoading"
        binary-state-sort
        ref="refInvoiceList"
        row-key="eFaturaId"
        v-model:pagination="pagination"
        @request="onRequest"
        :rows-per-page-options="rowsOptions"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <q-checkbox v-model="props.row.selected" color="primary" />
            </q-td>
            <q-td key="invoiceNo" :props="props" class="text-center">
              <span class="text-weight-bold">{{ props.row.eFaturaNo }}</span>
              <br />
              <span class="text-weight-regular">
                {{ props.row.eFaturaId }}
              </span>
            </q-td>
            <q-td key="targetVknTckn" :props="props">
              <span class="text-weight-regular">{{
                props.row.targetTcknVkn
              }}</span>
              <br />
              <span class="text-weight-bold">
                {{ props.row.targetTitle }}
              </span>
            </q-td>
            <q-td key="scenario" :props="props">
              <q-chip
                square
                text-color="white"
                :style="{ 'background-color': props.row.typeCodeRenk }"
              >
                {{ props.row.typeCodeF }}
              </q-chip>
              <q-chip
                square
                text-color="white"
                style="background-color: #90a4ae"
              >
                {{ props.row.invoiceTipTypeCodeF }}
              </q-chip>
            </q-td>
            <q-td key="status" :props="props">
              <q-chip
                square
                text-color="white"
                :style="{ 'background-color': props.row.statusCodeRenk }"
              >
                {{ props.row.statusCodeF }}
              </q-chip>
            </q-td>
            <q-td key="date" :props="props">
              <span class="text-weight-bold">{{
                formatDate(props.row.executionDate)
              }}</span>
              <br />
              <span class="text-weight-regular">
                {{ formatDate(props.row.createDate) }}
              </span>
            </q-td>
            <q-td key="kdv" :props="props">
              <span>{{ props.row.partialTaxF }}</span>
              <br />
              <span>{{ props.row.totalTaxF }}</span>
            </q-td>
            <q-td key="total" :props="props">
              <span class="text-weight-regular">{{
                props.row.taxExclusiveAmountF
              }}</span>
              <br />
              <span class="text-weight-bold">
                <q-chip square text-color="white" color="positive">
                  {{ props.row.payableAmountF }}
                </q-chip>
              </span>
            </q-td>
            <q-td key="actions">
              <q-btn
                icon="more_horiz"
                :dense="$q.screen.lt.md"
                :loading="props.row.loading"
                :disable="props.row.loading"
              >
                <q-menu>
                  <q-list style="min-width: 120px">
                    <q-separator />
                    <q-item clickable v-close-popup @click="approve()">
                      <q-item-section avatar>
                        <q-icon name="task"></q-icon>
                      </q-item-section>
                      <q-item-section>Onayla</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="decline(props.row)">
                      <q-item-section avatar>
                        <q-icon name="block"></q-icon>
                      </q-item-section>
                      <q-item-section>Reddet</q-item-section>
                    </q-item>
                    <q-separator />

                    <q-item
                      clickable
                      v-close-popup
                      @click="showInvoice(props.row)"
                    >
                      <q-item-section avatar>
                        <q-icon name="visibility"></q-icon>
                      </q-item-section>
                      <q-item-section>Göster</q-item-section>
                    </q-item>
                    <q-separator />

                    <q-item
                      clickable
                      v-close-popup
                      @click="sendEMail(props.row)"
                    >
                      <q-item-section avatar>
                        <q-icon name="email"></q-icon>
                      </q-item-section>
                      <q-item-section>Mail At</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
      <q-table
        v-else
        :rows="filteredList"
        :columns="columnsInvoiceMobile"
        class="grid-height"
        :loading="invoiceLoading"
        binary-state-sort
        ref="refInvoiceList"
        row-key="eFaturaId"
        v-model:pagination="pagination"
        @request="onRequest"
        :rows-per-page-options="rowsOptions"
        :wrap-cells="true"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="invoiceNo" :props="props" class="text-center">
              <q-card
                class="my-card"
                :class="{ 'bg-orange': props.row.selected }"
              >
                <q-card-section>
                  <div
                    class="row text-justify q-gutter-y-xs"
                    @click="selectionInvoice(props.row)"
                  >
                    <div class="col-xs-12 col-sm-6">
                      Fatura No:
                      <span class="text-weight-bold">
                        {{ props.row.eFaturaNo }}
                      </span>
                    </div>

                    <div class="col-xs-12 col-sm-6">
                      Fatura Id:<span class="text-weight-bold">
                        {{ props.row.eFaturaId }}</span
                      >
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      Gönderen VKN/TCKN:
                      <span class="text-weight-bold">{{
                        props.row.targetTcknVkn
                      }}</span>
                    </div>

                    <div class="col-xs-12 col-sm-6">
                      Gönderen Unvan:
                      <span class="text-weight-bold">{{
                        props.row.targetTitle
                      }}</span>
                    </div>

                    <div class="col-xs-12 col-sm-6">
                      Düz. Tarihi:
                      <span class="text-weight-bold">{{
                        formatDate(props.row.executionDate)
                      }}</span>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      Oluş. Tarihi:
                      <span class="text-weight-bold">{{
                        formatDate(props.row.createDate)
                      }}</span>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      KDV:
                      <span class="text-weight-bold">{{
                        props.row.partialTaxF
                      }}</span>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      TOP. KDV:
                      <span class="text-weight-bold">{{
                        props.row.totalTaxF
                      }}</span>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <span class="text-weight-bold">{{
                        props.row.taxExclusiveAmountF
                      }}</span>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <span class="text-weight-bold">{{
                        props.row.payableAmountF
                      }}</span>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <div class="row q-gutter-x-xs">
                        <div class="col">
                          <q-chip
                            square
                            text-color="white"
                            :style="{
                              'background-color': props.row.typeCodeRenk,
                            }"
                          >
                            {{ props.row.typeCodeF }}
                          </q-chip>
                        </div>
                        <div class="col">
                          <q-chip
                            square
                            text-color="white"
                            style="background-color: #90a4ae"
                          >
                            {{ props.row.invoiceTipTypeCodeF }}
                          </q-chip>
                        </div>
                        <div class="col">
                          <q-chip
                            square
                            text-color="white"
                            :style="{
                              'background-color': props.row.statusCodeRenk,
                            }"
                          >
                            {{ props.row.statusCodeF }}
                          </q-chip>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <q-btn
                        class="full-width"
                        icon="more_horiz"
                        :dense="$q.screen.lt.md"
                        :loading="props.row.loading"
                        :disable="props.row.loading"
                      >
                        <q-menu>
                          <q-list style="min-width: 120px">
                            <q-separator />
                            <q-item clickable v-close-popup @click="approve()">
                              <q-item-section avatar>
                                <q-icon name="task"></q-icon>
                              </q-item-section>
                              <q-item-section>Onayla</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item
                              clickable
                              v-close-popup
                              @click="decline(props.row)"
                            >
                              <q-item-section avatar>
                                <q-icon name="block"></q-icon>
                              </q-item-section>
                              <q-item-section>Reddet</q-item-section>
                            </q-item>
                            <q-separator />

                            <q-item
                              clickable
                              v-close-popup
                              @click="showInvoice(props.row)"
                            >
                              <q-item-section avatar>
                                <q-icon name="visibility"></q-icon>
                              </q-item-section>
                              <q-item-section>Göster</q-item-section>
                            </q-item>
                            <q-separator />

                            <q-item
                              clickable
                              v-close-popup
                              @click="sendEMail(props.row)"
                            >
                              <q-item-section avatar>
                                <q-icon name="email"></q-icon>
                              </q-item-section>
                              <q-item-section>Mail At</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
    <dialog-send-invoice-e-mail
      :dialogState="dialogSendEMailState"
      :invoice="invoiceAsEMail"
      :isInboxInvoice="false"
      @dialog-send-invoice-email-close="dialogSendEMailState = false"
    ></dialog-send-invoice-e-mail>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

import {
  approveInboxInvoices,
  declineInboxInvoices,
  getOutboxInvoiceList,
} from "src/api/electronicInvoice.api";
import { useQuasar, date } from "quasar";
import { success, warning } from "src/util/notify";
import { useStore } from "vuex";
import DialogSendInvoiceEMail from "src/components/Invoice/DialogSendInvoiceEMail.vue";
import {
  columnsInboxInvoice,
  columnsInvoiceMobile,
} from "src/util/invoice-columns";

export default defineComponent({
  components: {
    DialogSendInvoiceEMail,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    let dialogSendEMailState = ref(false);
    let searchText = ref("");
    let inboxInvoiceList = ref([]);
    let loading = ref(false);
    let invoiceLoading = ref(false);

    let baslangicTarih = ref("");
    let bitisTarih = ref("");
    const rowsOptions = [5, 10, 25, 50, 100, 1000];
    const pagination = ref({
      sortBy: "desc",
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });

    let invoiceAsEMail = ref({});
    const getInvoiceList = (page = 0, rowsPerPage = 10) => {
      if (page > 0) page = page - 1;
      let baslangicTarihi = date.formatDate(baslangicTarih.value, "DD.MM.YYYY");
      let bitisTarihi = date.formatDate(bitisTarih.value, "DD.MM.YYYY");
      invoiceLoading.value = true;
      getOutboxInvoiceList(page, rowsPerPage, baslangicTarihi, bitisTarihi)
        .then((response) => {
          inboxInvoiceList.value = response.data.faturalar.map((invoice) => {
            return { selected: false, ...invoice };
          });
          pagination.value.page = response.data.pageIndex + 1;
          pagination.value.rowsPerPage = response.data.pageSize;
          pagination.value.rowsNumber = response.data.totalCount;
        })
        .finally(() => {
          loading.value = false;
          invoiceLoading.value = false;
        });
    };
    const btnRefresh = () => {
      loading.value = true;
      getInvoiceList();
    };

    const approve = () => {
      let approvedInvoiceList = getSelectedInvoiceList();
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
    const decline = () => {
      let declineInvoiceList = getSelectedInvoiceList();

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
        `${process.env.baseUrl}/Invoices/ShowOutBoxInvoice/${invoice.eFaturaId}/${userCompanyId}`,
        "_blank"
      );
    };
    const filteredList = computed(() => {
      if (searchText.value !== "" && searchText.value) {
        console.warn("list>>>>>>", inboxInvoiceList.value);
        return inboxInvoiceList.value.filter((item) => {
          let filterText = searchText.value.toLocaleUpperCase("tr-TR");
          console.warn("item===>>>>>", item);
          return (
            item.targetTitle?.toLocaleUpperCase("tr-TR").includes(filterText) ||
            item.targetTcknVkn?.includes(filterText) ||
            item.eFaturaNo?.toLocaleUpperCase("tr-TR").includes(filterText) ||
            item.eFaturaId?.toLocaleUpperCase("tr-TR").includes(filterText)
          );
        });
      }
      return inboxInvoiceList.value;
    });
    const formatDate = (val) => {
      return date.formatDate(val, "DD.MM.YYYY HH:mm:ss");
    };
    const onRequest = (props) => {
      getInvoiceList(props.pagination.page, props.pagination.rowsPerPage);
    };
    const getSelectedInvoiceList = () => {
      let selected = inboxInvoiceList.value.filter(
        (invoice) => invoice.selected
      );
      return selected;
    };
    const selectionInvoice = (invoice) => {
      invoice.selected = !invoice.selected;
    };

    btnRefresh();
    return {
      searchText,
      filteredList,
      loading,
      invoiceLoading,
      btnRefresh,
      approve,
      decline,
      showInvoice,
      sendEMail,
      dialogSendEMailState,
      invoiceAsEMail,
      baslangicTarih,
      bitisTarih,
      rowsOptions,
      pagination,
      onRequest,
      columnsInboxInvoice,
      columnsInvoiceMobile,
      formatDate,
      selectionInvoice,
    };
  },
});
</script>

<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 200px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 260px)
  @media (max-width:360px)
        height: calc(100vh - 220px)
</style>
