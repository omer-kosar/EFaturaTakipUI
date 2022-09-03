<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-pb-sm justify-end">
        <q-btn icon="add" color="green" @click="btnNewCustomerClick"
          >Yeni Firma Kaydet</q-btn
        >
      </div>
      <component
        :is="$q.screen.lt.sm ? 'GridCustomerListMobile' : 'GridCustomerList'"
        :customerList="customerList"
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
import { defineComponent, ref } from "vue";
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
    getList();
    return {
      customerList,
      loading,
      openDeleteWarning,
      deleteWarningState,
      deleteCustomer,
      updateCustomer,
      btnNewCustomerClick,
    };
  },
});
</script>

<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 130px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 450px)
  @media (max-width:360px)
        height: calc(100vh - 470px)
</style>
