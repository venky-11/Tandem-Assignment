// utils/stoppages.js
import { differenceInMinutes } from 'date-fns';

export const identifyStoppages = (data, threshold) => {
  const stoppages = [];
  let currentStoppage = null;

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1];
    const curr = data[i];

    if (prev.latitude === curr.latitude && prev.longitude === curr.longitude) {
      const duration = differenceInMinutes(curr.timestamp, prev.timestamp);

      if (duration >= threshold) {
        if (!currentStoppage) {
          currentStoppage = { start: prev.timestamp, latitude: prev.latitude, longitude: prev.longitude };
        }
        currentStoppage.end = curr.timestamp;
        currentStoppage.duration = differenceInMinutes(currentStoppage.end, currentStoppage.start);
      }
    } else if (currentStoppage) {
      stoppages.push(currentStoppage);
      currentStoppage = null;
    }
  }

  if (currentStoppage) {
    stoppages.push(currentStoppage);
  }

  return stoppages;
};
