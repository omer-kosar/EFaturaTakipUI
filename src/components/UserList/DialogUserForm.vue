<template>
  <q-dialog v-model="dialogState" @before-show="getRoleList">
    <q-card style="width: 700px; max-width: 80vw">
      <q-bar class="bg-primary text-white full-width">
        <div>Kullanıcı</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row q-mt-md">
          <div class="col-3">
            <div>Ad</div>
          </div>
          <div class="col-9">
            <q-input
              square
              outlined
              dense
              clearable
              clear-icon="close"
              v-model="userModel.firstName"
              label="Ad"
              :rules="[rulesFirstName]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-3">
            <div>Soyad</div>
          </div>
          <div class="col-9">
            <q-input
              square
              outlined
              dense
              clearable
              clear-icon="close"
              v-model="userModel.lastName"
              label="Ad"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-3">
            <div>Email</div>
          </div>
          <div class="col-9">
            <q-input
              square
              outlined
              dense
              clearable
              clear-icon="close"
              v-model="userModel.email"
              label="Ad"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-3">
            <div>Telefon</div>
          </div>
          <div class="col-9">
            <q-input
              square
              outlined
              dense
              clearable
              clear-icon="close"
              v-model="userModel.phone"
              label="Ad"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-3">
            <div>Parola</div>
          </div>
          <div class="col-9">
            <q-input
              square
              outlined
              dense
              clearable
              clear-icon="close"
              v-model="userModel.password"
              label="Ad"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-3">
            <div>Servis Kullanici Adi</div>
          </div>
          <div class="col-9">
            <q-input
              square
              outlined
              dense
              clearable
              clear-icon="close"
              v-model="userModel.serviceUserName"
              label="Ad"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-3">
            <div>Servis Kullanici Parola</div>
          </div>
          <div class="col-9">
            <q-input
              square
              outlined
              dense
              clearable
              clear-icon="close"
              v-model="userModel.servicePassword"
              label="Ad"
            />
          </div>
        </div>
        <div class="row q-mt-xs">
          <div class="col-3">
            <div>Rol</div>
          </div>
          <div class="col-9">
            <q-select
              filled
              v-model="userModel.roles"
              use-input
              use-chips
              input-debounce="0"
              :options="roleList"
              class="q-mb-sm q-mr-sm"
              multiple
              emit-value
              map-options
            >
              <template v-if="userModel.roles" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop="userModel.roles = null"
                  class="cursor-pointer"
                />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row q-mt-xs">
          <div class="col-3">
            <div>Tip</div>
          </div>
          <div class="col-9">
            <q-select
              square
              outlined
              v-model="userModel.userType"
              :options="userTypeOptions"
              label="Tip"
              clear-icon="close"
              dense
              emit-value
              map-options
            ></q-select>
          </div>
        </div>
        <div class="row justify-start q-mt-md">
          <div class="col-12">
            <q-btn class="full-width" color="primary" @click="btnSaveClick"
              >Kaydet</q-btn
            >
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>


import { computed, defineComponent, ref } from "vue";
import { getRoles } from "src/api/role.api";
import { createUser } from "src/api/user.api";
import { userType } from "src/util/constants";
import {
  rulesFirstName,
  rulesLastName,
  rulesPhone,
  rulesPassword,
} from "src/validations/user/user.rules";
export default defineComponent({
  props: ["dialogUserForm"],
  setup(props, { emit }) {
    let dialogState = computed({
      get: () => {
        return props.dialogUserForm || false;
      },
      set: () => {
        emit("dialog-user-form-close");
      },
    });

    let userModel = ref({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      serviceUserName: "",
      servicePassword: "",
      userType: userType.taxPayer,
      roles: [],
    });

    let roleList = ref([]);
    let userTypeOptions = [
      { label: "Admin", value: userType.admin },
      { label: "Mükellef", value: userType.taxPayer },
      { label: "Muhasebeci", value: userType.accountant },
    ];
    const btnSaveClick = () => {
      createUser(userModel.value).then((response) => {});
    };
    const getRoleList = () => {
      if (roleList.value.length > 0) return;
      getRoles().then((response) => {
        roleList.value = response.data.map((role) => {
          return {
            label: role.name,
            value: role.id,
          };
        });
      });
    };
    return {
      dialogState,
      btnSaveClick,
      userModel,
      roleList,
      getRoleList,
      userTypeOptions,
      rulesFirstName,
      rulesLastName,
      rulesPassword,
      rulesPhone,
    };
  },
});
</script>
