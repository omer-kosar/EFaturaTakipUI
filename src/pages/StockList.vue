<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-pb-sm justify-end">
        <q-btn icon="add" color="green" @click="btnNewStockClick"
          >Yeni Stok Kaydet</q-btn
        >
      </div>
      <component
        :is="$q.screen.lt.sm ? 'GridStockListMobile' : 'GridStockList'"
        :stockList="stockList"
        :loading="loading"
        @stock-delete="openDeleteWarning"
        @stock-update="updateStock"
      />
    </div>
    <dialog-delete-warning
      :dialogState="deleteWarningState"
      @dialog-delete-warning-close="deleteWarningState = false"
      @dialog-delete-click="deleteStock"
    >
      <template v-slot:title>Stok Sil</template>
      <template v-slot:content>
        <div class="text-subtitle2">
          Seçili stok silinecek. Devam etmek istiyor musunuz?
        </div>
      </template>
    </dialog-delete-warning>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import GridStockList from "src/components/Stock/GridStockList.vue";
import GridStockListMobile from "src/components/Stock/GridStockListMobile.vue";
import { getList, stockDelete } from "src/api/stock.api";
import DialogDeleteWarning from "src/components/Common/DialogDeleteWarning.vue";
import { success } from "src/util/notify";
export default defineComponent({
  components: { GridStockList, GridStockListMobile, DialogDeleteWarning },
  setup() {
    const router = useRouter();

    let stockList = ref([]);
    let loading = ref(false);
    let deleteWarningState = ref(false);
    const getStockList = () => {
      loading.value = true;
      getList()
        .then((response) => {
          stockList.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const selectedStock = ref({});
    const openDeleteWarning = (stock) => {
      selectedStock.value = stock;
      deleteWarningState.value = true;
    };
    const deleteStock = () => {
      stockDelete(selectedStock.value.stockId)
        .then((response) => {
          deleteWarningState.value = false;
          stockList.value = stockList.value.filter(
            (stock) => stock.stockId != selectedStock.value.stockId
          );
          success(response.data);
        })
        .finally(() => {
          deleteWarningState.value = false;
        });
    };
    const updateStock = (stock) => {
      router.push({ name: "save-stock", params: { id: stock.stockId } });
    };
    const btnNewStockClick = () => {
      router.push({ name: "save-stock" });
    };
    getStockList();

    return {
      stockList,
      loading,
      openDeleteWarning,
      deleteWarningState,
      deleteStock,
      updateStock,
      btnNewStockClick,
    };
  },
});
</script>

<style lang="sass" scoped>
.grid-height
  height: calc(100vh - 130px)
  @media (min-width:360px) and (max-width:768px)
        height: calc(100vh - 190px)
  @media (max-width:360px)
        height: calc(100vh - 190px)
</style>
