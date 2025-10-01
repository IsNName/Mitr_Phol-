<script setup></script>

<template>
  <div id="app" class="min-h-screen bg-gradient-hero">
    <!-- Navigation Bar -->
    <nav class="bg-white/90 backdrop-blur-md shadow-lg border-b border-primary-200">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h1 class="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Mitrphol Production System
              </h1>
            </div>
            <!-- Navigation Links -->
            <div class="hidden sm:ml-8 sm:flex sm:space-x-8">
              <router-link
                to="/"
                class="nav-link"
                active-class="nav-link-active"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z"></path>
                </svg>
                Dashboard
              </router-link>
              <router-link
                to="/prediction"
                class="nav-link"
                active-class="nav-link-active"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Prediction & Simulation
              </router-link>
              <router-link
                to="/reports"
                class="nav-link"
                active-class="nav-link-active"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Reports
              </router-link>
              <router-link
                to="/settings"
                class="nav-link"
                active-class="nav-link-active"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Settings
              </router-link>
            </div>
          </div>
          
          <!-- Right side - Status indicator -->
          <div class="flex items-center">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span class="text-sm text-accent-600 font-medium">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-8">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white/50 backdrop-blur-md border-t border-primary-200 mt-16">
      <div class="mx-auto max-w-7xl px-4 py-6">
        <div class="flex justify-between items-center">
          <p class="text-sm text-accent-600">
            © 2025 Mitrphol Production System. All rights reserved.
          </p>
          <div class="flex space-x-4 text-sm text-accent-500">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Last updated: {{ new Date().toLocaleDateString('th-TH') }}</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
