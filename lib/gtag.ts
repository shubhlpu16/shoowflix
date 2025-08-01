// lib/gtag.js
export const GA_TRACKING_ID = 'AW-17423608951'

// Call this function to track page views
// @ts-ignore
export const pageview = (url) => {
  //@ts-ignore
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}
