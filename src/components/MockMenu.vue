<script setup>
import { ref } from 'vue'

const customMessageUsername = ref('Bill')
const customMessageText = ref('Hello World!')
const customMessageSubscriber = ref(true)
const simpleEventUsername = ref('Julius')
const simpleEventKind = ref('follower-latest')
const simpleEventMessage = ref('')

const SIMPLE_EVENTS = [
  {
    label: 'New Follower',
    value: 'follower-latest',
  },
  {
    label: 'New Subscriber',
    value: 'subscriber-latest',
  },
  {
    label: 'New Sub Gift',
    value: 'sub-gift-latest',
  },
  {
    label: 'New Host',
    value: 'host-latets',
  },
  {
    label: 'New Cheer',
    value: 'cheer-latest',
  },
  {
    label: 'New Tip',
    value: 'tip-latest',
  },
  {
    label: 'New Raid',
    value: 'raid-latest',
  }
]

const triggerTestMessage = (eventTrigger) => {
  eventTrigger.triggerTestMessage()
}

const triggerDeleteMessage = (eventTrigger) => {
  eventTrigger.triggerDeleteMessage()
}

const triggerCustomMessage = (eventTrigger) => {
  eventTrigger.triggerCustomMessage(customMessageText.value, customMessageUsername.value, customMessageSubscriber.value)
}


const triggerSimpleEvent = (eventTrigger) => {
  eventTrigger.triggerSimpleEvent(simpleEventUsername.value, simpleEventKind.value, simpleEventMessage.value)
}

defineProps(['eventTrigger'])
</script>

<template>
  <div class="w-[420px] space-y-6 p-4 block drop-shadow-xl bg-zinc-100 overflow-y-auto">
    <h1 class="text-2xl font-semibold">
      Stream Elements Widget Mock Tool
    </h1>
    <div class="flex flex-col text-lg text-white gap-4">
      <button
        class="bg-blue-500 p-2 rounded-lg"
        @click="triggerTestMessage(eventTrigger)"
      >
        Send Test Message
      </button>
      <button
        class="bg-blue-500 p-2 rounded-lg"
        @click="triggerDeleteMessage(eventTrigger)"
      >
        Delete Test Message
      </button>
    </div>
    <div class="flex flex-col text-lg gap-4">
      <h2 class="relative text-blue-500 text-center">
        <span class="relative z-10 bg-zinc-100 px-2 font-medium">
          Custom Message
        </span>
        <hr class="absolute w-full top-1/2">
      </h2>
      <input
        v-model="customMessageUsername"
        type="text"
        placeholder="Displayed username"
        class="border-2 rounded-lg px-2"
      >
      <textarea
        v-model="customMessageText"
        type="text"
        placeholder="Displayed text"
        class="border-2 rounded-lg px-2 h-[3lh] resize-none"
      />
      <div class="flex gap-x-4 justify-end">
        <div class="flex gap-x-2">
          <input id="subscriber" type="radio" v-model="customMessageSubscriber" :value="true" />
          <label for="subscriber">Subscriber</label>
        </div>
        <div class="flex gap-x-2">
          <input id="nonSubscriber" type="radio" v-model="customMessageSubscriber" :value="false" />
          <label for="nonSubscriber">Non-subscriber</label>
        </div>
      </div>
      <button
        class="bg-blue-500 p-2 rounded-lg text-white"
        @click="triggerCustomMessage(eventTrigger)"
      >
        Send Custom Message
      </button>
    </div>
    <div class="flex flex-col text-lg gap-4">
      <h2 class="relative text-blue-500 text-center">
        <span class="relative z-10 bg-zinc-100 px-2 font-medium">
          New Event
        </span>
        <hr class="absolute w-full top-1/2">
      </h2>
      <input
        v-model="simpleEventUsername"
        type="text"
        placeholder="Displayed username"
        class="border-2 rounded-lg px-2"
      >
      <select
        v-model="simpleEventKind"
        class="border-2 rounded-lg px-2 h-8"
      >
        <option
          v-for="(e, i) in SIMPLE_EVENTS"
          :key="i"
          :value="e.value"
        >
          {{ e.label }}
        </option>
      </select>
      <textarea
        v-model="simpleEventMessage"
        type="text"
        placeholder="Attached message"
        class="border-2 rounded-lg px-2 h-[3lh] resize-none"
      />
      <button
        class="bg-blue-500 p-2 rounded-lg text-white"
        @click="triggerSimpleEvent(eventTrigger)"
      >
        Send Event
      </button>
    </div>
  </div>
</template>
