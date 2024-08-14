<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const field = ref([])
const isPanelExpanded = ref(false)
const isGroupExpanded = ref({})

onMounted(async () => {
  const response = await axios.get('http://localhost:3000/api/widget')
  loadFieldData(response.data)
})

const loadFieldData = (data) => {
  field.value = Object.entries(data).reduce((result, [key, value]) => {
    const groupKey = value.group  

    if (!result[groupKey]) {
      result[groupKey] = []
      isGroupExpanded.value[groupKey] = false
    }

    result[groupKey].push({
      key,
      type: value.type,
      label: value.label,
      value: value.value || '',
      min: value.min || null,
      max: value.max || null,
      step: value.step || null,
      options: value.options || null,
      group: value.group || null,
    })
    return result
  }, {})
}

const saveData = async () => {
  const updatedData = Object.values(field.value).flat().reduce((acc, curr) => {
    if (!acc[curr.key]) {
      acc[curr.key] = {}
    }

    acc[curr.key] = {
      type: curr.type,
      label: curr.label,
      value: curr.value,
      min: curr.min,
      max: curr.max,
      step: curr.step,
      options: curr.options,
      group: curr.group,
    }
    return acc
  }, {})

  await axios.post('http://localhost:3000/api/widget', updatedData)
}

const getAcceptType = (type) => {
  switch(type) {
    case 'image-input': return 'image/*'
    case 'video-input': return 'video/*'
    case 'sound-input': return 'audio/*'
    default: return '*/*'
  }
}

const handleFileUpload = async (event, fieldItem) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onloadend = () => {
      const dataUrl = reader.result
      fieldItem.value = dataUrl
    }

    reader.readAsDataURL(file)
  }
}

const toggleExpand = () => {
  isPanelExpanded.value = !isPanelExpanded.value
}

const toggleGroupExpand = (group) => {
  isGroupExpanded.value[group] = !isGroupExpanded.value[group]
}

</script>

<template>
  <div 
    class="fixed w-[360px] bg-white h-screen right-0 rounded-s-2xl drop-shadow-2xl transition duration-400 ease-in-out"
    :class="{'translate-x-full': !isPanelExpanded}"
  >
    <button 
      @click="toggleExpand"
      class="absolute top-1/2 text-xl bg-white p-4 rounded-s-lg left-0 -translate-x-full -translate-y-1/2"
    >
      {{ isPanelExpanded ? '››' : '‹‹' }}
    </button>
    <div class="overflow-y-auto p-4 space-y-4 h-full">
      <h2 class="text-xl text-center font-semibold mb-8">
        Setting Panel
      </h2>
      <div 
        v-for="g in Object.keys(field)"
        :key="g"
      >
        <button
          v-if="g !== 'undefined'"
          class="block bg-zinc-100 w-full py-2 px-4 text-lg rounded-lg text-left flex justify-between items-center"
          @click="toggleGroupExpand(g)"
        >
          <span>{{ g }}</span>
          <img 
            src="@/assets/chevron-down.svg"
            class="block transition duration-400 ease-in-out"
            :class="{
              'rotate-180': isGroupExpanded[g],
            }"
          >
        </button>
        <div
          v-if="isGroupExpanded[g] || g === 'undefined'"
          class="space-y-8 mt-4"
        >
          <div 
            v-for="(f, i) in field[g]"
            :key="i"
            class="flex flex-col text-lg gap-4 p-4 border border-2 rounded-xl"
          >
            <h3 class="relative text-center -mt-8">
              <span class="relative z-10 px-2 font-medium bg-white text-blue-500">
                {{ f.label }}
              </span>
            </h3>

            <div
              v-if="f.type === 'image-input' || f.type === 'video-input' || f.type === 'sound-input'"
              class="space-y-4"
            >
              <input 
                type="file" 
                :accept="getAcceptType(f.type)" 
                class="hidden" 
                :id="'file-input-' + i" 
                @change="handleFileUpload($event, f)" 
              />

              <div v-if="f.value" class="p-4 border border-gray-300 rounded-lg bg-white">
                <div v-if="f.type === 'image-input'" class="flex justify-center">
                  <img :src="f.value" alt="Image Preview" class="max-w-full h-auto rounded-lg" />
                </div>
                <div v-if="f.type === 'video-input'" class="flex justify-center">
                  <video :src="f.value" controls class="max-w-full h-auto rounded-lg"></video>
                </div>
                <div v-if="f.type === 'sound-input'" class="flex justify-center">
                  <audio :src="f.value" controls class="w-full"></audio>
                </div>
              </div>

              <label :for="'file-input-' + i" class="block cursor-pointer text-blue-500 border-2 border-blue-500 py-2 px-4 rounded-lg text-center">
                {{ f.value ? 'Change File' : 'Select File' }}
              </label>
            </div>
            
            <div v-else-if="f.type === 'text'">
              <input v-model="f.value" type="text" class="border-2 rounded-lg px-2 w-full" />
            </div>
            
            <div v-else-if="f.type === 'checkbox'" class="space-x-2">
              <input v-model="f.value" type="checkbox" class="border-2 rounded-lg px-2" />
              <label>{{ f.label }}</label>
            </div>
            
            <div v-else-if="f.type === 'colorpicker'">
              <input v-model="f.value" type="color" class="block mx-auto" />
            </div>
            
            <div v-else-if="f.type === 'number' || f.type === 'slider'">
              <input v-model="f.value" :type="f.type === 'slider' ? 'range' : 'number'" 
                :min="f.min" :max="f.max" :step="f.step"
                class="border-2 rounded-lg px-2 w-full" />
            </div>
            
            <div v-else-if="f.type === 'dropdown'">
              <select v-model="f.value" class="border-2 rounded-lg px-2 w-full">
                <option v-for="(optionLabel, optionValue) in f.options" :key="optionValue" :value="optionValue">
                  {{ optionLabel }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <button
        class="w-full bg-blue-500 text-xl p-2 rounded-lg text-white font-medium"
        @click="saveData"
      >
        Save Data
      </button>
    </div>
  </div>
</template>

