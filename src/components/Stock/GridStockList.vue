<template>
  <q-table
    :rows="stockList"
    :columns="columns"
    row-key="name"
    wrap-cells="true"
    :loading="loading"
    class="grid-height"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="stockName" :props="props">
          <b>{{ props.row.name }}</b>
        </q-td>

        <q-td key="price" :props="props">
          <b>{{ props.row.price }}</b>
        </q-td>

        <q-td key="unit" :props="props">
          <b>{{ props.row.unitDescription }}</b>
        </q-td>

        <q-td key="valueAddedTax" :props="props">
          <b>{{ props.row.valueAddedTax }}</b>
        </q-td>

        <q-td key="buttons" :props="props">
          <q-btn icon="more_horiz" :dense="$q.screen.lt.md">
            <q-menu>
              <q-list style="min-width: 120px">
                <q-item
                  clickable
                  v-close-popup
                  @click="btnUpdateClick(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="edit"></q-icon>
                  </q-item-section>
                  <q-item-section>Güncelle</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  v-close-popup
                  @click="btnDeleteClick(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon name="delete"></q-icon>
                  </q-item-section>
                  <q-item-section>Sil</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { defineComponent, computed } from "vue";

const columns = [
  {
    name: "stockName",
    required: true,
    label: "Ad",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },

  {
    name: "price",
    required: true,
    label: "Fiyat",
    align: "left",
    field: (row) => row.price,
    sortable: true,
  },

  {
    name: "unit",
    required: true,
    label: "Birim",
    align: "left",
    field: (row) => row.unit,
    sortable: true,
  },

  {
    name: "valueAddedTax",
    required: true,
    label: "KDV",
    align: "left",
    field: (row) => row.valueAddedTax,
    sortable: true,
  },
  {
    name: "buttons",
    label: "",
    align: "left",
  },
];
export default defineComponent({
  props: ["loading", "stockList"],
  setup(props, { emit }) {
    const stockList = computed(() => props.stockList);
    const loading = computed(() => props.loading);
    const btnDeleteClick = (stock) => {
      emit("stock-delete", stock);
    };
    const btnUpdateClick = (stock) => {
      console.warn();
      emit("stock-update", stock);
    };
    return {
      stockList,
      loading,
      columns,
      btnDeleteClick,
      btnUpdateClick,
    };
  },
});
</script>
