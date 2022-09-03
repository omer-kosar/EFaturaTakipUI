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
          @update:model-value="matchCompanyWitAdvisor"
        ></q-select>
      </div>
      <div class="col-lg-2 col-md-8 col-xs-12 col-sm-12">
        <q-btn icon="list" color="green" class="full-width full-height"
          >Firma Listesi</q-btn
        >
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-8 col-xs-12 col-sm-12">
        <q-input
          dense
          v-model="companyFilter"
          label="Firma Adı"
          debounce="3"
          @update:model-value="filterCompany"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mt-xs">
      <div
        v-for="(companyItem, index) in companyList"
        :key="index"
        class="column col-xs-6 col-sm-4 cursor-pointer"
        @click="companyClick(companyItem)"
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
          <q-inner-loading :showing="companyItem.loading">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { search } from "src/api/company.api";
import {
  changeFinancialAdvisor,
  searchFinancialAdvisor,
} from "src/api/user.api";
import { warning } from "src/util/notify";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let financialAdvisorId = ref("");
    let financialAdvisorOptions = ref([]);
    let companyList = ref([]);
    let filteredFinancialAdvisorList = [];
    let loadingFilterFinancialAdvisor = ref(false);
    let loadingCompany = ref(false);
    let changeAdvisorLoading = ref(false);
    let companyFilter = ref("");
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
    const filterCompany = () => {
      loadingCompany.value = true;
      search(companyFilter.value)
        .then((response) => {
          companyList.value = response.data;
          matchCompanyWitAdvisor();
        })
        .finally(() => {
          loadingCompany.value = false;
        });
    };
    const showTopNCompanyList = () => {
      loadingCompany.value = true;
      search("")
        .then((response) => {
          companyList.value = response.data?.map((companyItem) => {
            return {
              id: companyItem.id,
              name: companyItem.name,
              color: "blue",
              loading: false,
            };
          });
        })
        .finally(() => {
          loadingCompany.value = false;
        });
    };
    const companyClick = (company) => {
      if (!financialAdvisorId.value) {
        warning("Mali müşavir seçiniz.");
        return;
      }
      changeFinancialAdvisor(financialAdvisorId.value, company.id)
        .then(() => {
          let advisor = financialAdvisorOptions.value.find(
            (item) => item.id === financialAdvisorId.value
          );
          let isExistCompany = isUnMatching(advisor, company.id);
          if (isExistCompany) {
            company.color = "blue";
            advisor.companies = advisor.companies.filter(
              (advisorCompanyId) => advisorCompanyId != company.id
            );
          } else {
            company.color = "orange";
            advisor.companies.push(company.id);
          }
        })
        .finally(() => {
          company.loading = false;
        });
    };
    const isCompanyFinancialAdvisorMatched = (company) => {
      var isAdvisorMatchedCompany = financialAdvisorOptions.value.some(
        (advisor) =>
          advisor.companies.some((companyId) => companyId == company.id)
      );
      if (isAdvisorMatchedCompany) company.color = "orange";
    };
    const matchCompanyWitAdvisor = () => {
      if (!financialAdvisorId.value) {
        return;
      }
      let advisor = financialAdvisorOptions.value.find(
        (item) => item.id === financialAdvisorId.value
      );
      if (!advisor) return;
      companyList.value.forEach((company) => {
        if (advisor.companies.some((companyId) => companyId == company.id)) {
          company.color = "orange";
        } else {
          company.color = "blue";
        }
      });
    };
    const isUnMatching = (advisor, companyId) => {
      return advisor.companies.includes(companyId);
    };
    showTopNFinancialAdvisorList();
    showTopNCompanyList();
    return {
      financialAdvisorOptions,
      loadingFilterFinancialAdvisor,
      filterFinancialAdvisor,
      companyFilter,
      companyList,
      companyClick,
      filterCompany,
      isCompanyFinancialAdvisorMatched,
      financialAdvisorId,
      matchCompanyWitAdvisor,
    };
  },
});
</script>
