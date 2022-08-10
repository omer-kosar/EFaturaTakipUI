<template>
  <q-dialog v-model="dialogState" persistent>
    <q-card>
      <q-card-section>
        <slot name="title">
          <div class="text-h6">İptal Et</div>
        </slot>

        <slot name="content"> </slot>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="İptal" color="primary" @click="btnCancelClick" />
        <q-btn flat label="Tamam" color="primary" @click="btnDeleteClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: ["dialogState"],

  setup(props, { emit }) {
    let dialogState = computed({
      get: () => {
        return props.dialogState || false;
      },
      set: () => {
        emit("dialog-delete-warning-close");
      },
    });
    const btnCancelClick = () => {
      emit("dialog-delete-warning-close");
    };
    const btnDeleteClick = () => {
      emit("dialog-delete-click");
    };
    return { dialogState, btnCancelClick, btnDeleteClick };
  },
});
</script>
