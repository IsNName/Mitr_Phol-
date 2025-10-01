<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-primary-200">
        <h1 class="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          AI Prediction & Simulation
        </h1>
        <p class="text-accent-600 text-lg">Advanced analytics for production optimization</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-8">
      <!-- Input Form -->
      <div class="xl:col-span-2 card p-8">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-accent-900">Input Parameters</h2>
        </div>
        
        <form @submit.prevent="runPrediction" class="space-y-6">
          <!-- Temperature -->
          <div>
            <label for="temperature" class="block text-sm font-semibold text-accent-700 mb-2">
              🌡️ Temperature (°C)
            </label>
            <input
              v-model="inputData.temperature"
              type="number"
              step="0.1"
              id="temperature"
              class="input-field"
              placeholder="Enter temperature"
            />
            <p class="text-xs text-accent-500 mt-1">Optimal range: 70-80°C</p>
          </div>

          <!-- pH Level -->
          <div>
            <label for="ph" class="block text-sm font-semibold text-accent-700 mb-2">
              ⚗️ pH Level
            </label>
            <input
              v-model="inputData.ph"
              type="number"
              step="0.1"
              min="0"
              max="14"
              id="ph"
              class="input-field"
              placeholder="Enter pH level"
            />
            <p class="text-xs text-accent-500 mt-1">Optimal range: 6.5-7.5</p>
          </div>

          <!-- Pressure -->
          <div>
            <label for="pressure" class="block text-sm font-semibold text-accent-700 mb-2">
              📊 Pressure (bar)
            </label>
            <input
              v-model="inputData.pressure"
              type="number"
              step="0.1"
              id="pressure"
              class="input-field"
              placeholder="Enter pressure"
            />
            <p class="text-xs text-accent-500 mt-1">Optimal range: 3-5 bar</p>
          </div>

          <!-- Flow Rate -->
          <div>
            <label for="flowRate" class="block text-sm font-semibold text-accent-700 mb-2">
              🌊 Flow Rate (L/min)
            </label>
            <input
              v-model="inputData.flowRate"
              type="number"
              step="0.1"
              id="flowRate"
              class="input-field"
              placeholder="Enter flow rate"
            />
            <p class="text-xs text-accent-500 mt-1">Optimal range: 10-15 L/min</p>
          </div>

          <!-- Concentration -->
          <div>
            <label for="concentration" class="block text-sm font-semibold text-accent-700 mb-2">
              🧪 Concentration (%)
            </label>
            <input
              v-model="inputData.concentration"
              type="number"
              step="0.1"
              id="concentration"
              class="input-field"
              placeholder="Enter concentration"
            />
            <p class="text-xs text-accent-500 mt-1">Optimal range: 15-25%</p>
          </div>

          <!-- Time Period -->
          <div>
            <label for="timePeriod" class="block text-sm font-semibold text-accent-700 mb-2">
              ⏱️ Time Period (hours)
            </label>
            <input
              v-model="inputData.timePeriod"
              type="number"
              step="1"
              min="1"
              id="timePeriod"
              class="input-field"
              placeholder="Enter time period"
            />
            <p class="text-xs text-accent-500 mt-1">Prediction window: 1-72 hours</p>
          </div>

          <!-- Action Buttons -->
          <div class="pt-6 space-y-4">
            <button
              type="submit"
              :disabled="isLoading"
              class="btn-primary w-full"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              {{ isLoading ? 'Processing...' : 'Run Prediction' }}
            </button>
            
            <button
              type="button"
              @click="runSimulation"
              :disabled="isLoading"
              class="btn-secondary w-full"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Run Simulation
            </button>
          </div>
        </form>
      </div>

      <!-- Results Display -->
      <div class="xl:col-span-3">
        <div class="card p-8">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-semibold text-accent-900">Analysis Results</h2>
            </div>
            <button
              v-if="results"
              @click="clearResults"
              class="text-accent-500 hover:text-accent-700 px-3 py-1 rounded-lg hover:bg-accent-100 transition-colors duration-200"
            >
              Clear
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary-300 border-t-primary-600 mb-4"></div>
            <p class="text-accent-600 text-lg">Processing your request...</p>
            <p class="text-accent-500 text-sm mt-2">This may take a few seconds</p>
          </div>

          <!-- No Results State -->
          <div v-else-if="!results" class="text-center py-16">
            <div class="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-accent-900 mb-2">Ready for Analysis</h3>
            <p class="text-accent-600">Enter your parameters and run prediction or simulation to see results here.</p>
          </div>

          <!-- Results Display -->
          <div v-else class="space-y-8">
            <!-- Prediction Summary -->
            <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200">
              <h3 class="text-lg font-semibold text-accent-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Prediction Summary
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl p-4 border border-primary-200">
                  <span class="text-primary-600 text-sm font-medium">Expected Yield</span>
                  <p class="text-3xl font-bold text-primary-900">{{ results.predictedYield }}%</p>
                  <span class="text-sm" :class="results.yieldTrend === 'up' ? 'text-green-600' : 'text-red-600'">
                    {{ results.yieldTrend === 'up' ? '↗️ Above target' : '↘️ Below target' }}
                  </span>
                </div>
                <div class="bg-white rounded-xl p-4 border border-secondary-200">
                  <span class="text-secondary-600 text-sm font-medium">Quality Score</span>
                  <p class="text-3xl font-bold text-secondary-900">{{ results.qualityScore }}/10</p>
                  <span class="text-sm text-green-600">✨ Excellent quality</span>
                </div>
                <div class="bg-white rounded-xl p-4 border border-accent-200">
                  <span class="text-accent-600 text-sm font-medium">Confidence</span>
                  <p class="text-3xl font-bold text-accent-900">{{ results.confidence }}%</p>
                  <span class="text-sm text-blue-600">🎯 High confidence</span>
                </div>
              </div>
            </div>

            <!-- Recommendations -->
            <div>
              <h3 class="text-lg font-semibold text-accent-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                AI Recommendations
              </h3>
              <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <ul class="space-y-3">
                  <li v-for="recommendation in results.recommendations" :key="recommendation" class="flex items-start">
                    <svg class="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-blue-900">{{ recommendation }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div v-if="results" class="mt-8 pt-6 border-t border-accent-200 flex flex-col sm:flex-row gap-4">
            <button
              @click="clearResults"
              class="w-full sm:w-auto bg-accent-200 text-accent-700 px-6 py-3 rounded-xl font-medium hover:bg-accent-300 transition-colors duration-200"
            >
              Clear Results
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive data
const isLoading = ref(false)
const results = ref(null)

const inputData = ref({
  temperature: 75,
  ph: 7.0,
  pressure: 4.0,
  flowRate: 12.5,
  concentration: 20,
  timePeriod: 24
})

// Mock functions
const runPrediction = async () => {
  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    results.value = {
      predictedYield: 89.5,
      qualityScore: 8.7,
      confidence: 94,
      yieldTrend: 'up',
      recommendations: [
        'Maintain current temperature settings for optimal yield',
        'Monitor pH levels closely during next 4 hours',
        'Consider increasing flow rate by 5% for better efficiency',
        'Raw material quality is excellent - continue current supplier',
        'Recommend backup raw material preparation'
      ]
    }
    
    isLoading.value = false
  }, 2000)
}

const runSimulation = async () => {
  isLoading.value = true
  
  // Simulate API call  
  setTimeout(() => {
    results.value = {
      predictedYield: 92.1,
      qualityScore: 9.2,
      confidence: 91,
      yieldTrend: 'up',
      recommendations: [
        'Simulation shows 3% yield improvement possible',
        'Adjust temperature to 78°C for optimal results',
        'pH adjustment to 7.2 recommended',
        'Flow rate optimization shows 2% efficiency gain',
        'Quality improvements detected with current parameters'
      ]
    }
    
    isLoading.value = false
  }, 2500)
}

const clearResults = () => {
  results.value = null
}
</script>