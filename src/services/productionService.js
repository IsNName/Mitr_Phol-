import api from './api.js'

// Production Service
export const productionService = {
  // Dashboard data
  async getDashboardData() {
    try {
      // return await api.get('/dashboard')
      // Mock data for now
      return {
        yield: 87.5,
        loss: 12.5,
        efficiency: 92.3,
        alerts: 3,
        realTime: {
          temperature: 75.2,
          ph: 7.4,
          pressure: 2.3,
          status: 'Running'
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  },

  // Prediction & Simulation
  async predict(inputData) {
    try {
      // return await api.post('/predict', inputData)
      // Mock prediction
      await new Promise(resolve => setTimeout(resolve, 1500))
      return {
        type: 'prediction',
        yield: (85 + Math.random() * 10).toFixed(1),
        quality: (7 + Math.random() * 2).toFixed(1),
        recommendations: [
          'Optimize temperature to 72-78°C for better yield',
          'Monitor pH levels closely',
          'Consider increasing processing time by 0.5 hours'
        ]
      }
    } catch (error) {
      console.error('Error making prediction:', error)
      throw error
    }
  },

  async simulate(inputData) {
    try {
      // return await api.post('/simulate', inputData)
      // Mock simulation
      await new Promise(resolve => setTimeout(resolve, 2000))
      const baseYield = 85 + Math.random() * 10
      return {
        type: 'simulation',
        scenario: 'Optimistic production scenario based on current parameters',
        bestCase: (baseYield + 5).toFixed(1),
        expected: baseYield.toFixed(1),
        worstCase: (baseYield - 8).toFixed(1),
        recommendations: [
          'Current parameters show good potential',
          'Risk factor: pH variation may affect quality',
          'Recommend backup raw material preparation'
        ]
      }
    } catch (error) {
      console.error('Error running simulation:', error)
      throw error
    }
  },

  // Reports
  async getReports(filters) {
    try {
      // return await api.get('/reports', { params: filters })
      // Mock reports data
      const data = []
      const today = new Date()
      
      for (let i = 0; i < 15; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        const batch = {
          date: date.toISOString().split('T')[0],
          batchId: `B${String(Date.now() + i).slice(-6)}`,
          production: (150 + Math.random() * 100).toFixed(1),
          yield: (75 + Math.random() * 20).toFixed(1),
          quality: Math.floor(Math.random() * 5) + 1,
          temperature: (70 + Math.random() * 10).toFixed(1),
          ph: (6.5 + Math.random() * 2).toFixed(1),
          status: Math.random() > 0.8 ? 'Warning' : 'Completed'
        }
        data.push(batch)
      }
      
      return data
    } catch (error) {
      console.error('Error fetching reports:', error)
      throw error
    }
  },

  // Export functions
  async exportToCSV(data) {
    try {
      // return await api.post('/export/csv', data)
      console.log('Mock CSV export:', data)
      return { success: true, message: 'CSV export completed' }
    } catch (error) {
      console.error('Error exporting CSV:', error)
      throw error
    }
  },

  async exportToPDF(data) {
    try {
      // return await api.post('/export/pdf', data)
      console.log('Mock PDF export:', data)
      return { success: true, message: 'PDF export completed' }
    } catch (error) {
      console.error('Error exporting PDF:', error)
      throw error
    }
  }
}

// Settings Service
export const settingsService = {
  async getSettings() {
    try {
      // return await api.get('/settings')
      // Mock settings
      return {
        thresholds: {
          temperature: { minWarning: 65, maxWarning: 85, critical: 90 },
          ph: { minWarning: 6.5, maxWarning: 8.5, critical: 1.5 },
          yield: { poor: 70, good: 85, excellent: 95 }
        },
        modelSettings: {
          activeVersion: 'model_v2_3',
          confidenceThreshold: 85,
          predictionWindow: 24
        },
        notifications: {
          email: true,
          browser: false,
          criticalOnly: false
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      throw error
    }
  },

  async saveSettings(settings) {
    try {
      // return await api.put('/settings', settings)
      console.log('Mock save settings:', settings)
      return { success: true, message: 'Settings saved successfully' }
    } catch (error) {
      console.error('Error saving settings:', error)
      throw error
    }
  },

  async getAvailableModels() {
    try {
      // return await api.get('/models')
      return [
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
      ]
    } catch (error) {
      console.error('Error fetching models:', error)
      throw error
    }
  }
}