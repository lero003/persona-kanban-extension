chrome.runtime.onInstalled.addListener(() => {
  console.log('Persona Kanban installed');
});

chrome.alarms.onAlarm.addListener(alarm => {
  chrome.notifications.create(alarm.name, {
    type: 'basic',
    iconUrl: 'icons/icon_48.png',
    title: 'Kanban Reminder',
    message: '期限が近いカードがあります',
    priority: 2
  });
});