<template>
  <q-table
    :rows="companyList"
    :columns="columns"
    class="grid-height"
    :loading="loading"
    row-key="id"
    :wrap-cells="true"
    v-model:pagination="pagination"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="company" :props="props" class="text-center">
          <q-card class="my-card" :class="{ 'bg-orange': props.row.selected }">
            <q-card-section>
              <div class="row text-justify q-gutter-y-xs">
                <div class="col-xs-12 col-sm-6">
                  Ad Soyad / Unvan:
                  <span class="text-weight-bold">
                    {{ getTitle(props.row) }}
                  </span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  Tip:<span class="text-weight-bold">
                    {{ props.row.typeDescription }}</span
                  >
                </div>
                <div class="col-xs-12 col-sm-6">
                  Cep Telefonu:
                  <span class="text-weight-bold">{{
                    props.row.mobilePhone
                  }}</span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  Fax Telefonu:
                  <span class="text-weight-bold">{{
                    props.row.faxNumber
                  }}</span>
                </div>

                <div class="col-xs-12 col-sm-6">
                  E-Posta:
                  <span class="text-weight-bold">{{
                    props.row.eMailAdress
                  }}</span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  T.C. Kimlik No:
                  <span class="text-weight-bold">{{
                    props.row.tcKimlikNo
                  }}</span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Vergi No:
                  <span class="text-weight-bold">{{ props.row.vergiNo }}</span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Vergi Dairesi:
                  <span class="text-weight-bold">{{
                    props.row.taxOffice
                  }}</span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  İl / İlçe:
                  <span class="text-weight-bold"
                    >{{ props.row.province }} / {{ props.row.district }}</span
                  >
                </div>
                <div class="col-xs-12 col-sm-6">
                  Bina / Daire No:
                  <span class="text-weight-bold"
                    >{{ props.row.apartmentNumber }} /
                    {{ props.row.flatNumber }}</span
                  >
                </div>

                <div class="col-xs-12 col-sm-6">
                  Ülke:
                  <span class="text-weight-bold">{{ props.row.country }} </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Açık Adres:
                  <span class="text-weight-bold">{{ props.row.adress }} </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Mersis No:
                  <span class="text-weight-bold"
                    >{{ props.row.centralRegistrationNumber }}
                  </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Ticari Sicil No:
                  <span class="text-weight-bold"
                    >{{ props.row.commercialRegistrationNumber }}
                  </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Servis Kullanıcı Adı:
                  <span class="text-weight-bold"
                    >{{ props.row.serviceUserName }}
                  </span>
                </div>
                <div class="col-xs-12 col-sm-6">
                  Servis Kullanıcı Parolası:
                  <span class="text-weight-bold"
                    >{{ props.row.servicePassword }}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <q-btn
                    class="full-width"
                    icon="more_horiz"
                    :dense="$q.screen.lt.md"
                    :loading="props.row.loading"
                    :disable="props.row.loading"
                  >
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
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>
<script>
import { CompanyType } from "src/util/constants";
import { defineComponent, computed, ref } from "vue";
const columns = [
  {
    name: "company",
    required: true,
    label: "Firma",
    align: "left",
    // field: (row) => row.eFaturaNo,
    sortable: false,
  },
];
export default defineComponent({
  props: ["loading", "companyList"],

  setup(props, { emit }) {
    const companyList = computed(() => props.companyList);
    const loading = computed(() => props.loading);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });
    const btnDeleteClick = (company) => {
      emit("company-delete", company);
    };
    const btnUpdateClick = (company) => {
      emit("company-update", company);
    };
    const getTitle = (row) => {
      return row.type === CompanyType.Corporate
        ? row.title
        : `${row.firstName} ${row.lastName}`;
    };
    return {
      columns,
      companyList,
      loading,
      btnDeleteClick,
      btnUpdateClick,
      getTitle,
      pagination,
    };
  },
});
</script>
