<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-primary-200">
        <h1 class="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          System Settings
        </h1>
        <p class="text-accent-600 text-lg">Configure production parameters and system preferences</p>
      </div>
    </div>

    <div class="space-y-8">
      <!-- Alert Thresholds -->
      <div class="card">
        <div class="p-6 border-b border-accent-200">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-accent-900">Alert Thresholds</h2>
              <p class="text-accent-600">Set warning and critical thresholds for production parameters</p>
            </div>
          </div>
        </div>
        <div class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Temperature Thresholds -->
            <div class="space-y-6">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-accent-900">🌡️ Temperature (°C)</h3>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-accent-700 mb-2">Minimum Warning</label>
                  <input
                    v-model="thresholds.temperature.minWarning"
                    type="number"
                    step="0.1"
                    class="input-field"
                  />
                  <p class="text-xs text-accent-500 mt-1">Alert when temperature drops below this value</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-accent-700 mb-2">Maximum Warning</label>
                  <input
                    v-model="thresholds.temperature.maxWarning"
                    type="number"
                    step="0.1"
                    class="input-field"
                  />
                  <p class="text-xs text-accent-500 mt-1">Alert when temperature exceeds this value</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-accent-700 mb-2">Critical Threshold</label>
                  <input
                    v-model="thresholds.temperature.critical"
                    type="number"
                    step="0.1"
                    class="block w-full rounded-lg border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 transition-colors duration-200"
                  />
                  <p class="text-xs text-red-600 mt-1">Emergency shutdown threshold</p>
                </div>
              </div>
            </div>

            <!-- pH Thresholds -->
            <div class="space-y-6">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-accent-900">⚗️ pH Level</h3>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-accent-700 mb-2">Minimum Warning</label>
                  <input
                    v-model="thresholds.ph.minWarning"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    class="input-field"
                  />
                  <p class="text-xs text-accent-500 mt-1">Alert when pH is too acidic</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-accent-700 mb-2">Maximum Warning</label>
                  <input
                    v-model="thresholds.ph.maxWarning"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    class="input-field"
                  />
                  <p class="text-xs text-accent-500 mt-1">Alert when pH is too alkaline</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-accent-700 mb-2">Critical Range (± from optimal)</label>
                  <input
                    v-model="thresholds.ph.critical"
                    type="number"
                    step="0.1"
                    class="block w-full rounded-lg border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 transition-colors duration-200"
                  />
                  <p class="text-xs text-red-600 mt-1">Critical deviation from optimal pH</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Yield Thresholds -->
          <div class="mt-8 pt-8 border-t border-accent-200">
            <div class="flex items-center mb-6">
              <div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-accent-900">📊 Yield Performance Thresholds (%)</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-red-50 rounded-xl p-4 border border-red-200">
                <label class="block text-sm font-semibold text-red-700 mb-2">🔴 Poor Performance</label>
                <input
                  v-model="thresholds.yield.poor"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  class="block w-full rounded-lg border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3"
                />
                <p class="text-xs text-red-600 mt-1">Below this threshold triggers alerts</p>
              </div>
              <div class="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <label class="block text-sm font-semibold text-yellow-700 mb-2">🟡 Good Performance</label>
                <input
                  v-model="thresholds.yield.good"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  class="block w-full rounded-lg border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-3"
                />
                <p class="text-xs text-yellow-600 mt-1">Target performance range</p>
              </div>
              <div class="bg-green-50 rounded-xl p-4 border border-green-200">
                <label class="block text-sm font-semibold text-green-700 mb-2">🟢 Excellent Performance</label>
                <input
                  v-model="thresholds.yield.excellent"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  class="block w-full rounded-lg border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
                />
                <p class="text-xs text-green-600 mt-1">Outstanding performance level</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Model Configuration -->
      <div class="card">
        <div class="p-6 border-b border-accent-200">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-accent-900">AI Prediction Model</h2>
              <p class="text-accent-600">Select and configure machine learning models</p>
            </div>
          </div>
        </div>
        <div class="p-8">
          <div class="space-y-8">
            <!-- Model Selection -->
            <div>
              <label class="block text-sm font-semibold text-accent-700 mb-3">🤖 Active Model Version</label>
              <select
                v-model="modelSettings.activeVersion"
                class="input-field w-full lg:w-2/3"
              >
                <option v-for="model in availableModels" :key="model.id" :value="model.id">
                  {{ model.name }} (v{{ model.version }}) - {{ model.accuracy }}% accuracy
                </option>
              </select>
            </div>

            <!-- Model Details -->
            <div v-if="selectedModel" class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
              <h4 class="font-semibold text-purple-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Model Details
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                  <span class="text-purple-600 text-sm font-medium">Training Date</span>
                  <p class="font-semibold text-purple-900 text-lg">{{ selectedModel.trainedDate }}</p>
                </div>
                <div class="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                  <span class="text-purple-600 text-sm font-medium">Model Type</span>
                  <p class="font-semibold text-purple-900 text-lg">{{ selectedModel.type }}</p>
                </div>
                <div class="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                  <span class="text-purple-600 text-sm font-medium">Dataset Size</span>
                  <p class="font-semibold text-purple-900 text-lg">{{ selectedModel.datasetSize }} samples</p>
                </div>
              </div>
            </div>

            <!-- Model Parameters -->
            <div>
              <h4 class="font-semibold text-accent-900 mb-6 flex items-center text-lg">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                </svg>
                Model Parameters
              </h4>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-accent-50 rounded-xl p-6 border border-accent-200">
                  <label class="block text-sm font-semibold text-accent-700 mb-2">🎯 Confidence Threshold (%)</label>
                  <input
                    v-model="modelSettings.confidenceThreshold"
                    type="number"
                    step="1"
                    min="50"
                    max="100"
                    class="input-field"
                  />
                  <p class="text-xs text-accent-600 mt-2">Minimum confidence level for model predictions</p>
                  <div class="mt-3 bg-white rounded-lg p-3">
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-gradient-primary h-2 rounded-full transition-all duration-300" :style="`width: ${modelSettings.confidenceThreshold}%`"></div>
                    </div>
                    <p class="text-xs text-center mt-1 font-medium">{{ modelSettings.confidenceThreshold }}%</p>
                  </div>
                </div>
                <div class="bg-accent-50 rounded-xl p-6 border border-accent-200">
                  <label class="block text-sm font-semibold text-accent-700 mb-2">⏱️ Prediction Window (hours)</label>
                  <input
                    v-model="modelSettings.predictionWindow"
                    type="number"
                    step="1"
                    min="1"
                    max="72"
                    class="input-field"
                  />
                  <p class="text-xs text-accent-600 mt-2">How far ahead the model should predict</p>
                  <div class="mt-3 bg-white rounded-lg p-3">
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-gradient-secondary h-2 rounded-full transition-all duration-300" :style="`width: ${(modelSettings.predictionWindow/72)*100}%`"></div>
                    </div>
                    <p class="text-xs text-center mt-1 font-medium">{{ modelSettings.predictionWindow }} hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="card">
        <div class="p-6 border-b border-accent-200">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM8.5 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-accent-900">Notifications</h2>
              <p class="text-accent-600">Configure alert and notification preferences</p>
            </div>
          </div>
        </div>
        <div class="p-8">
          <div class="space-y-6">
            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-blue-900">📧 Email Notifications</h4>
                  <p class="text-sm text-blue-700">Receive alerts and reports via email</p>
                </div>
              </div>
              <button
                @click="notifications.email = !notifications.email"
                type="button"
                :class="notifications.email ? 'bg-primary-600' : 'bg-gray-300'"
                class="relative inline-flex flex-shrink-0 h-8 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span
                  :class="notifications.email ? 'translate-x-6' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-7 w-7 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v14h12V6H6zM8 8v10h2V8H8zM12 8v10h2V8h-2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-green-900">🔔 Browser Notifications</h4>
                  <p class="text-sm text-green-700">Show real-time browser push notifications</p>
                </div>
              </div>
              <button
                @click="notifications.browser = !notifications.browser"
                type="button"
                :class="notifications.browser ? 'bg-primary-600' : 'bg-gray-300'"
                class="relative inline-flex flex-shrink-0 h-8 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span
                  :class="notifications.browser ? 'translate-x-6' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-7 w-7 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-red-900">🚨 Critical Alerts Only</h4>
                  <p class="text-sm text-red-700">Only receive critical threshold alerts</p>
                </div>
              </div>
              <button
                @click="notifications.criticalOnly = !notifications.criticalOnly"
                type="button"
                :class="notifications.criticalOnly ? 'bg-primary-600' : 'bg-gray-300'"
                class="relative inline-flex flex-shrink-0 h-8 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span
                  :class="notifications.criticalOnly ? 'translate-x-6' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-7 w-7 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Settings -->
      <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-primary-200">
        <button
          @click="resetToDefaults"
          class="w-full sm:w-auto bg-accent-200 text-accent-700 px-8 py-3 rounded-xl font-medium hover:bg-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-all duration-200"
        >
          <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Reset to Defaults
        </button>
        <button
          @click="saveSettings"
          class="btn-primary w-full sm:w-auto px-8"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Save All Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Settings data
