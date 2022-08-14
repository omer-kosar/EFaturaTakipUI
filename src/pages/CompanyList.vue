<template>
  <q-page>
    <div class="q-pa-md">
      <component
        :is="$q.screen.lt.sm ? 'GridCompanyListMobile' : 'GridCompanyList'"
        :companyList="companyList"
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
import { defineComponent, ref } from "vue";
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
    getCompanyList();
    return {
      companyList,
      loading,
      openDeleteWarning,
      deleteWarningState,
      deleteCompany,
      updateCompany,
    };
  },
});
</script>

<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 110px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 450px)
  @media (max-width:360px)
        height: calc(100vh - 470px)
</style>
