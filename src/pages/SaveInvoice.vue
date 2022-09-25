<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg">
          <q-card-section>
            <q-bar dark class="bg-primary text-white">
              <div class="col text-weight-bold">Fatura Kaydet</div>
            </q-bar>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-expansion-item
              v-model="expanded"
              icon="add_business"
              label="Fatura Bilgileri"
            >
              <q-list class="row">
                <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                      label="Cari"
                      v-model="invoice.customerId"
                      :options="customerOptions"
                      clear-icon="close"
                      dense
                      emit-value
                      map-options
                      input-debounce="3"
                      use-input
                      behavior="menu"
                      @filter="filterCustomer"
                      :loading="loadingFilterCustomer"
                      option-value="id"
                      option-label="name"
                    ></q-select>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      square
                      dense
                      label="Düzenleme Tarihi"
                      v-model="invoice.date"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              today-btn
                              v-model="invoice.date"
                              mask="DD.MM.YYYY"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Kapat"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dense
                      v-model="invoice.comment"
                      label="Açıklama"
                    ></q-input>
                  </q-item-section>
                </q-item> </q-list
            ></q-expansion-item>
            <div class="row">
              <div class="col-12">
                <q-table
                  :rows="invoice.invoiceItems"
                  :columns="columns"
                  hide-pagination
                  pagination="0"
                  :rows-per-page-options="[0]"
                  v-if="$q.screen.gt.sm"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="stock">
                        <q-select
                          v-model="props.row.stockId"
                          :options="stockOptions"
                          clear-icon="close"
                          dense
                          emit-value
                          map-options
                          input-debounce="3"
                          use-input
                          behavior="menu"
                          @filter="filterStock"
                          :loading="loadingFilterStock"
                          @update:model-value="
                            stockChanged(props.row, props.rowIndex)
                          "
                          option-value="id"
                          option-label="name"
                        ></q-select>
                      </q-td>
                      <q-td key="quantity" :props="props">
                        <q-input
                          @blur="onBlurQuantity(props.row)"
                          dense
                          v-model="props.row.quantity"
                        ></q-input>
                      </q-td>

                      <q-td key="price" :props="props">
                        <VueNumberFormat
                          :class="{
                            'number-format-dark': $q.dark.isActive,
                            'number-format': !$q.dark.isActive,
                          }"
                          v-model:value="props.row.price"
                          :options="currencyOptions"
                          @blur="onBlurPrice(props.row)"
                        >
                        </VueNumberFormat>
                      </q-td>
                      <q-td key="priceWithTax">
                        <VueNumberFormat
                          :class="{
                            'number-format-dark': $q.dark.isActive,
                            'number-format': !$q.dark.isActive,
                          }"
                          v-model:value="props.row.priceWithTax"
                          :options="currencyOptions"
                          @blur="onBlurPriceWithTax(props.row)"
                        >
                        </VueNumberFormat>
                      </q-td>
                      <q-td>
                        <q-select
                          v-model="props.row.tax"
                          :options="taxValueOptions"
                          label="KDV"
                          clear-icon="close"
                          dense
                          emit-value
                          map-options
                          class="full-width"
                          @update:model-value="taxChanged(props.row)"
                        ></q-select>
                      </q-td>
                      <q-td key="totalPrice" :props="props">
                        <VueNumberFormat
                          :class="{
                            'number-format-dark': $q.dark.isActive,
                            'number-format': !$q.dark.isActive,
                          }"
                          v-model:value="props.row.totalPrice"
                          :options="currencyOptions"
                          @blur="onBlurTotalPrice(props.row)"
                        >
                        </VueNumberFormat>
                      </q-td>
                      <q-td key="totalPriceWithTax">
                        <VueNumberFormat
                          :class="{
                            'number-format-dark': $q.dark.isActive,
                            'number-format': !$q.dark.isActive,
                          }"
                          v-model:value="props.row.totalPriceWithTax"
                          :options="currencyOptions"
                          @blur="onBlurTotalPriceWithTax(props.row)"
                        >
                        </VueNumberFormat>
                      </q-td>
                      <q-td key="comment">
                        <q-input dense v-model="props.row.comment"></q-input>
                      </q-td>
                      <q-td>
                        <q-btn
                          icon="delete"
                          color="red"
                          @click="removeItem(props.rowIndex)"
                        ></q-btn>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
                <q-table
                  v-else
                  :rows="invoice.invoiceItems"
                  :columns="columnsMobile"
                  hide-pagination
                  pagination="0"
                  :rows-per-page-options="[0]"
                  :wrap-cells="true"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="stock">
                        <q-card>
                          <q-card-section>
                            <div class="row text-justify q-gutter-y-xs">
                              <div class="col-xs-12 col-sm-6">
                                <q-select
                                  label="Ürün/Hizmet"
                                  v-model="props.row.stockId"
                                  :options="stockOptions"
                                  clear-icon="close"
                                  dense
                                  emit-value
                                  map-options
                                  input-debounce="3"
                                  use-input
                                  behavior="dialog"
                                  @filter="filterStock"
                                  :loading="loadingFilterStock"
                                  @update:model-value="
                                    stockChanged(props.row, props.rowIndex)
                                  "
                                  option-value="id"
                                  option-label="name"
                                ></q-select>
                              </div>
                              <div class="col-xs-12 col-sm-6">
                                <q-input
                                  label="Miktar"
                                  @blur="onBlurQuantity(props.row)"
                                  dense
                                  v-model="props.row.quantity"
                                ></q-input>
                              </div>
                              <div class="col-xs-12 col-sm-6">
                                <VueNumberFormat
                                  :class="{
                                    'number-format-dark': $q.dark.isActive,
                                    'number-format': !$q.dark.isActive,
                                  }"
                                  v-model:value="props.row.price"
                                  :options="currencyOptions"
                                  @blur="onBlurPrice(props.row)"
                                >
                                </VueNumberFormat>
                              </div>
                              <div class="col-xs-12 col-sm-6">
                                <VueNumberFormat
                                  :class="{
                                    'number-format-dark': $q.dark.isActive,
                                    'number-format': !$q.dark.isActive,
                                  }"
                                  v-model:value="props.row.priceWithTax"
                                  :options="currencyOptions"
                                  @blur="onBlurPriceWithTax(props.row)"
                                >
                                </VueNumberFormat>
                              </div>
                              <div class="col-xs-12 col-sm-6">
                                <q-select
                                  v-model="props.row.tax"
                                  :options="taxValueOptions"
                                  label="KDV"
                                  clear-icon="close"
                                  dense
                                  emit-value
                                  map-options
                                  class="full-width"
                                  @update:model-value="taxChanged(props.row)"
                                ></q-select>
                              </div>
                              <div class="col-xs-12 col-sm-6">
                                <VueNumberFormat
                                  :class="{
                                    'number-format-dark': $q.dark.isActive,
                                    'number-format': !$q.dark.isActive,
                                  }"
                                  v-model:value="props.row.totalPrice"
                                  :options="currencyOptions"
                                  @blur="onBlurTotalPrice(props.row)"
                                >
                                </VueNumberFormat>
                              </div>
                              <div class="col-xs-12 col-sm-6">
                                <VueNumberFormat
                                  :class="{
                                    'number-format-dark': $q.dark.isActive,
                                    'number-format': !$q.dark.isActive,
                                  }"
                                  v-model:value="props.row.totalPriceWithTax"
                                  :options="currencyOptions"
                                  @blur="onBlurTotalPriceWithTax(props.row)"
                                >
                                </VueNumberFormat>
                              </div>
                              <div class="col-xs-12 col-sm-6">
                                <q-input
                                  label="Açıklama"
                                  dense
                                  v-model="props.row.comment"
                                ></q-input>
                              </div>
                              <div class="col-xs-12 col-sm-12">
                                <q-btn
                                  class="full-width"
                                  icon="delete"
                                  color="red"
                                  @click="removeItem(props.rowIndex)"
                                ></q-btn>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-gutter-y-xs">
            <div class="row justify-end">
              <div class="col-xs-6 col-md-3">
                <q-separator></q-separator>
                ARA TOPLAM
              </div>
              <div class="col-xs-6 col-md-3">
                <q-separator></q-separator>
                {{ totalPriceWithoutTax }}
              </div>
            </div>
            <div class="row justify-end">
              <div class="col-xs-6 col-md-3">
                <q-separator></q-separator>
                TOPLAM KDV
              </div>
              <div class="col-xs-6 col-md-3">
                <q-separator></q-separator>
                {{ totalTax }}
              </div>
            </div>

            <div class="row text-weight-bold justify-end">
              <div class="col-xs-6 col-md-3">
                <q-separator></q-separator>
                GENEL TOPLAM
              </div>
              <div class="col-xs-6 col-md-3">
                <q-separator></q-separator>
                {{ totalPrice }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-page-sticky
      :position="$q.screen.gt.md ? 'bottom-left' : 'bottom-right'"
      :offset="[20, 20]"
    >
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action
          @click="addNewInvoiceItem"
          color="primary"
          label="Yeni Satır"
          hide-icon
        />
        <q-fab-action
          @click="saveInvoice"
          color="primary"
          label="Kaydet"
          hide-icon
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>
<script>
import { date } from "quasar";
import { searchCustomer } from "src/api/company.api";
import { createInvoice } from "src/api/invoice.api";
import { search } from "src/api/stock.api";
import { currencyOptions, taxValueOptions } from "src/util/constants";
import {
  convertDecimal,
  formatDate,
  formatMoney,
} from "src/util/helper-methods";
import { success, warning } from "src/util/notify";
import { defineComponent, ref, computed } from "vue";
import VueNumberFormat from "vue-number-format";
import { useQuasar } from "quasar";
const columns = [
  {
    name: "stock",
    required: true,
    label: "Ürün/Hizmet",
    align: "left",
    sortable: false,
  },
  {
    name: "quantity",
    required: true,
    label: "Miktar",
    align: "left",
    sortable: false,
  },

  {
    name: "price",
    required: true,
    label: "Satış Br. Fiyat",
    align: "left",
    sortable: false,
  },
  {
    name: "priceWithTax",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },

  {
    name: "tax",
    required: true,
    label: "Vergi",
    align: "left",
    sortable: false,
  },

  {
    name: "totalPrice",
    required: true,
    label: "Toplam",
    align: "left",
    sortable: false,
  },
  {
    name: "totalPriceWithTax",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },
  {
    name: "comment",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },

  {
    name: "actions",
    required: true,
    label: "",
    align: "left",
    sortable: false,
  },
];
const columnsMobile = [
  {
    name: "stock",
    required: true,
    label: "Ürün/Hizmet",
    align: "left",
    sortable: false,
  },
];
export default defineComponent({
  components: { VueNumberFormat },
  setup() {
    const $q = useQuasar();
    let invoice = ref({
      customerId: "",
      date: date.formatDate(new Date(), "DD.MM.YYYY"),
      comment: "",
      invoiceItems: [
        {
          stockId: "",
          quantity: 1,
          price: 0,
          priceWithTax: 0,
          tax: 0,
          totalPrice: 0,
          totalPriceWithTax: 0,
          comment: "",
        },
      ],
    });

    let stockOptions = ref([]);
    let customerOptions = ref([]);
    let filteredStockList = [];
    let filteredCustomerList = [];
    let loadingFilterStock = ref(false);
    let loadingFilterCustomer = ref(false);

    const totalPriceWithoutTax = computed(() => {
      const summary = invoice.value.invoiceItems.reduce((total, invoice) => {
        return total + invoice.price * invoice.quantity;
      }, 0);
      return formatMoney(summary);
    });

    const totalPrice = computed(() => {
      const summary = invoice.value.invoiceItems.reduce((total, invoice) => {
        return total + invoice.totalPriceWithTax;
      }, 0);
      return formatMoney(summary);
    });
    const totalTax = computed(() => {
      let price = convertDecimal(totalPrice.value.replace("₺", ""));
      let priceWithoutTax = convertDecimal(
        totalPriceWithoutTax.value.replace("₺", "")
      );
      return formatMoney(price - priceWithoutTax);
    });
    const showTopNStockList = () => {
      loadingFilterStock.value = true;
      if (filteredStockList.length > 0) return;
      search("")
        .then((response) => {
          filteredStockList = response.data;
          stockOptions.value = filteredStockList;
        })
        .finally(() => {
          loadingFilterStock.value = false;
        });
    };

    const showTopNCustomerList = () => {
      loadingFilterCustomer.value = true;
      if (filteredCustomerList.length > 0) return;
      searchCustomer("")
        .then((response) => {
          filteredCustomerList = response.data;
          customerOptions.value = filteredCustomerList;
        })
        .finally(() => {
          loadingFilterCustomer.value = false;
        });
    };

    const filterStock = (val, update) => {
      loadingFilterStock.value = true;
      search(val)
        .then((response) => {
          update(() => {
            stockOptions.value = response?.data;
            filteredStockList = stockOptions.value;
          });
        })
        .finally(() => {
          loadingFilterStock.value = false;
        });
    };

    const filterCustomer = (val, update) => {
      loadingFilterCustomer.value = true;
      searchCustomer(val)
        .then((response) => {
          update(() => {
            customerOptions.value = response?.data;
            filteredCustomerList = customerOptions.value;
          });
        })
        .finally(() => {
          loadingFilterCustomer.value = false;
        });
    };

    const onBlurPrice = (row) => {
      countPrice(row);
    };
    const onBlurTotalPrice = (row) => {
      row.price = row.totalPrice / row.quantity;
      countPrice(row);
    };
    const onBlurPriceWithTax = (row) => {
      row.price = countPriceWithoutTax(row.priceWithTax, row.tax);
      countPrice(row);
    };
    const onBlurTotalPriceWithTax = (row) => {
      let totalPriceWithoutTax = countPriceWithoutTax(
        row.totalPriceWithTax,
        row.tax
      );
      row.price = totalPriceWithoutTax / row.quantity;
      countPrice(row);
    };
    const onBlurQuantity = (row) => {
      row.totalPrice = row.quantity * row.price;
      row.totalPriceWithTax = row.priceWithTax * row.quantity;
    };
    const stockChanged = (row, rowIndex) => {
      let selectedStock = getStockItemById(row.stockId);
      if (!selectedStock) {
        clearRow(row);
        return;
      }
      row.tax = selectedStock.tax;
      row.price = selectedStock.price;
      countPrice(row);
      if (rowIndex == invoice.value.invoiceItems.length - 1) {
        addNewInvoiceItem();
      }
    };
    const taxChanged = (row) => {
      countPrice(row);
    };
    const countPrice = (row) => {
      row.priceWithTax = countPriceWithTax(row.price, row.tax);
      row.totalPrice = row.price * row.quantity;
      row.totalPriceWithTax = row.priceWithTax * row.quantity;
    };
    const getStockItemById = (id) => {
      let stockItem = stockOptions.value.find((stock) => stock.id === id);
      return stockItem;
    };
    const countPriceWithTax = (price, tax) => {
      let priceWithTax = price * (1 + tax / 100);
      return convertDecimal(priceWithTax);
    };
    const countPriceWithoutTax = (priceWithTax, tax) => {
      let priceWithoutTax = priceWithTax / (1 + tax / 100);
      return convertDecimal(priceWithoutTax);
    };
    const removeItem = (index) => {
      invoice.value.invoiceItems.splice(index, 1);
    };
    const addNewInvoiceItem = () => {
      let invoiceItem = {
        stockId: "",
        quantity: 1,
        price: 0,
        priceWithTax: 0,
        tax: 0,
        totalPrice: 0,
        totalPriceWithTax: 0,
        comment: "",
      };
      invoice.value.invoiceItems.push(invoiceItem);
    };
    const clearRow = (row) => {
      row.quantity = 1;
      row.price = 0;
      row.priceWithTax = 0;
      row.tax = 0;
      row.totalPrice = 0;
      row.totalPriceWithTax = 0;
      row.comment = "";
    };
    const saveInvoice = () => {
      // $q.loading.show();
      let validationResult = validateInvoice();
      if (!validationResult) return;
      invoice.value.invoiceItems = invoice.value.invoiceItems.filter(
        (invoiceItem) => invoiceItem.stockId
      );
      invoice.value.date = formatDate(invoice.value.date);
      createInvoice(invoice.value)
        .then((response) => {
          success(response.data);
        })
        .finally(() => {
          // $q.loading.hide();
        });
    };
    const validateInvoice = () => {
      let isValid = true;
      if (!invoice.value.customerId) {
        warning("Cari seçiniz.");
        isValid = false;
      }

      if (!invoice.value.date) {
        warning("Tarih seçiniz.");
        isValid = false;
      }
      let isStockExist = invoice.value.invoiceItems.some(
        (invoiceItem) => invoiceItem.stockId
      );
      if (!isStockExist) {
        warning("En az bir tane ürün/hizmet seçiniz.");
        isValid = false;
      }
      return isValid;
    };
    showTopNStockList();
    showTopNCustomerList();
    currencyOptions.precision = 4;
    return {
      columns,
      columnsMobile,
      invoice,
      currencyOptions,
      onBlurPrice,
      onBlurTotalPrice,
      onBlurQuantity,
      onBlurPriceWithTax,
      onBlurTotalPriceWithTax,
      taxValueOptions,
      stockOptions,
      customerOptions,
      filteredStockList,
      filteredCustomerList,
      filterStock,
      filterCustomer,
      stockChanged,
      taxChanged,
      removeItem,
      addNewInvoiceItem,
      totalPriceWithoutTax,
      totalTax,
      totalPrice,
      expanded: ref(true),
      saveInvoice,
      loadingFilterStock,
      loadingFilterCustomer,
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
  height: 40px;
  width: 100%;
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
  height: 40px;
  width: 100%;
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
