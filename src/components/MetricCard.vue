<template>
  <div :class="cardClasses" class="p-4 rounded-xl border transition-all duration-300 hover:shadow-lg">
    <div class="flex items-center justify-between">
      <div>
        <p :class="titleClasses" class="text-sm font-medium">{{ title }}</p>
        <p :class="valueClasses" class="text-3xl font-bold">
          {{ formattedValue }}{{ unit }}
        </p>
      </div>
      <div class="flex items-center">
        <component :is="statusIcon" :class="iconClasses" class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'blue'
  },
  thresholds: {
    type: Object,
    required: true
  },
  format: {
    type: Number,
    default: 1
  },
  reverse: {
    type: Boolean,
    default: false
  },
  range: {
    type: Boolean,
    default: false
  }
})

// Color configurations
const colorConfig = {
  green: {
    card: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    title: 'text-green-600',
    value: 'text-green-900'
  },
  red: {
    card: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
    title: 'text-red-600',
    value: 'text-red-900'
  },
  blue: {
    card: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    title: 'text-blue-600',
    value: 'text-blue-900'
  },
  orange: {
    card: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
    title: 'text-orange-600',
    value: 'text-orange-900'
  },
  purple: {
    card: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    title: 'text-purple-600',
    value: 'text-purple-900'
  },
  teal: {
    card: 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200',
    title: 'text-teal-600',
    value: 'text-teal-900'
  }
}

// Computed properties
const formattedValue = computed(() => {
  return props.value.toFixed(props.format)
})

const status = computed(() => {
  const { value, thresholds, reverse, range } = props
  
  if (range && Array.isArray(thresholds.good)) {
    // Range-based thresholds (e.g., temperature, pH)
    const [goodMin, goodMax] = thresholds.good
    const [warningMin, warningMax] = thresholds.warning || [goodMin - 5, goodMax + 5]
    
    if (value >= goodMin && value <= goodMax) return 'good'
    if (value >= warningMin && value <= warningMax) return 'warning'
    return 'danger'
  } else {
    // Single value thresholds
    const goodThreshold = thresholds.good
    const warningThreshold = thresholds.warning
    
    if (reverse) {
      // For metrics where lower is better (e.g., loss)
      if (value <= goodThreshold) return 'good'
      if (value <= warningThreshold) return 'warning'
      return 'danger'
    } else {
      // For metrics where higher is better (e.g., yield, efficiency)
      if (value >= goodThreshold) return 'good'
      if (value >= warningThreshold) return 'warning'
      return 'danger'
    }
  }
})

const cardClasses = computed(() => {
  return colorConfig[props.color]?.card || colorConfig.blue.card
})

const titleClasses = computed(() => {
  return colorConfig[props.color]?.title || colorConfig.blue.title
})

const valueClasses = computed(() => {
  return colorConfig[props.color]?.value || colorConfig.blue.value
})

const iconClasses = computed(() => {
  switch (status.value) {
    case 'good':
      return 'text-green-500'
    case 'warning':
      return 'text-yellow-500'
    case 'danger':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
})

const statusIcon = computed(() => {
  switch (status.value) {
    case 'good':
      return 'CheckIcon'
    case 'warning':
      return 'ExclamationTriangleIcon'
    case 'danger':
      return 'ExclamationCircleIcon'
    default:
      return 'QuestionMarkCircleIcon'
  }
})
</script>

<script>
// Icon components (inline SVG)
export default {
  components: {
    CheckIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      `
    },
    ExclamationTriangleIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      `
    },
    ExclamationCircleIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      `
    },
    QuestionMarkCircleIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      `
    }
  }
}
</script>