export const baseUrl = process.env.BASE_URL



// The fallback is the URL to Nhost's demo backend
// Create an .env file or set an environment variable to override this
// NOTE: this file might be importent in both the fronent or the Nhost backend functions
export const nhostBackendUrl = process.env.NHOST_BACKEND_URL || process.env.VUE_APP_NHOST_BACKEND_URL || 'https://coypfuuqevipuxgzsyth.nhost.run'
