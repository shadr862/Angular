import { InjectionToken } from '@angular/core';

export const localStorageToken = new InjectionToken<Storage | null>('localStorage', {
  providedIn: 'root',
  factory: () => {
    // Only accessed at runtime when needed
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    return null;
  },
});
