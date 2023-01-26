<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section>
            <q-bar dark class="bg-primary text-white">
              <div class="col text-weight-bold">Firma Bilgileri</div>
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
                    disable
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
                    disable
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
                    disable
                    mask="###########"
                  />
                </q-item-section>
                <q-item-section v-show="isCorporate">
                  <q-input
                    dense
                    disable
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
                  <q-input
                    dense
                    v-model="companyModel.firstName"
                    label="Ad"
                    disable
                  />
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
                    disable
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
                    disable
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.province"
                    label="İl"
                    disable
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.district"
                    label="İlçe"
                    disable
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.mobilePhone"
                    label="Cep Telefonu"
                    mask="(####) ### - ####"
                    disable
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.faxNumber"
                    label="Fax Numarası"
                    mask="(####) ### - ####"
                    disable
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
                    disable
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.apartmentNumber"
                    label="Bina No"
                    disable
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.flatNumber"
                    label="Daire No"
                    disable
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
                    disable
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
                    disable
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
                    disable
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="companyModel.country"
                    label="Ülke"
                    disable
                  />
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
              @click="btnHomeClick"
              :loading="loading"
              >Anasayfa</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { getCompanyItem } from "src/api/company.api";
import { CompanyType } from "src/util/constants";
import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const companyTypeOptions = [
  { label: "Bireysel", value: CompanyType.Person },
  { label: "Tüzel", value: CompanyType.Corporate },
  { label: "Şahıs Şirketi", value: CompanyType.PrivateCompany },
];
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    let companyId = store.getters["user/getCompanyId"];

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
    const btnHomeClick = () => {
      router.push("/");
    };
    const btnGoBackList = () => {
      router.push({ name: "customer-list" });
    };

    getCompany(companyId);

    return {
      companyModel,
      companyTypeOptions,
      btnHomeClick,
      loading,
      isCorporate,
      isPerson,
      loadingCompanyTitle,
      btnGoBackList,
      currentUserIsAdmin,
    };
  },
});
</script>
