function sendNotification(title: string, message: string) {
  chrome.notifications.create("", {
    title,
    message,
    iconUrl: "/icons/icon.png",
    type: "basic",
  });
}

export { sendNotification };
