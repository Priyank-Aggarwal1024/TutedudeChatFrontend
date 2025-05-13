export const formatLastSeen = function (lastSeen) {
  const now = new Date();
  const diff = Math.floor((now - new Date(lastSeen)) / 1000);

  if (diff < 60) {
    return "Just now";
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} day${days === 1 ? "" : "s"}`;
  }
};
export const getFileType = (url) => {
  if (typeof url !== "string") return "unknown";

  const extension = url.split(".").pop().toLowerCase().split("?")[0];

  if (!extension) return "unknown";

  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension))
    return "image";

  if (["mp4", "webm", "ogg"].includes(extension)) return "video";

  if (["mp3", "wav", "ogg"].includes(extension)) return "audio";

  if (["pdf"].includes(extension)) return "pdf";

  if (["doc", "docx"].includes(extension)) return "word";

  if (["xls", "xlsx"].includes(extension)) return "excel";

  if (["ppt", "pptx"].includes(extension)) return "ppt";

  if (["txt"].includes(extension)) return "text";

  return "file";
};
export const convertTo12HourFormat = function (isoDateTime) {
  const date = new Date(isoDateTime);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO 8601 date-time format.");
  }
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;
  if (hours > 12) {
    hours = hours - 12;
  } else if (hours === 0) {
    hours = 12;
  }
  const formattedMinutes = String(minutes).padStart(2, "0");
  const amPm = isPM ? "PM" : "AM";
  return `${hours}:${formattedMinutes} ${amPm}`;
};

export const groupMessagesByDate = function (messages) {
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.timeSent) - new Date(b.timeSent)
  );
  const groupedMessages = [];
  let currentDate = null;
  const currentDateObj = new Date();
  const currentYear = currentDateObj.getFullYear();
  const todayDateString = currentDateObj.toLocaleDateString("en-US");
  const yesterdayDateObj = new Date(currentDateObj);
  yesterdayDateObj.setDate(currentDateObj.getDate() - 1);
  const yesterdayDateString = yesterdayDateObj.toLocaleDateString("en-US");
  sortedMessages.forEach((message) => {
    const messageDateObj = new Date(message.timeSent);
    let messageDate;
    const messageDateString = messageDateObj.toLocaleDateString("en-US");
    if (messageDateString === todayDateString) {
      messageDate = "Today";
    } else if (messageDateString === yesterdayDateString) {
      messageDate = "Yesterday";
    } else if (messageDateObj.getFullYear() === currentYear) {
      messageDate = messageDateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      messageDate = messageDateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    if (messageDate !== currentDate) {
      groupedMessages.push({ type: "divider", date: messageDate });
      currentDate = messageDate;
    }
    groupedMessages.push({ type: "message", data: message });
  });

  return groupedMessages.reverse();
};

export function formatDuration(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const padded = (num) => String(num).padStart(2, "0");

  if (hrs > 0) {
    return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
  } else {
    return `${padded(mins)}:${padded(secs)}`;
  }
}
