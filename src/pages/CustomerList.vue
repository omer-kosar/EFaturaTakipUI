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
          <q-btn icon="add" color="green" @click="btnNewCustomerClick"></q-btn>
        </div>
      </div>
      <component
        :is="$q.screen.lt.sm ? 'GridCustomerListMobile' : 'GridCustomerList'"
        :companyList="filteredList"
        :loading="loading"
        @customer-delete="openDeleteWarning"
        @customer-update="updateCustomer"
      />
    </div>
    <dialog-delete-warning
      :dialogState="deleteWarningState"
      @dialog-delete-warning-close="deleteWarningState = false"
      @dialog-delete-click="deleteCustomer"
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
import GridCustomerList from "src/components/Company/GridCustomerList.vue";
import GridCustomerListMobile from "src/components/Company/GridCustomerListMobile.vue";
import DialogDeleteWarning from "src/components/Common/DialogDeleteWarning.vue";
import { useRouter } from "vue-router";
import { getCustomerList } from "src/api/company.api";

export default defineComponent({
  components: { GridCustomerList, GridCustomerListMobile, DialogDeleteWarning },

  setup() {
    const router = useRouter();
    let customerList = ref([]);
    let loading = ref(false);
    let deleteWarningState = ref(false);
    let search = ref("");
    const selectedCustomer = ref({});

    const openDeleteWarning = (customer) => {
      selectedCustomer.value = customer;
      deleteWarningState.value = true;
    };
    const deleteCustomer = () => {
      companyDelete(selectedCustomer.value.companyId)
        .then((response) => {
          deleteWarningState.value = false;
          customerList.value = customerList.value.filter(
            (customer) => customer.companyId != selectedCustomer.value.companyId
          );
          success(response.data);
        })
        .finally(() => {
          deleteWarningState.value = false;
        });
    };
    const getList = () => {
      loading.value = true;
      getCustomerList()
        .then((response) => {
          customerList.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const updateCustomer = (customer) => {
      router.push({ name: "save-company", params: { id: customer.companyId } });
    };
    const btnNewCustomerClick = () => {
      router.push({ name: "save-company" });
    };
    const filteredList = computed(() => {
      if (search.value !== "" && search.value) {
        return customerList.value.filter((item) => {
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
      return customerList.value;
    });
    getList();
    return {
      loading,
      openDeleteWarning,
      deleteWarningState,
      deleteCustomer,
      updateCustomer,
      btnNewCustomerClick,
      filteredList,
      search,
    };
  },
});
</script>

<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 145px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 230px)
  @media (max-width:360px)
        height: calc(100vh - 180px)
</style>
