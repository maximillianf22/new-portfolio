export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
  }
};

// Extender la interfaz Window para incluir dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}




