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
    newObj[a] = obj.get(a);
  });
  if (attrs.includes('objectId') || attrs.includes('id')) {
    newObj.objectId = obj.id;
  }
  return newObj;
};

export default util;
