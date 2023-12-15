// AddedTime.tsx

import { useEffect, useState } from "react";

function AddedTime({ dateString }: any) {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const calculateRelativeTime = () => {
      const storedDate = new Date(dateString).getTime(); // Convert to number
      const currentDate = new Date().getTime(); // Convert to number

      const timeDifference = currentDate - storedDate - 14400000;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365);

      if (years > 0) {
        setRelativeTime(years === 1 ? "1 year ago" : `${years} years ago`);
      } else if (days > 0) {
        setRelativeTime(days === 1 ? "1 day ago" : `${days} days ago`);
      } else if (hours > 0) {
        setRelativeTime(hours === 1 ? "1 hour ago" : `${hours} hours ago`);
      } else if (minutes > 0) {
        setRelativeTime(
          minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`
        );
      } else if (seconds > 0) {
        setRelativeTime(
          seconds === 1 ? "1 second ago" : `${seconds} seconds ago`
        );
      } else {
        setRelativeTime("Just now");
      }
    };

    calculateRelativeTime();
  }, [dateString]);

  return <span>{relativeTime}</span>;
}

export default AddedTime;