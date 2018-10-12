const util = {};

util.findMyVote = (upVoters, downVoters, userId) => {
  // Find which vote the user did take
  if (upVoters.includes(userId)) return 'up';
  else if (downVoters.includes(userId)) return 'down';
  return '';
};

util.getLectureNoteWithAttrs = (lecture, attrs) => {
  // Returns LectureNote with desired attributes
  const newLecture = {};
  attrs.forEach((a) => {
    newLecture[a] = lecture.get(a);
  });
  if (attrs.includes('objectId') || attrs.includes('id')) {
    newLecture.objectId = lecture.id;
  }
  return newLecture;
};

export default util;
