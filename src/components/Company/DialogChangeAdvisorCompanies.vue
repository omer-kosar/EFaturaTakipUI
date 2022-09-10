<template>
  <q-dialog
    v-model="dialogState"
    persistent
    @show="getCompanyAndAdvisorCompanyList"
    
  >
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Firma Seçiniz</div>
        <q-select
          v-model="advisorSavedCompanies"
          use-input
          use-chips
          multiple
          input-debounce="3"
          :options="filterOptions"
          @filter="filterFirma"
          class="q-mb-sm q-mr-sm"
          option-value="id"
          option-label="name"
          :loading="loading"
          :disable="loading"
        >
          <template v-if="advisorSavedCompanies" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop="advisorSavedCompanies = []"
              class="cursor-pointer"
            />
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="between">
        <q-btn flat label="İptal" color="primary" @click="btnCancelClick" />
        <q-btn
          flat
          label="Kaydet"
          color="primary"
          @click="btnSaveClick"
          :loading="btnSaveLoading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import {
  changeCompaniesAdvisor,
  getAdvisorCompanies,
  getCompanies,
} from "src/api/company.api";
import { success, warning } from "src/util/notify";
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  props: ["dialogState", "financialAdvisorId"],

  setup(props, { emit }) {
    let advisorSavedCompanies = ref([]);
    let dialogState = computed({
      get: () => {
        return props.dialogState || false;
      },
      set: () => {
        emit("dialog-change-advisor-companies-close");
      },
    });
    let financialAdvisorId = computed(() => props.financialAdvisorId);
    let companyList = [];
    let filterOptions = ref(companyList);
    let loading = ref(false);
    let btnSaveLoading = ref(false);
    const filterFirma = (val, update) => {
      update(() => {
        if (val === "") {
          filterOptions.value = companyList;
        } else {
          const needle = val.toLowerCase();
          filterOptions.value = companyList.filter(
            (company) => company.name.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };
    const btnSaveClick = () => {
      if (advisorSavedCompanies.value.length === 0) {
        warning("Firma seçiniz.");
        return;
      }
      btnSaveLoading.value = true;
      let selectedCompanies = advisorSavedCompanies.value.map(
        (company) => company.id
      );
      changeCompaniesAdvisor(financialAdvisorId.value, selectedCompanies)
        .then((response) => {
          success(response.data);
        })
        .finally(() => {
          btnSaveLoading.value = false;
        });
    };
    const btnCancelClick = () => {
      emit("dialog-change-advisor-companies-close");
    };

    const getCompanyAndAdvisorCompanyList = () => {
      loading.value = true;
      if (!financialAdvisorId.value) return;

      Promise.all([
        getCompanies(),
        getAdvisorCompanies(financialAdvisorId.value),
      ])
        .then((results) => {
          companyList = results[0].data;
          advisorSavedCompanies.value = results[1].data;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      dialogState,
      btnSaveClick,
      btnCancelClick,
      filterFirma,
      getCompanyAndAdvisorCompanyList,
      filterOptions,
      advisorSavedCompanies,
      loading,
      btnSaveLoading,
    };
  },
});
</script>
