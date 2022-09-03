<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section>
            <q-bar dark class="bg-primary text-white">
              <div class="col text-weight-bold">Firma Kaydet</div>
            </q-bar>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
              <q-item
                class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                v-show="!isPerson"
              >
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.vergiNo"
                    label="Vergi No"
                    mask="##########"
                    @blur="getTitle"
                    :loading="loadingCompanyTitle"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section v-show="!isCorporate">
                  <q-input
                    dense
                    v-model="companyModel.tcKimlikNo"
                    label="T.C. Kimlik No"
                    mask="###########"
                  />
                </q-item-section>
                <q-item-section v-show="isCorporate">
                  <q-input
                    dense
                    v-model="companyModel.title"
                    label="Firma Resmi Adı"
                  />
                </q-item-section>
              </q-item>
              <q-item
                class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                v-show="!isCorporate"
              >
                <q-item-section>
                  <q-input dense v-model="companyModel.firstName" label="Ad" />
                </q-item-section>
              </q-item>

              <q-item
                class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                v-show="!isCorporate"
              >
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.lastName"
                    label="Soyad"
                  />
                </q-item-section>
              </q-item>

              <q-item
                class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                v-show="!isPerson"
              >
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
                  <q-input dense v-model="companyModel.province" label="İl" />
                </q-item-section>
                <q-item-section>
                  <q-input dense v-model="companyModel.district" label="İlçe" />
                </q-item-section>
              </q-item>
              <!-- <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="companyModel.district" label="İlçe" />
                </q-item-section>
              </q-item> -->

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.mobilePhone"
                    label="Cep Telefonu"
                    mask="(####) ### - ####"
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.faxNumber"
                    label="Fax Numarası"
                    mask="(####) ### - ####"
                  />
                </q-item-section>
              </q-item>
              <!-- <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.faxNumber"
                    label="Fax Numarası"
                    mask="(####) ### - ####"
                  />
                </q-item-section>
              </q-item> -->
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
              <q-item
                class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                v-show="currentUserIsAdmin"
              >
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    clear-icon="close"
                    v-model="companyModel.serviceUserName"
                    label="Servis Kullanıcı Adı"
                  />
                </q-item-section>
              </q-item>
              <q-item
                class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                v-show="currentUserIsAdmin"
              >
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    clear-icon="close"
                    v-model="companyModel.servicePassword"
                    label="Servis Kullanıcı Parolası"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    clear-icon="close"
                    v-model="companyModel.commercialRegistrationNumber"
                    label="Ticari Sicil No"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    clear-icon="close"
                    v-model="companyModel.centralRegistrationNumber"
                    label="MERSİS No"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.adress"
                    label="Adres"
                    autogrow
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense v-model="companyModel.country" label="Ülke" />
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
import {
  createCompany,
  getCompanyItem,
  getCompanyTitle,
  updateCompany,
} from "src/api/company.api";
import { CompanyType } from "src/util/constants";
import { success } from "src/util/notify";
import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const companyTypeOptions = [
  { label: "Bireysel", value: CompanyType.Person },
  { label: "Tüzel", value: CompanyType.Corporate },
  { label: "Şahıs Şirketi", value: CompanyType.SoleProprietorship },
];
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    let companyId = route.params.id;

    let companyModel = ref({ type: CompanyType.Person });
    let loading = ref(false);
    let loadingCompanyTitle = ref(false);
    let isCorporate = computed(() => {
      return companyModel.value.type === CompanyType.Corporate;
    });
    let isPerson = computed(
      () => companyModel.value.type === CompanyType.Person
    );

    let currentUserIsAdmin = computed(() => store.getters["user/userIsAdmin"]);
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
    const getTitle = () => {
      if (
        !companyModel.value.vergiNo ||
        companyModel.value.type !== CompanyType.Corporate
      )
        return;
      loadingCompanyTitle.value = true;
      getCompanyTitle(companyModel.value.vergiNo)
        .then((response) => {
          companyModel.value.title = response.data;
        })
        .finally(() => {
          loadingCompanyTitle.value = false;
        });
    };
    const btnGoBackList = () => {
      if (currentUserIsAdmin) router.push({ name: "company-list" });
      else router.push({ name: "customer-list" });
    };
    if (companyId) {
      getCompany(companyId);
    }
    return {
      companyModel,
      companyTypeOptions,
      btnSaveClick,
      loading,
      isCorporate,
      isPerson,
      getTitle,
      loadingCompanyTitle,
      btnGoBackList,
      currentUserIsAdmin,
    };
  },
});
</script>
