<script lang="ts" setup>
import { 
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider, 
  NLoadingBarProvider,
  NModalProvider,
  zhCN, 
  dateZhCN 
} from "naive-ui"
import { RouterView } from "vue-router"
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-modal-provider>
            <router-view />
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
