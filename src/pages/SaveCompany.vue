<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section>
            <div>Firma Kaydet</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.title"
                    label="Ad Soyad/Unvan"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.tcknVkn"
                    label="TCKN/VKN"
                    mask="###########"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.taxOffice"
                    label="Vergi Dairesi"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    v-model="companyModel.type"
                    :options="companyTypeOptions"
                    label="Tip"
                    clear-icon="close"
                    dense
                    emit-value
                    map-options
                  ></q-select>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="companyModel.province" label="İl" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="companyModel.district" label="İlçe" />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.mobilePhone"
                    label="Cep Telefonu"
                    mask="(####) ### - ####"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.faxNumber"
                    label="Fax Numarası"
                    mask="(####) ### - ####"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.eMailAdress"
                    label="E-Posta"
                    type="email"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="companyModel.country" label="Ülke" />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.apartmentNumber"
                    label="Bina No"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.flatNumber"
                    label="Daire No"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.adress"
                    label="Adres"
                    autogrow
                  />
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
import {
  createCompany,
  getCompanyItem,
  updateCompany,
} from "src/api/company.api";
import { CompanyType } from "src/util/constants";
import { success } from "src/util/notify";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

const companyTypeOptions = [
  { label: "Şahıs", value: CompanyType.Person },
  { label: "Tüzel", value: CompanyType.Corporate },
];
export default defineComponent({
  setup() {
    const route = useRoute();
    let companyId = route.params.id;

    let companyModel = ref({});
    let loading = ref(false);

    const getCompany = (id) => {
      loading.value = true;
      getCompanyItem(id)
        .then((response) => {
          companyModel.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const btnSaveClick = () => {
      loading.value = true;
      // if (!validate()) return;
      if (companyId) {
        updateCompany(companyId, companyModel.value)
          .then((response) => {
            success(response.data);
          })
          .finally(() => {
            loading.value = false;
          });
        return;
      }
      createCompany(companyModel.value)
        .then((response) => {
          success(response.data);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    if (companyId) {
      getCompany(companyId);
    }
    return {
      companyModel,
      companyTypeOptions,
      btnSaveClick,
      loading,
    };
  },
});
</script>
