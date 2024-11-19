/**
 * Formats a Date object into a string in the format day-month-year.
 * @param {Date} date - The date to format.
 * @returns {string} Formatted date string.
 */
export const formatDate = (date) => {
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  /**
   * Formats a date string into YYYY-MM-DD format.
   * @param {string} dateString - The date string to format.
   * @returns {string} Formatted date or 'Invalid Date'.
   */
  export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  /**
   * Gets initials from a full name.
   * @param {string} fullName - The full name to extract initials from.
   * @returns {string} Initials of the provided full name.
   */
  export function getInitials(fullName) {
    if (!fullName) return "";
    const names = fullName.split(" ");
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
    return initials.join("");
  }
  
  // Mapping styles for priority levels
  export const PRIORITY_STYLES = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-blue-600",
  };
  
  // Mapping styles for task types
  export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
  };
  
  // Array of background styles
  export const BGS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
  ];
  