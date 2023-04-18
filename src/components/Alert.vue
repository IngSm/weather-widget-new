<script setup lang="ts">
  const emit = defineEmits(['hide']);
</script>

<template>
  <div class="main main_modal">
    <div class="text text_modal" v-text="`City not found!`" />
    <button class="mt" @click="emit('hide')" v-text="`Ok`" />
  </div>
</template>

<style scoped>
  .main_modal {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  .text_modal {
    font-size: 35px;
  }
</style>
