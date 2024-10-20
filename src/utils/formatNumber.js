// src/utils/formatNumber.js

export function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num); // Formats number as per US conventions
  }
  