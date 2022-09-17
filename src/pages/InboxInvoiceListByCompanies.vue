<template>
  <q-page class="q-pa-xs">
    <div class="row q-mt-xs">
      <div class="col-md-12 col-xs-12">
        <q-select
          v-model="companyId"
          :options="companyOptions"
          label="Firma"
          clear-icon="close"
          dense
          emit-value
          map-options
          input-debounce="3"
          use-input
          behavior="menu"
          @pop-show="showTopNCompanyList"
          @filter="filterCompany"
          :loading="loadingFilterCompany"
          option-value="id"
          option-label="name"
          @update:model-value="getInboxInvoiceList"
        ></q-select>
      </div>
      <div class="col-md-12 col-xs-12 q-mt-xs">
        <q-input
          square
          dense
          label="Fatura Ara"
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
        :columns="columnsInvoice"
        class="grid-height"
        :wrap-cells="true"
        :loading="loading"
        binary-state-sort
        ref="refInvoiceList"
        row-key="eFaturaId"
        v-model:pagination="pagination"
        @request="onRequest"
        :rows-per-page-options="rowsOptions"
        :no-data-label="noDataMessage"
        rows-per-page-label="Kayıt Sayısı"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
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
        :wrap-cells="true"
        :loading="loading"
        binary-state-sort
        ref="refInvoiceList"
        row-key="eFaturaId"
        v-model:pagination="pagination"
        @request="onRequest"
        :rows-per-page-options="rowsOptions"
        :no-data-label="noDataMessage"
        rows-per-page-label="Kayıt Sayısı"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="invoiceNo" :props="props" class="text-center">
              <q-card class="my-card">
                <q-card-section>
                  <div class="row text-justify q-gutter-y-xs">
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
                    <div class="col-12">
                      <q-btn
                        class="full-width"
                        icon="visibility"
                        @click="showInvoice(props.row)"
                        >Göster</q-btn
                      >
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
  </q-page>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useQuasar } from "quasar";

import GridInboxInvoiceListForAdvisor from "src/components/InboxInvoiceList/GridInboxInvoiceListForAdvisor.vue";
import GridInboxInvoiceListForAdvisorMobile from "src/components/InboxInvoiceList/GridInboxInvoiceListForAdvisorMobile.vue";
import { search } from "src/api/company.api";
import { getInboxInvoiceListByCompanyId } from "src/api/invoice.api";
import { columnsInvoice, columnsInvoiceMobile } from "src/util/invoice-columns";
import { date } from "quasar";

export default defineComponent({
  components: {
    GridInboxInvoiceListForAdvisor,
    GridInboxInvoiceListForAdvisorMobile,
  },
  setup() {
    const $q = useQuasar();
    let inboxInvoiceList = ref([]);
    let companyOptions = ref([]);
    let filteredCompanyList = [];
    let loadingFilterCompany = ref(false);

    let loading = ref(false);
    let searchText = ref("");
    let companyId = ref("");
    const rowsOptions = [5, 10, 25, 50, 100, 1000];
    const noDataMessage = "Kayıt bulunamadı!";
    const pagination = ref({
      sortBy: "desc",
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const showTopNCompanyList = () => {
      loadingFilterCompany.value = true;
      if (filteredCompanyList.length > 0) return;
      search("")
        .then((response) => {
          filteredCompanyList = response.data;
          companyOptions.value = filteredCompanyList;
        })
        .finally(() => {
          loadingFilterCompany.value = false;
        });
    };
    const filterCompany = (val, update) => {
      loadingFilterCompany.value = true;
      search(val)
        .then((response) => {
          update(() => {
            companyOptions.value = response?.data;
            filteredCompanyList = companyOptions.value;
          });
        })
        .finally(() => {
          loadingFilterCompany.value = false;
        });
    };
    const getInboxInvoiceList = () => {
      loading.value = true;
      searchText.value = "";
      getInvoiceList();
    };
    const getInvoiceList = (page = 0, rowsPerPage = 10) => {
      if (page > 0) page = page - 1;
      getInboxInvoiceListByCompanyId(companyId.value, page, rowsPerPage)
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
        });
    };
    const showInvoice = (invoice) => {
      window.open(
        `${process.env.baseUrl}/Invoices/ShowInvoice/${invoice.eFaturaId}/${companyId.value}`,
        "_blank"
      );
    };
    const filteredList = computed(() => {
      if (searchText.value !== "" && searchText.value) {
        return inboxInvoiceList.value.filter((item) => {
          let filterText = searchText.value.toLocaleUpperCase("tr-TR");
          return (
            item.targetTitle.toLocaleUpperCase("tr-TR").includes(filterText) ||
            item.targetTcknVkn.includes(filterText) ||
            item.eFaturaNo.toLocaleUpperCase("tr-TR").includes(filterText) ||
            item.eFaturaId.toLocaleUpperCase("tr-TR").includes(filterText)
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
    return {
      filteredList,
      loading,
      searchText,
      pagination,
      companyOptions,
      companyId,
      loadingFilterCompany,
      columnsInvoice,
      columnsInvoiceMobile,
      filterCompany,
      showTopNCompanyList,
      getInboxInvoiceList,
      showInvoice,
      formatDate,
      onRequest,
      rowsOptions,
      noDataMessage,
    };
  },
});
</script>
<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 210px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 170px)
  @media (max-width:360px)
        height: calc(100vh - 190px)
</style>
