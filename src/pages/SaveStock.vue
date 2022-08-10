<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="stockModel.name"
                    label="Stok Adı"
                    :rules="[rulesName]"
                    ref="refName"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="stockModel.price"
                    label="Fiyat"
                    :rules="[rulesPrice]"
                    ref="refPrice"
                    filled
                    fill-mask="0"
                    reverse-fill-mask
                    mask="#.##"
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
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
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
import { TaxValueAdded, Unit } from "src/util/constants";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import { createStock, getStockItem, updateStock } from "src/api/stock.api";
import {
  rulesPrice,
  rulesName,
  rulesValueAddedTax,
  rulesUnit,
} from "src/validations/Stock/stock.rules";
import { success } from "src/util/notify";
const taxValueOptions = [
  { label: "%18", value: TaxValueAdded.OnSekiz },
  { label: "%8", value: TaxValueAdded.Sekiz },
  { label: "%1", value: TaxValueAdded.Bir },
  { label: "%0", value: TaxValueAdded.Sifir },
];
const unitOptions = [
  { label: "Adet", value: Unit.Piece },
  { label: "KG", value: Unit.Kilogram },
  { label: "Metre", value: Unit.Metre },
];
export default defineComponent({
  setup() {
    const route = useRoute();
    let stockId = route.params.id;

    let stockModel = ref({});
    let loading = ref(false);

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
      refName,
      refPrice,
      refUnit,
      refValueAddedTax,
      loading,
    };
  },
});
</script>