const thresholds = ref({
  temperature: {
    minWarning: 65,
    maxWarning: 85,
    critical: 90
  },
  ph: {
    minWarning: 6.5,
    maxWarning: 8.5,
    critical: 1.5
  },
  yield: {
    poor: 70,
    good: 85,
    excellent: 95
  }
})

const modelSettings = ref({
  activeVersion: 'model_v2_3',
  confidenceThreshold: 85,
  predictionWindow: 24
})

const notifications = ref({
  email: true,
  browser: false,
  criticalOnly: false
})

// Available models (mock data)
const availableModels = ref([
  {
    id: 'model_v1_0',
    name: 'Linear Regression',
    version: '1.0',
    accuracy: '78.5',
    trainedDate: '2024-01-15',
    type: 'Linear Regression',
    datasetSize: '2,450'
  },
  {
    id: 'model_v2_3',
    name: 'Random Forest',
    version: '2.3',
    accuracy: '87.2',
    trainedDate: '2024-03-20',
    type: 'Random Forest',
    datasetSize: '5,280'
  },
  {
    id: 'model_v3_1',
    name: 'Neural Network',
    version: '3.1',
    accuracy: '92.1',
    trainedDate: '2024-05-10',
    type: 'Deep Neural Network',
    datasetSize: '8,750'
  }
])

// Computed properties
const selectedModel = computed(() => {
  return availableModels.value.find(model => model.id === modelSettings.value.activeVersion)
})

// Methods
const saveSettings = () => {
  // Mock save - will be replaced with API call
  alert('Settings saved successfully!')
  console.log('Saving settings:', {
    thresholds: thresholds.value,
    modelSettings: modelSettings.value,
    notifications: notifications.value
  })
}

const resetToDefaults = () => {
  thresholds.value = {
    temperature: {
      minWarning: 65,
      maxWarning: 85,
      critical: 90
    },
    ph: {
      minWarning: 6.5,
      maxWarning: 8.5,
      critical: 1.5
    },
    yield: {
      poor: 70,
      good: 85,
      excellent: 95
    }
  }
  
  modelSettings.value = {
    activeVersion: 'model_v2_3',
    confidenceThreshold: 85,
    predictionWindow: 24
  }
  
  notifications.value = {
    email: true,
    browser: false,
    criticalOnly: false
  }
}

// Initialize
onMounted(() => {
  // Load saved settings from localStorage or API
  console.log('Loading settings...')
})
</script>