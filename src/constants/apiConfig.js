// API Configuration
// 
// OPTION 1: Use deployed backend (RECOMMENDED for physical devices)
// Set USE_DEPLOYED_BACKEND to true and provide your deployed URL
const USE_DEPLOYED_BACKEND = true; // ✅ Using deployed backend
const DEPLOYED_API_URL = 'https://backend-of-nemo.vercel.app'; 

// OPTION 2: Use local backend (for development)
// Only works when testing on emulator/simulator or same network
const COMPUTER_IP = '192.168.1.6'; // Your computer's IP address
const API_PORT = 5000;
const LOCAL_API_URL = `http://${COMPUTER_IP}:${API_PORT}`;

// Export the active API base URL
export const API_BASE_URL = USE_DEPLOYED_BACKEND ? DEPLOYED_API_URL : LOCAL_API_URL;
export const IMGBB_API_KEY = 'f29449e712111ed5e49dbc6e43c00d09';
// Helper to log which backend is being used
console.log('🔗 Using API:', USE_DEPLOYED_BACKEND ? 'DEPLOYED' : 'LOCAL', '-', API_BASE_URL);

