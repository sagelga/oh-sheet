/* eslint-disable prefer-template */
const util = {};

util.findMyVote = (upVoters, downVoters, userId) => {
  // Find which vote the user did take
  if (upVoters.includes(userId)) return 'up';
  else if (downVoters.includes(userId)) return 'down';
  return '';
};

util.getObjWithAttrs = (obj, attrs) => {
  // Returns LectureNote with desired attributes
  const newObj = {};
  attrs.forEach((a) => {
    if (a !== 'id' && a !== 'objectId') newObj[a] = obj.get(a);
    else newObj.objectId = obj.id;
  });
  return newObj;
};

util.isATomorrowOfB = (testDate, baseDate) => {
  const baseDateTmr = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1);
  const yearIsEqual = baseDateTmr.getYear() === testDate.getYear();
  const monthIsEqual = baseDateTmr.getMonth() === testDate.getMonth();
  const dateIsEqual = baseDateTmr.getDate() === testDate.getDate();
  if (yearIsEqual && monthIsEqual && dateIsEqual) return true;
  return false;
};

util.isASameDayAsB = (testDate, baseDate) => {
  const yearIsEqual = baseDate.getYear() === testDate.getYear();
  const monthIsEqual = baseDate.getMonth() === testDate.getMonth();
  const dateIsEqual = baseDate.getDate() === testDate.getDate();
  if (yearIsEqual && monthIsEqual && dateIsEqual) return true;
  return false;
};

util.dateStrToObj = (dateStr) => {
  // Convert '2018-08-06T17:00:00.000Z' to Date
  const y = parseInt(dateStr.slice(0, 4), 10);
  const m = parseInt(dateStr.slice(5, 7), 10);
  const d = parseInt(dateStr.slice(8, 10), 10);
  return new Date(y, m - 1, d);
};

util.dateObjToStr = (dateObj) => {
  // Convert Date object to '2018-08-06'
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();
  const mStr = m < 10 ? '0' + m : m;
  const dStr = d < 10 ? '0' + d : d;
  return `${dateObj.getFullYear()}-${mStr}-${dStr}`;
};

util.getNewCategory = (formCatList, storeCatList) => {
  // Find newly created lecture category that are not on Parse yet
  const currentCat = storeCatList.map(c => c.objectId);
  return formCatList.filter(c => !currentCat.includes(c));
};

export default util;
