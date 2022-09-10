<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-10 col-md-8 col-xs-12 col-sm-12">
        <q-select
          v-model="financialAdvisorId"
          :options="financialAdvisorOptions"
          label="Müşavir"
          clear-icon="close"
          dense
          emit-value
          map-options
          input-debounce="3"
          use-input
          behavior="menu"
          @pop-show="showTopNFinancilAdvisorList"
          @filter="filterFinancialAdvisor"
          :loading="loadingFilterFinancialAdvisor"
          option-value="id"
          option-label="name"
          @update:model-value="getCompanyList"
        ></q-select>
      </div>
      <div class="col-lg-2 col-md-8 col-xs-12 col-sm-12">
        <q-btn
          icon="add"
          color="green"
          class="full-width full-height"
          @click="addCompanyClick"
          >Firma Ekle / Çıkar</q-btn
        >
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-8 col-xs-12 col-sm-12">
        <q-input dense v-model="companySearch" label="Firma Adı" debounce="3" />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mt-xs">
      <div
        v-for="(companyItem, index) in filteredCompanyList"
        :key="index"
        class="column col-xs-6 col-sm-4 cursor-pointer"
      >
        <q-card
          class="card-pointer text-center full-height text-white bg-blue"
          :class="`bg-${companyItem.color}`"
          square
        >
          <q-card-section
            ><q-icon name="store" size="md"></q-icon>
            <div class="text-weight-medium">{{ companyItem.name }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div
        class="column col-xs-6 col-sm-4 cursor-pointer"
        v-show="filteredCompanyList.length === 0"
      >
        <q-card
          class="card-pointer text-center full-height text-white bg-red"
          square
        >
          <q-card-section
            ><q-icon name="warning" size="md"></q-icon>
            <div class="text-weight-medium">Kayıt bulunamadı</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <dialog-change-advisor-companies-vue
      :dialogState="dialogState"
      :financialAdvisorId="financialAdvisorId"
      @dialog-change-advisor-companies-close="closeDialog"
    ></dialog-change-advisor-companies-vue>
  </q-page>
</template>
<script>
import { getAdvisorCompanies } from "src/api/company.api";
import { searchFinancialAdvisor } from "src/api/user.api";
import { warning } from "src/util/notify";
import { defineComponent, ref, computed } from "vue";
import DialogChangeAdvisorCompaniesVue from "src/components/Company/DialogChangeAdvisorCompanies.vue";
export default defineComponent({
  components: { DialogChangeAdvisorCompaniesVue },
  setup() {
    let financialAdvisorId = ref("");
    let financialAdvisorOptions = ref([]);
    let companyList = ref([]);
    let filteredFinancialAdvisorList = [];
    let loadingFilterFinancialAdvisor = ref(false);
    let loadingCompany = ref(false);
    let companySearch = ref("");
    let dialogState = ref(false);
    const filteredCompanyList = computed(() => {
      if (companySearch.value !== "" && companySearch.value) {
        return companyList.value.filter((item) => {
          return item.name
            .toUpperCase()
            .includes(companySearch.value.toUpperCase());
        });
      }
      return companyList.value;
    });

    const showTopNFinancialAdvisorList = () => {
      loadingFilterFinancialAdvisor.value = true;
      if (filteredFinancialAdvisorList.length > 0) return;
      searchFinancialAdvisor("")
        .then((response) => {
          financialAdvisorOptions.value = response.data;
        })
        .finally(() => {
          loadingFilterFinancialAdvisor.value = false;
        });
    };

    const filterFinancialAdvisor = (val, update) => {
      loadingFilterFinancialAdvisor.value = true;
      searchFinancialAdvisor(val)
        .then((response) => {
          update(() => {
            financialAdvisorOptions.value = response.data;
            filteredFinancialAdvisorList = financialAdvisorOptions.value;
          });
        })
        .finally(() => {
          loadingFilterFinancialAdvisor.value = false;
        });
    };

    const getCompanyList = () => {
      loadingCompany.value = true;
      getAdvisorCompanies(financialAdvisorId.value)
        .then((response) => {
          companyList.value = response.data;
        })
        .finally(() => {
          loadingCompany.value = false;
        });
    };
    showTopNFinancialAdvisorList();
    const addCompanyClick = () => {
      if (!financialAdvisorId.value) {
        warning("Mali müşavir seçiniz.");
        return;
      }
      dialogState.value = true;
    };
    const closeDialog = () => {
      dialogState.value = false;
      getCompanyList();
    };
    return {
      financialAdvisorOptions,
      loadingFilterFinancialAdvisor,
      filterFinancialAdvisor,
      companySearch,
      companyList,
      financialAdvisorId,
      getCompanyList,
      filteredCompanyList,
      addCompanyClick,
      dialogState,
      closeDialog,
    };
  },
});
</script>
