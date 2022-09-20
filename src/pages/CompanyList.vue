<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-pb-sm">
        <div class="col-sm-9 col-xs-12">
          <q-input
            square
            dense
            label="Firma Ara"
            class="full-width"
            v-model="search"
            clearable
            clear-icon="close"
          />
        </div>
        <div class="col-sm-3 col-xs-12 column justify-center q-pa-sm">
          <q-btn icon="add" color="green" @click="btnNewCompanyClick"></q-btn>
        </div>
      </div>
      <component
        :is="$q.screen.lt.sm ? 'GridCompanyListMobile' : 'GridCompanyList'"
        :companyList="filteredList"
        :loading="loading"
        @company-delete="openDeleteWarning"
        @company-update="updateCompany"
      />
    </div>
    <dialog-delete-warning
      :dialogState="deleteWarningState"
      @dialog-delete-warning-close="deleteWarningState = false"
      @dialog-delete-click="deleteCompany"
    >
      <template v-slot:title>Firma Sil</template>
      <template v-slot:content>
        <div class="text-subtitle2">
          Seçili firma silinecek. Devam etmek istiyor musunuz?
        </div>
      </template>
    </dialog-delete-warning>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import GridCompanyList from "src/components/Company/GridCompanyList.vue";
import GridCompanyListMobile from "src/components/Company/GridCompanyListMobile.vue";
import DialogDeleteWarning from "src/components/Common/DialogDeleteWarning.vue";
import { success } from "src/util/notify";
import { companyDelete, getList } from "src/api/company.api";

export default defineComponent({
  components: { GridCompanyList, GridCompanyListMobile, DialogDeleteWarning },

  setup() {
    const router = useRouter();
    let companyList = ref([]);
    let loading = ref(false);
    let deleteWarningState = ref(false);
    let search = ref("");
    const getCompanyList = () => {
      loading.value = true;
      getList()
        .then((response) => {
          companyList.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const selectedCompany = ref({});
    const openDeleteWarning = (company) => {
      selectedCompany.value = company;
      deleteWarningState.value = true;
    };
    const deleteCompany = () => {
      companyDelete(selectedCompany.value.companyId)
        .then((response) => {
          deleteWarningState.value = false;
          companyList.value = companyList.value.filter(
            (company) => company.companyId != selectedCompany.value.companyId
          );
          success(response.data);
        })
        .finally(() => {
          deleteWarningState.value = false;
        });
    };
    const updateCompany = (company) => {
      router.push({ name: "save-company", params: { id: company.companyId } });
    };
    const btnNewCompanyClick = () => {
      router.push({ name: "save-company" });
    };
    const filteredList = computed(() => {
      if (search.value !== "" && search.value) {
        return companyList.value.filter((item) => {
          let filterText = search.value.toLocaleUpperCase("tr-TR");
          return (
            item.title?.toLocaleUpperCase("tr-TR").includes(filterText) ||
            item.firstName?.toLocaleUpperCase("tr-TR").includes(filterText) ||
            item.lastName?.toLocaleUpperCase("tr-TR").includes(filterText) ||
            item.vergiNo?.includes(filterText) ||
            item.tcKimlikNo?.includes(filterText)
          );
        });
      }
      return companyList.value;
    });

    getCompanyList();
    return {
      loading,
      openDeleteWarning,
      deleteWarningState,
      deleteCompany,
      updateCompany,
      btnNewCompanyClick,
      search,
      filteredList,
    };
  },
});
</script>

<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 140px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 185px)
  @media (max-width:360px)
        height: calc(100vh - 135px)
</style>
