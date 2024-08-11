<script setup>
import { ref, onMounted } from 'vue'
import EventTrigger from './utils'
import MockMenu from '@/components/MockMenu.vue'
import SettingPanel from '@/components/SettingPanel.vue'
import html from './utils/html'

const iframe = ref()
const eventTrigger = ref()

onMounted(() => {
  eventTrigger.value = new EventTrigger(iframe.value)
})
</script>

<template>
  <main class="flex items-stretch h-screen w-screen overflow-x-hidden">
    <MockMenu :eventTrigger="eventTrigger" />
    <div class="grow">
      <iframe
        ref="iframe"
        :srcdoc="html"
        class="w-full h-full"
      />
    </div>
    <SettingPanel />
  </main>
</template>
