<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Kullanıcı Girişi</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="loginModel.phoneNumber"
                label="Telefon"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Telefon numarası  boş olamaz',
                ]"
                ref="refPhone"
              />
              <q-input
                filled
                v-model="loginModel.password"
                label="Şifre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Şifre boş olamaz',
                ]"
                :type="isPwd ? 'password' : 'text'"
                ref="refPassword"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <div class="row justify-end">
                <q-btn
                  label="Giriş"
                  type="button"
                  color="primary"
                  @click="btnLogin"
                  :loading="loading"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { login } from "src/api/authentication.api";
import { saveItemToStorage } from "src/util/local-storage";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    const refPhone = ref("");
    const refPassword = ref("");
    let isPwd = ref(true);
    let loading = ref(false);
    const loginModel = ref({
      phoneNumber: "",
      password: "",
    });
    const btnLogin = () => {
      refPhone.value.validate();
      refPassword.value.validate();
      if (refPhone.value.hasError || refPassword.value.hasError) return;
      loading.value = true;

      login(loginModel.value)
        .then((response) => {
          console.warn("user info===", response.data);
          saveItemToStorage("user", response.data);
          store.dispatch("user/setUser", response.data);
          router.push("/");
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      loginModel,
      btnLogin,
      isPwd,
      refPhone,
      refPassword,
      loading,
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
