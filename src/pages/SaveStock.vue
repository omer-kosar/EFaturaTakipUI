<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section>
            <q-bar dark class="bg-primary text-white">
              <div class="col text-weight-bold">Stok Kaydet</div>
            </q-bar>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="stockModel.name"
                    label="Stok Adı"
                    ref="refName"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    v-model="stockModel.unit"
                    :options="unitOptions"
                    label="Birim"
                    clear-icon="close"
                    dense
                    emit-value
                    map-options
                    ref="refUnit"
                  ></q-select>
                </q-item-section>
              </q-item>

              <q-item class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <VueNumberFormat
                    :class="{
                      'number-format-dark': $q.dark.isActive,
                      'number-format': !$q.dark.isActive,
                    }"
                    v-model:value="stockModel.price"
                    :options="{
                      precision: 2,
                      prefix: '₺ ',
                      suffix: '',
                      decimal: ',',
                      thousand: '.',
                      acceptNegative: false,
                      isInteger: false,
                    }"
                  >
                  </VueNumberFormat>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    v-model="stockModel.valueAddedTax"
                    :options="taxValueOptions"
                    label="KDV"
                    clear-icon="close"
                    dense
                    emit-value
                    map-options
                    ref="refValueAddedTax"
                  ></q-select>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <VueNumberFormat
                    :class="{
                      'number-format-dark': $q.dark.isActive,
                      'number-format': !$q.dark.isActive,
                    }"
                    v-model:value="priceWithTax"
                    :options="{
                      precision: 2,
                      prefix: '₺ ',
                      suffix: '',
                      decimal: ',',
                      thousand: '.',
                      acceptNegative: false,
                      isInteger: false,
                    }"
                  >
                  </VueNumberFormat>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="between">
            <q-btn
              class="text-capitalize bg-info text-white q-mr-md"
              @click="btnGoBackList"
              color="orange"
              >Listeye Dön</q-btn
            >

            <q-btn
              class="text-capitalize bg-info text-white q-mr-md"
              @click="btnSaveClick"
              :loading="loading"
              >Kaydet</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { TaxValueAdded, Unit, taxValueOptions } from "src/util/constants";
import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createStock, getStockItem, updateStock } from "src/api/stock.api";
import {
  rulesPrice,
  rulesName,
  rulesValueAddedTax,
  rulesUnit,
} from "src/validations/Stock/stock.rules";
import { success } from "src/util/notify";
import VueNumberFormat from "vue-number-format";
import { convertDecimal } from "src/util/helper-methods";

const unitOptions = [
  { label: "Adet", value: Unit.Piece },
  { label: "KG", value: Unit.Kilogram },
  { label: "Metre", value: Unit.Metre },
];
export default defineComponent({
  components: { VueNumberFormat },
  setup() {
    const route = useRoute();
    const router = useRouter();

    let stockId = route.params.id;

    let stockModel = ref({});
    let loading = ref(false);
    let priceWithTax = computed({
      get() {
        if (stockModel.value.valueAddedTax === undefined) {
          stockModel.value.valueAddedTax = TaxValueAdded.OnSekiz;
        }
        let price =
          stockModel.value.price * (1 + stockModel.value.valueAddedTax / 100);
        return convertDecimal(price);
      },
      set(value) {
        stockModel.value.price = convertDecimal(
          value / (1 + stockModel.value.valueAddedTax / 100)
        );
      },
    });
    const getStock = (id) => {
      loading.value = true;
      getStockItem(id)
        .then((response) => {
          stockModel.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const btnSaveClick = () => {
      loading.value = true;
      // if (!validate()) return;
      if (stockId) {
        updateStock(stockId, stockModel.value)
          .then((response) => {
            success(response.data);
          })
          .finally(() => {
            loading.value = false;
          });
        return;
      }
      createStock(stockModel.value)
        .then((response) => {
          success(response.data);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    if (stockId) {
      getStock(stockId);
    }
    const btnGoBackList = () => {
      router.push({ name: "stock-list" });
    };

    const refName = ref("");
    const refPrice = ref("");
    const refUnit = ref("");
    const refValueAddedTax = ref("");
    const validate = () => {
      refName.value.validate();
      refPrice.value.validate();
      refUnit.value.validate();
      refValueAddedTax.value.validate();
      if (
        refName.value.hasError ||
        refPrice.value.hasError ||
        refUnit.value.hasError ||
        refValueAddedTax.value.hasError
      )
        return false;
      return true;
    };
    return {
      stockModel,
      taxValueOptions,
      unitOptions,
      rulesPrice,
      rulesName,
      rulesValueAddedTax,
      rulesUnit,
      btnSaveClick,
      btnGoBackList,
      refName,
      refPrice,
      refUnit,
      refValueAddedTax,
      loading,
      priceWithTax,
    };
  },
});
</script>
<style scoped>
.number-format {
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  height: 100%;
}
.number-format:focus {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.24) !important;
  outline: thick;
}

.number-format:focus-visible {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: 2px solid #1976d2 !important;
  outline: none;
}
.number-format-dark {
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid rgb(133, 133, 133);
  height: 100%;
  background-color: transparent;
  color: #fff;
}
.number-format-dark:focus-visible {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: 2px solid #1976d2 !important;
  outline: none;
  background-color: transparent;
  color: #fff;
}
</style>
