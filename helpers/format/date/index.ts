// A function that converts a date with “YYYY-MM-DDTHH:mm:ssZ” format to date with “dddd MM/DD/YYYY” format
export const getDateFormat = (date: string) => {
  let dateObj = new Date(date);

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the weekday name from the array
  let weekday = weekdays[dateObj.getDay()];

  // Get the month, day and year from the date object
  let month: string | number = dateObj.getMonth() + 1; // Add 1 because months are zero-based
  let day: string | number = dateObj.getDate();
  let year = dateObj.getFullYear();

  // Pad the month and day with leading zeros if they are single digits
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return weekday + " " + month + "/" + day + "/" + year;
};
