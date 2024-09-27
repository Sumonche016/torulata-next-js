export function formatTime(timeString) {
  const date = new Date(timeString);

  // Get day name
  const dayName = date.toLocaleString("en-US", { weekday: "long" });

  // Get date
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Format the time
  const formattedTime = `${dayName}, ${month} ${day}, ${year}`;

  return formattedTime;
}
