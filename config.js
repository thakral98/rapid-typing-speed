// SpeedType Studio Supabase & API Configuration Template
// Insert your Supabase credentials below to connect your project.
// If left blank, the application will automatically fall back to local offline mode.

const SUPABASE_CONFIG = {
  url: "https://idgrwpqvyzrjvwzgvrrs.supabase.co", // Example: "https://your-project-id.supabase.co"
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkZ3J3cHF2eXpyanZ3emd2cnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MTU4MTYsImV4cCI6MjA5NzI5MTgxNn0.Jf_xhp9-81hHGO94_9bN9JNwvy71CNT_hFuClhAfBxo" // Example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};

// Export configuration globally for script.js
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
