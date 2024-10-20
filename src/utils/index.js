/**
 * Formats a number into a human-readable string with Indian numbering system (e.g., 1K, 1L, 1Cr).
 * @param {number} num - The number to format.
 * @returns {string} - The formatted number as a string.
 */

const formatNumberInRupees = (num) => {
    if (num >= 1e7) {  // 1 crore or more
      return (num / 1e7).toFixed(1).replace(/\.0$/, "") + "Cr";
    }
    if (num >= 1e5) {  // 1 lakh or more
      return (num / 1e5).toFixed(1).replace(/\.0$/, "") + "L";
    }
    if (num >= 1e3) {  // 1 thousand or more
      return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();  // For numbers below 1 thousand
  };
  
  export default formatNumberInRupees;
  