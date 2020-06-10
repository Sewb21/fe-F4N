export const getIconDetails = (skillName) => {
  const skills = {
    accounts: { name: 'account-balance', type: 'material' },
    secretarial: { name: 'work', type: 'material' },
    typing: { name: 'keyboard', type: 'material' },
    proofreading: { name: 'visibility', type: 'material' },
    electrics: { name: 'flash-on', type: 'material' },
    roofing: { name: 'home', type: 'material' },
    cleaning: { name: 'bucket', type: 'entypo' },
    plumbing: { name: 'build', type: 'material' },
    'painting and decorating': { name: 'format-paint', type: 'material' },
    computers: { name: 'computer', type: 'material' },
    gardening: { name: 'local-florist', type: 'material' },
    'flat pack': { name: 'build', type: 'material' },
    photography: { name: 'camera-enhance', type: 'material' },
    videography: { name: 'theaters', type: 'material' },
    sewing: { name: 'accessibility', type: 'material' },
    baking: { name: 'cake', type: 'material' },
    caligraphy: { name: 'create', type: 'material' },
    tiling: { name: 'build', type: 'material' },
    'make up artist': { name: 'face', type: 'material' },
  };
  return skills[skillName];
}

export const elapsedTimeString = (dtPosted) => {
  const dtCurrent = new Date();
  const timeDifference = dtCurrent - dtPosted;
  const years = Math.floor(timeDifference / (12 * 30 * 24 * 60 * 60 * 1000));
  let remainder = timeDifference % (12 * 30 * 24 * 60 * 60 * 1000);
  const months = Math.floor(remainder / (30 * 24 * 60 * 60 * 1000));
  remainder = remainder % (30 * 24 * 60 * 60 * 1000);
  const days = Math.floor(remainder / (24 * 60 * 60 * 1000));
  remainder = remainder % (24 * 60 * 60 * 1000);
  const hours = Math.floor(remainder / (60 * 60 * 1000));
  remainder = remainder % (60 * 60 * 1000);
  const minutes = Math.floor(remainder / (60 * 1000));
  remainder = remainder % (60 * 1000);
  const seconds = Math.floor(remainder / 1000);
  let responseArr = [];
  if (years === 1) {
    responseArr.push(years + ' year');
  } else if (years >= 2) {
    responseArr.push(years + ' years');
  }
  if (months === 1) {
    responseArr.push(months.toString() + ' month');
  } else if (months >= 2) {
    responseArr.push(months.toString() + ' months');
  }
  if (days === 1) {
    responseArr.push(days.toString() + ' day');
  } else if (days >= 2) {
    responseArr.push(days.toString() + ' days');
  }
  if (hours === 1) {
    responseArr.push(hours.toString() + ' hour');
  } else if (hours >= 2) {
    responseArr.push(hours.toString() + ' hours');
  }
  if (minutes === 1) {
    responseArr.push(minutes.toString() + ' minute');
  } else if (minutes >= 2) {
    responseArr.push(minutes.toString() + ' minutes');
  }
  if (seconds === 1) {
    responseArr.push(seconds.toString() + ' second');
  } else if (seconds >= 2) {
    responseArr.push(seconds.toString() + ' seconds');
  }

  if (responseArr.length === 0) {
    return 'Just posted';
  } else if (responseArr.length === 1) {
    return responseArr[0] + ' ago';
  } else {
    return responseArr[0] + ', ' + responseArr[1] + ' ago';
  }
};

