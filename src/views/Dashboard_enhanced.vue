<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-primary-200">
        <h1 class="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Production Dashboard
        </h1>
        <p class="text-accent-600 text-lg">Real-time monitoring and analytics</p>
        <div class="flex items-center mt-4 space-x-4">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span class="text-sm text-accent-600">Live Data</span>
          </div>
          <div class="text-sm text-accent-500">
            Last Updated: {{ lastUpdated }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      
      <!-- 1️⃣ Real-time Panel -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Current Batch Status -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-semibold text-accent-900">Current Batch: {{ currentBatch.id }}</h2>
                <p class="text-accent-600">Started: {{ currentBatch.startTime }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="getBatchStatusColor(currentBatch.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ currentBatch.status }}
              </span>
            </div>
          </div>

          <!-- Real-time Metrics Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-green-600 text-sm font-medium">Yield</p>
                  <p class="text-3xl font-bold text-green-900">{{ realTimeData.yield.toFixed(1) }}%</p>
                </div>
                <div class="flex items-center">
                  <svg v-if="realTimeData.yield >= 85" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else-if="realTimeData.yield >= 70" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-red-600 text-sm font-medium">Loss</p>
                  <p class="text-3xl font-bold text-red-900">{{ realTimeData.loss.toFixed(1) }}%</p>
                </div>
                <div class="flex items-center">
                  <svg v-if="realTimeData.loss <= 5" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else-if="realTimeData.loss <= 10" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-600 text-sm font-medium">Efficiency</p>
                  <p class="text-3xl font-bold text-blue-900">{{ realTimeData.efficiency.toFixed(1) }}%</p>
                </div>
                <div class="flex items-center">
                  <svg v-if="realTimeData.efficiency >= 90" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else-if="realTimeData.efficiency >= 80" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-orange-600 text-sm font-medium">Temperature</p>
                  <p class="text-3xl font-bold text-orange-900">{{ realTimeData.temperature.toFixed(1) }}°C</p>
                </div>
                <div class="flex items-center">
                  <svg v-if="realTimeData.temperature >= 70 && realTimeData.temperature <= 80" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else-if="realTimeData.temperature >= 65 && realTimeData.temperature <= 85" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-purple-600 text-sm font-medium">pH Level</p>
                  <p class="text-3xl font-bold text-purple-900">{{ realTimeData.ph.toFixed(1) }}</p>
                </div>
                <div class="flex items-center">
                  <svg v-if="realTimeData.ph >= 6.5 && realTimeData.ph <= 7.5" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else-if="realTimeData.ph >= 6.0 && realTimeData.ph <= 8.0" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-teal-600 text-sm font-medium">Raw Material</p>
                  <p class="text-3xl font-bold text-teal-900">{{ realTimeData.rawMaterial.toFixed(0) }}%</p>
                </div>
                <div class="flex items-center">
                  <svg v-if="realTimeData.rawMaterial >= 80" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else-if="realTimeData.rawMaterial >= 50" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Trends Graph -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-accent-900">Live Trends</h3>
            <div class="flex items-center space-x-4">
              <button 
                v-for="metric in chartMetrics" 
                :key="metric.key"
                @click="toggleMetric(metric.key)"
                :class="metric.enabled ? 'bg-primary-100 text-primary-700 border-primary-300' : 'bg-gray-100 text-gray-600 border-gray-300'"
                class="px-3 py-1 rounded-lg text-sm font-medium border transition-colors duration-200"
              >
                {{ metric.label }}
              </button>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <p class="text-gray-600 font-medium">Live Chart Placeholder</p>
              <p class="text-gray-500 text-sm mt-1">Chart.js or similar library would be implemented here</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 2️⃣ Historical & Simulation Panel -->
      <div class="space-y-6">
        
        <!-- Historical Panel -->
        <div class="card p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-accent-900">Historical Data</h3>
          </div>

          <!-- Batch Selector -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-accent-700 mb-2">Select Batch</label>
            <select v-model="selectedBatch" @change="loadBatchData" class="input-field">
              <option value="">-- Select Batch --</option>
              <option v-for="batch in historicalBatches" :key="batch.id" :value="batch.id">
                {{ batch.id }} - {{ batch.date }} ({{ batch.yield }}%)
              </option>
            </select>
          </div>

          <!-- Selected Batch Info -->
          <div v-if="selectedBatchData" class="space-y-4">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
              <h4 class="font-semibold text-accent-900 mb-3">Batch {{ selectedBatchData.id }} Summary</h4>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-accent-600">Yield:</span>
                  <span class="font-medium">{{ selectedBatchData.yield }}%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-accent-600">Loss:</span>
                  <span class="font-medium">{{ selectedBatchData.loss }}%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-accent-600">Temp:</span>
                  <span class="font-medium">{{ selectedBatchData.avgTemp }}°C</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-accent-600">pH:</span>
                  <span class="font-medium">{{ selectedBatchData.avgPh }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-accent-600">Duration:</span>
                  <span class="font-medium">{{ selectedBatchData.duration }}h</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-accent-600">Status:</span>
                  <span class="font-medium text-green-600">{{ selectedBatchData.status }}</span>
                </div>
              </div>
            </div>

            <!-- Comparison Chart Placeholder -->
            <div class="bg-gray-50 rounded-lg p-4 h-32 flex items-center justify-center">
              <p class="text-gray-600 text-sm">Batch Comparison Chart</p>
            </div>

            <!-- Export Buttons -->
            <div class="flex space-x-3">
              <button @click="exportPDF" class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200">
                <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Export PDF
              </button>
              <button @click="exportExcel" class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200">
                <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <!-- 3️⃣ Simulation Panel -->
        <div class="card p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-accent-900">What-if Simulation</h3>
          </div>

          <!-- Simulation Controls -->
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-semibold text-accent-700 mb-1">Temperature (°C)</label>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="simulation.temperature" 
                  @input="runSimulation"
                  type="range" 
                  min="60" 
                  max="90" 
                  step="0.5"
                  class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span class="w-12 text-sm font-medium">{{ simulation.temperature }}°C</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-accent-700 mb-1">pH Level</label>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="simulation.ph" 
                  @input="runSimulation"
                  type="range" 
                  min="5.0" 
                  max="9.0" 
                  step="0.1"
                  class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span class="w-12 text-sm font-medium">{{ simulation.ph }}</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-accent-700 mb-1">Raw Material Quality (%)</label>
              <div class="flex items-center space-x-3">
                <input 
                  v-model="simulation.rawMaterial" 
                  @input="runSimulation"
                  type="range" 
                  min="60" 
                  max="100" 
                  step="1"
                  class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span class="w-12 text-sm font-medium">{{ simulation.rawMaterial }}%</span>
              </div>
            </div>
          </div>

          <!-- Simulation Results -->
          <div v-if="simulationResults" class="space-y-4">
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
              <h4 class="font-semibold text-accent-900 mb-3">Predicted Results</h4>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-accent-600">Expected Yield:</span>
                  <span class="font-bold" :class="getYieldChangeColor(simulationResults.yieldChange)">
                    {{ simulationResults.expectedYield }}% 
                    <span class="text-xs">({{ simulationResults.yieldChange > 0 ? '+' : '' }}{{ simulationResults.yieldChange.toFixed(1) }}%)</span>
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-accent-600">Quality Score:</span>
                  <span class="font-bold text-purple-700">{{ simulationResults.qualityScore }}/10</span>
                </div>
              </div>
            </div>

            <!-- AI Recommendations -->
            <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <h4 class="font-semibold text-green-900 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                AI Recommendations
              </h4>
              <ul class="space-y-1 text-sm text-green-800">
                <li v-for="recommendation in simulationResults.recommendations" :key="recommendation" class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  {{ recommendation }}
                </li>
              </ul>
            </div>

            <!-- Apply Simulation Button -->
            <button @click="applySimulation" class="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200">
              Apply Simulation Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Real-time data
const lastUpdated = ref(new Date().toLocaleTimeString())
const currentBatch = ref({
  id: 'BTH-2025-0922-001',
  status: 'Running',
  startTime: '08:30 AM'
})

const realTimeData = ref({
  yield: 87.3,
  loss: 6.2,
  efficiency: 91.8,
  temperature: 75.2,
  ph: 7.1,
  rawMaterial: 84
})

// Chart metrics toggle
const chartMetrics = ref([
  { key: 'yield', label: 'Yield', enabled: true },
  { key: 'temperature', label: 'Temp', enabled: true },
  { key: 'ph', label: 'pH', enabled: false },
  { key: 'efficiency', label: 'Efficiency', enabled: false }
])

// Historical data
const selectedBatch = ref('')
const selectedBatchData = ref(null)
const historicalBatches = ref([
  { id: 'BTH-2025-0921-003', date: '2025-09-21', yield: 89.1 },
  { id: 'BTH-2025-0921-002', date: '2025-09-21', yield: 85.7 },
  { id: 'BTH-2025-0921-001', date: '2025-09-21', yield: 92.3 },
  { id: 'BTH-2025-0920-004', date: '2025-09-20', yield: 88.9 },
  { id: 'BTH-2025-0920-003', date: '2025-09-20', yield: 87.2 }
])

// Simulation data
const simulation = ref({
  temperature: 75.0,
  ph: 7.0,
  rawMaterial: 85
})

const simulationResults = ref({
  expectedYield: 89.5,
  yieldChange: 2.2,
  qualityScore: 8.7,
  recommendations: [
    'Optimal temperature range achieved',
    'pH level within ideal parameters',
    'Raw material quality excellent'
  ]
})

// Intervals
let dataUpdateInterval = null

// Methods
const getBatchStatusColor = (status) => {
  switch (status) {
    case 'Running': return 'bg-green-100 text-green-800 border border-green-200'
    case 'Paused': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'Error': return 'bg-red-100 text-red-800 border border-red-200'
    default: return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

const updateRealTimeData = () => {
  // Mock real-time data updates
  realTimeData.value.yield += (Math.random() - 0.5) * 2
  realTimeData.value.loss += (Math.random() - 0.5) * 0.5
  realTimeData.value.efficiency += (Math.random() - 0.5) * 1
  realTimeData.value.temperature += (Math.random() - 0.5) * 0.5
  realTimeData.value.ph += (Math.random() - 0.5) * 0.1
  realTimeData.value.rawMaterial = Math.max(0, realTimeData.value.rawMaterial + (Math.random() - 0.5) * 2)
  
  // Keep values in realistic ranges
  realTimeData.value.yield = Math.max(70, Math.min(95, realTimeData.value.yield))
  realTimeData.value.loss = Math.max(0, Math.min(15, realTimeData.value.loss))
  realTimeData.value.efficiency = Math.max(80, Math.min(98, realTimeData.value.efficiency))
  realTimeData.value.temperature = Math.max(65, Math.min(85, realTimeData.value.temperature))
  realTimeData.value.ph = Math.max(6.0, Math.min(8.0, realTimeData.value.ph))
  realTimeData.value.rawMaterial = Math.max(0, Math.min(100, realTimeData.value.rawMaterial))
  
  lastUpdated.value = new Date().toLocaleTimeString()
}

const toggleMetric = (key) => {
  const metric = chartMetrics.value.find(m => m.key === key)
  if (metric) metric.enabled = !metric.enabled
}

const loadBatchData = () => {
  if (!selectedBatch.value) {
    selectedBatchData.value = null
    return
  }
  
  // Mock batch data loading
  selectedBatchData.value = {
    id: selectedBatch.value,
    yield: Math.floor(Math.random() * 20) + 80,
    loss: Math.floor(Math.random() * 8) + 2,
    avgTemp: Math.floor(Math.random() * 10) + 70,
    avgPh: (Math.random() * 1.5 + 6.5).toFixed(1),
    duration: Math.floor(Math.random() * 8) + 16,
    status: 'Completed'
  }
}

const runSimulation = () => {
  // Mock simulation calculation
  const tempFactor = (simulation.value.temperature - 75) / 10
  const phFactor = Math.abs(simulation.value.ph - 7.0) * -2
  const materialFactor = (simulation.value.rawMaterial - 85) / 20
  
  const yieldChange = tempFactor + phFactor + materialFactor
  const expectedYield = Math.max(70, Math.min(95, 87.3 + yieldChange))
  
  simulationResults.value = {
    expectedYield: expectedYield.toFixed(1),
    yieldChange: yieldChange,
    qualityScore: Math.max(6, Math.min(10, 8.5 + yieldChange / 5)).toFixed(1),
    recommendations: generateRecommendations()
  }
}

const generateRecommendations = () => {
  const recommendations = []
  
  if (simulation.value.temperature < 70) {
    recommendations.push('Consider increasing temperature for better yield')
  } else if (simulation.value.temperature > 80) {
    recommendations.push('Temperature is high - monitor for quality issues')
  } else {
    recommendations.push('Temperature is within optimal range')
  }
  
  if (simulation.value.ph < 6.5 || simulation.value.ph > 7.5) {
    recommendations.push('pH adjustment recommended for optimal conditions')
  } else {
    recommendations.push('pH level is ideal for production')
  }
  
  if (simulation.value.rawMaterial < 80) {
    recommendations.push('Raw material quality could be improved')
  } else {
    recommendations.push('Excellent raw material quality detected')
  }
  
  return recommendations
}

const getYieldChangeColor = (change) => {
  if (change > 0) return 'text-green-600'
  if (change < -1) return 'text-red-600'
  return 'text-yellow-600'
}

const exportPDF = () => {
  alert('PDF export would be implemented with libraries like jsPDF')
}

const exportExcel = () => {
  alert('Excel export would be implemented with libraries like xlsx')
}

const applySimulation = () => {
  alert('Simulation settings would be applied to the production system')
}

// Lifecycle
onMounted(() => {
  // Start real-time data updates every 3 seconds
  dataUpdateInterval = setInterval(updateRealTimeData, 3000)
  // Initial simulation run
  runSimulation()
})

onUnmounted(() => {
  if (dataUpdateInterval) {
    clearInterval(dataUpdateInterval)
  }
})
</script>