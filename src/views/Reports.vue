<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-primary-200">
        <h1 class="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Production Reports
        </h1>
        <p class="text-accent-600 text-lg">Comprehensive analytics and export capabilities</p>
      </div>
    </div>

    <!-- Filters and Controls -->
    <div class="card p-6 mb-8">
      <div class="flex items-center mb-6">
        <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-accent-900">Report Filters</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label for="reportType" class="block text-sm font-semibold text-accent-700 mb-2">📊 Report Type</label>
          <select
            v-model="filters.reportType"
            id="reportType"
            class="input-field"
          >
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
        </div>

        <div>
          <label for="startDate" class="block text-sm font-semibold text-accent-700 mb-2">📅 Start Date</label>
          <input
            v-model="filters.startDate"
            type="date"
            id="startDate"
            class="input-field"
          />
        </div>

        <div>
          <label for="endDate" class="block text-sm font-semibold text-accent-700 mb-2">📅 End Date</label>
          <input
            v-model="filters.endDate"
            type="date"
            id="endDate"
            class="input-field"
          />
        </div>

        <div class="flex items-end">
          <button
            @click="generateReport"
            class="btn-primary w-full"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Generate Report
          </button>
        </div>
      </div>
    </div>

    <!-- Report Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="stat-card">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-accent-500 uppercase tracking-wide">Total Production</p>
            <p class="text-3xl font-bold text-primary-700">{{ reportSummary.totalProduction }} tons</p>
            <p class="text-sm text-accent-600 mt-1">{{ filters.reportType }} period</p>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-accent-500 uppercase tracking-wide">Average Yield</p>
            <p class="text-3xl font-bold text-secondary-700">{{ reportSummary.avgYield }}%</p>
            <p class="text-sm text-accent-600 mt-1">Production efficiency</p>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-accent-500 uppercase tracking-wide">Quality Score</p>
            <p class="text-3xl font-bold text-purple-700">{{ reportSummary.avgQuality }}/10</p>
            <p class="text-sm text-accent-600 mt-1">Average quality rating</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Reports Table -->
    <div class="card p-0 overflow-hidden">
      <div class="p-6 border-b border-accent-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 class="text-xl font-semibold text-accent-900">Production Data Table</h2>
        <div class="flex space-x-3">
          <button
            @click="exportToCSV"
            class="btn-secondary text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Export CSV
          </button>
          <button
            @click="exportToPDF"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-accent-200">
          <thead class="bg-gradient-to-r from-primary-50 to-secondary-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-accent-700 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-accent-700 uppercase tracking-wider">
                Batch ID
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-accent-700 uppercase tracking-wider">
                Production (tons)
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-accent-700 uppercase tracking-wider">
                Yield (%)
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-accent-700 uppercase tracking-wider">
                Quality Score
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-accent-700 uppercase tracking-wider">
                Temperature (°C)
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-accent-700 uppercase tracking-wider">
                pH Level
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-accent-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-accent-200">
            <tr v-for="record in reportData" :key="record.batchId" class="hover:bg-primary-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent-900">
                {{ formatDate(record.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-700">
                {{ record.batchId }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-accent-900 font-medium">
                {{ record.production }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-accent-700">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-3">
                    <div class="h-2 rounded-full" :class="getYieldColor(record.yield)" :style="`width: ${Math.min(record.yield, 100)}%`"></div>
                  </div>
                  <span class="font-medium">{{ record.yield }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-accent-900">
                <div class="flex items-center">
                  <span class="font-medium mr-2">{{ record.quality }}/10</span>
                  <div class="flex">
                    <svg v-for="star in 5" :key="star" 
                         class="h-4 w-4" 
                         :class="star <= record.quality ? 'text-secondary-400' : 'text-gray-300'"
                         fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-accent-900 font-medium">
                {{ record.temperature }}°C
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-accent-900 font-medium">
                {{ record.ph }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      :class="getStatusClass(record.status)">
                  <div class="w-1.5 h-1.5 rounded-full mr-2" :class="getStatusDot(record.status)"></div>
                  {{ record.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-accent-50 px-6 py-4 border-t border-accent-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-accent-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">{{ reportData.length }}</span> of 
            <span class="font-medium">{{ reportData.length }}</span> results
          </div>
          <div class="flex space-x-2">
            <button class="px-4 py-2 text-sm font-medium text-accent-700 bg-white border border-accent-300 rounded-lg hover:bg-accent-100 transition-colors">
              Previous
            </button>
            <button class="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 transition-colors">
              1
            </button>
            <button class="px-4 py-2 text-sm font-medium text-accent-700 bg-white border border-accent-300 rounded-lg hover:bg-accent-100 transition-colors">
              2
            </button>
            <button class="px-4 py-2 text-sm font-medium text-accent-700 bg-white border border-accent-300 rounded-lg hover:bg-accent-100 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Filters
const filters = ref({
  reportType: 'daily',
  startDate: '',
  endDate: ''
})

// Report data
const reportData = ref([])
const reportSummary = ref({
  totalProduction: 0,
  avgYield: 0,
  avgQuality: 0
})

// Mock data generation
const generateMockData = () => {
  const data = []
  const today = new Date()
  
  for (let i = 0; i < 15; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const batch = {
      date: date.toISOString().split('T')[0],
      batchId: `MP${String(Date.now() + i).slice(-6)}`,
      production: (1.5 + Math.random() * 1.0).toFixed(2), // tons instead of kg
      yield: (75 + Math.random() * 20).toFixed(1),
      quality: Math.floor(Math.random() * 5) + 6, // 6-10 scale
      temperature: (70 + Math.random() * 10).toFixed(1),
      ph: (6.5 + Math.random() * 2).toFixed(1),
      status: Math.random() > 0.8 ? 'Warning' : Math.random() > 0.6 ? 'Running' : 'Completed'
    }
    data.push(batch)
  }
  
  return data
}

// Generate report
const generateReport = () => {
  reportData.value = generateMockData()
  
  // Calculate summary
  const totalProd = reportData.value.reduce((sum, record) => sum + parseFloat(record.production), 0)
  const avgYield = reportData.value.reduce((sum, record) => sum + parseFloat(record.yield), 0) / reportData.value.length
  const avgQuality = reportData.value.reduce((sum, record) => sum + record.quality, 0) / reportData.value.length
  
  reportSummary.value = {
    totalProduction: totalProd.toFixed(1),
    avgYield: avgYield.toFixed(1),
    avgQuality: avgQuality.toFixed(1)
  }
}

// Utility functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getYieldColor = (yieldValue) => {
  if (yieldValue >= 90) return 'bg-green-500'
  if (yieldValue >= 80) return 'bg-secondary-500'
  if (yieldValue >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

// Status styling
const getStatusClass = (status) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-800 border border-green-200',
    'Running': 'bg-blue-100 text-blue-800 border border-blue-200',
    'Warning': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'Error': 'bg-red-100 text-red-800 border border-red-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusDot = (status) => {
  const dots = {
    'Completed': 'bg-green-500',
    'Running': 'bg-blue-500 animate-pulse',
    'Warning': 'bg-yellow-500 animate-pulse',
    'Error': 'bg-red-500 animate-pulse'
  }
  return dots[status] || 'bg-gray-500'
}

// Export functions (mock)
const exportToCSV = () => {
  alert('📊 CSV export started! Files will be downloaded shortly. (Mock functionality)')
  console.log('Exporting to CSV...', reportData.value)
}

const exportToPDF = () => {
  alert('📄 PDF report generated successfully! Download will begin shortly. (Mock functionality)')
  console.log('Exporting to PDF...', reportData.value)
}

// Initialize with current date
onMounted(() => {
  const today = new Date()
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  filters.value.startDate = weekAgo.toISOString().split('T')[0]
  filters.value.endDate = today.toISOString().split('T')[0]
  
  generateReport()
})
</script>