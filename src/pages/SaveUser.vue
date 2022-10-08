<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white">
          <q-card-section>
            <q-bar dark class="bg-primary text-white">
              <div class="col text-weight-bold">Kullanıcı Kaydet</div>
            </q-bar>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    clear-icon="close"
                    v-model="userModel.firstName"
                    label="Ad"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    clear-icon="close"
                    v-model="userModel.lastName"
                    label="Soyad"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    clear-icon="close"
                    v-model="userModel.email"
                    label="E-Posta"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    unmasked-value
                    clear-icon="close"
                    v-model="userModel.phone"
                    label="Cep Telefonu"
                    mask="(####) ### - ####"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    clearable
                    clear-icon="close"
                    v-model="userModel.password"
                    label="Parola"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    v-model="userModel.userType"
                    :options="userTypeOptions"
                    label="Tip"
                    clear-icon="close"
                    dense
                    emit-value
                    map-options
                  ></q-select>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    v-model="userModel.companyId"
                    :options="companyOptions"
                    label="Firma"
                    clear-icon="close"
                    dense
                    emit-value
                    map-options
                    input-debounce="3"
                    use-input
                    behavior="menu"
                    @pop-show="showTopNCompanyList"
                    @filter="filterCompany"
                    :loading="loadingFilterCompany"
                    option-value="id"
                    option-label="name"
                  ></q-select>
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
import { search } from "src/api/company.api";
import { createUser, getUserItem, updateUser } from "src/api/user.api";
import { userType } from "src/util/constants";
import { success } from "src/util/notify";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const userTypeOptions = [
  { label: "Admin", value: userType.admin },
  { label: "Mükellef", value: userType.taxPayer },
  { label: "Muhasebeci", value: userType.accountant },
];
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    let userId = route.params.id;
    let userModel = ref({});
    // let userModel = ref({
    //   firstName: "test",
    //   lastName: "test",
    //   email: "a@a.com",
    //   phone: "05324992232",
    //   password: "1",
    //   userType: 1,
    // });
    let loading = ref(false);
    let loadingFilterCompany = ref(false);
    let companyOptions = ref([]);
    let filteredCompanyList = [];

    const btnSaveClick = () => {
      // if (!validate()) return;

      loading.value = true;
      if (userId) {
        updateUser(userId, userModel.value)
          .then((response) => {
            success(response.data);
          })
          .finally(() => {
            loading.value = false;
          });
        return;
      }
      createUser(userModel.value)
        .then((response) => {
          success(response.data);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const btnGoBackList = () => {
      router.push({ name: "user-list" });
    };
    const showTopNCompanyList = () => {
      loadingFilterCompany.value = true;
      if (filteredCompanyList.length > 0) return;
      search("")
        .then((response) => {
          filteredCompanyList = response.data;
          companyOptions.value = filteredCompanyList;
        })
        .finally(() => {
          loadingFilterCompany.value = false;
        });
    };

    const filterCompany = (val, update) => {
      loadingFilterCompany.value = true;
      search(val)
        .then((response) => {
          update(() => {
            companyOptions.value = response?.data;
            filteredCompanyList = companyOptions.value;
          });
        })
        .finally(() => {
          loadingFilterCompany.value = false;
        });
    };

    if (userId) {
      loadingFilterCompany.value = true;
      loading.value = true;
      Promise.all([search(""), getUserItem(userId)])
        .then((responses) => {
          filteredCompanyList = responses[0].data;
          companyOptions.value = filteredCompanyList;
          userModel.value = responses[1].data;
        })
        .finally(() => {
          loadingFilterCompany.value = false;
          loading.value = false;
        });
    } else {
      showTopNCompanyList();
    }
    return {
      userTypeOptions,
      userModel,
      loading,
      loadingFilterCompany,
      btnSaveClick,
      btnGoBackList,
      companyOptions,
      showTopNCompanyList,
      filterCompany,
    };
  },
});
</script>
