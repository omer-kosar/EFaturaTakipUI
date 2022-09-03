<template>
  <q-page>
    <div class="q-pa-sm">
      <div class="row q-col-gutter-sm">
        <div class="col-lg-12 col-md-8 col-xs-12 col-sm-12">
          <q-card class="card-bg text-white">
            <q-card-section>
              <q-bar dark class="bg-primary text-white">
                <div class="col text-weight-bold">Şifre Değiştir</div>
              </q-bar>
            </q-card-section>
            <q-card-section class="q-pa-sm">
              <q-list class="row">
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dense
                      v-model="passwordModel.currentPassword"
                      label="Mevcut Şifre"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dense
                      v-model="passwordModel.newPassword"
                      label="Yeni Şifre"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dense
                      v-model="passwordModel.newPasswordAgain"
                      label="Yeni Şifre Tekrar"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                class="text-capitalize bg-info text-white q-mr-md"
                @click="btnChangeClick"
                :loading="loading"
                >Kaydet</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { changeUserPassword } from "src/api/user.api";
import { removeItemFromStorage } from "src/util/local-storage";
import { success } from "src/util/notify";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    let passwordModel = ref({});
    let loading = ref(false);
    const btnChangeClick = () => {
      loading.value = true;
      passwordModel.value.id = store.getters["user/getUserId"];
      changeUserPassword(passwordModel.value)
        .then((response) => {
          success(response.data);
          logOut();
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const logOut = () => {
      removeItemFromStorage("user");
      router.push("/login");
    };
    return {
      passwordModel,
      btnChangeClick,
      loading,
    };
  },
});
</script>
