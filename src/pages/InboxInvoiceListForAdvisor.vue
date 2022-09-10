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
      <component
        :is="
          $q.screen.lt.sm
            ? 'GridInboxInvoiceListForAdvisorMobile'
            : 'GridInboxInvoiceListForAdvisor'
        "
        :inboxInvoiceList="filteredList"
        :loading="loading"
        :pagination="pagination"
        :filter="searchText"
        @show-invoice="showInvoice"
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
import { useQuasar } from "quasar";

import GridInboxInvoiceListForAdvisor from "src/components/InboxInvoiceList/GridInboxInvoiceListForAdvisor.vue";
import GridInboxInvoiceListForAdvisorMobile from "src/components/InboxInvoiceList/GridInboxInvoiceListForAdvisorMobile.vue";
import { search } from "src/api/company.api";
import { getInboxInvoiceListByCompanyId } from "src/api/invoice.api";

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
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: $q.screen.lt.xl ? 7 : 10,
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
      pagination.value.page = 1;
      searchText.value = "";
      getInboxInvoiceListByCompanyId(companyId.value)
        .then((response) => {
          inboxInvoiceList.value = response.data.map((invoice) => {
            return { selected: false, ...invoice };
          });
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
          console.warn(item.targetTitle);
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
    return {
      filteredList,
      loading,
      searchText,
      pagination,
      companyOptions,
      companyId,
      loadingFilterCompany,
      pagesNumber: computed(() =>
        Math.ceil(filteredList.value.length / pagination.value.rowsPerPage)
      ),
      filterCompany,
      showTopNCompanyList,
      getInboxInvoiceList,
      showInvoice,
    };
  },
});
</script>
<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 210px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 450px)
  @media (max-width:360px)
        height: calc(100vh - 470px)
</style>
