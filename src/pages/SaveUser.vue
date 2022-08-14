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
                    dense
                    v-model="userModel.roles"
                    use-input
                    use-chips
                    input-debounce="0"
                    :options="roleList"
                    class="q-mb-sm q-mr-sm"
                    multiple
                    emit-value
                    map-options
                    label="Rol"
                  >
                    <template v-if="userModel.roles" v-slot:append>
                      <q-icon
                        name="cancel"
                        @click.stop="userModel.roles = []"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-select>
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
import { getRoles } from "src/api/role.api";
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

    let userModel = ref({
      firstName: "test",
      lastName: "test",
      email: "a@a.com",
      phone: "05324992232",
      password: "1",
      serviceUserName: "test",
      servicePassword: "1",
      userType: 1,
      commercialRegistrationNumber: "123",
      centralRegistrationNumber: "123",
      province: "Ankara",
      district: "Çankaya",
      apartmentNumber: "123",
      flatNumber: "123",
      country: "Türkiye",
      // roles: [
      //   {
      //     value: "c4b10318-d550-4f66-ae69-1097b7d9aa6a",
      //     label: "Accountant",
      //   },
      //   {
      //     value: "c8d61d2d-d08d-4d54-9d36-4dc9e50662c3",
      //     label: "Admin",
      //   },
      //   {
      //     value: "644bace0-ccfb-42e5-b221-66b0725bf8f1",
      //     label: "TaxPayer",
      //   },
      // ],
    });
    let loading = ref(false);
    let roleList = ref([]);

    const getRoleList = () => {
      if (roleList.value.length > 0) return;
      getRoles().then((response) => {
        roleList.value = response.data.map((role) => {
          return {
            label: role.label,
            value: role.value,
          };
        });
      });
    };
    const getUser = (id) => {
      loading.value = true;
      getUserItem(id)
        .then((response) => {
          userModel.value = response.data;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const btnSaveClick = () => {
      loading.value = true;
      console.warn("kullanıcı model====", userModel.value);

      // if (!validate()) return;
      if (userId) {
        userModel.value.roles = userModel.value.roles.map((role) => role.value);
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
    if (userId) {
      getUser(userId);
    }
    getRoleList();
    return {
      userTypeOptions,
      userModel,
      loading,
      roleList,
      btnSaveClick,
      btnGoBackList,
    };
  },
});
</script>
