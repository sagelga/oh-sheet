import store from '@/store';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

const ph = {};

ph.getRecentLectures = async (n) => {
  // Get n recent lectures
  // Returns Array<LectureNote>
  const LectureNote = Parse.Object.extend('LectureNote');
  const query = new Parse.Query(LectureNote);
  query.include('author');
  query.limit(n);
  const lectureNotes = await query.find();
  return lectureNotes;
};

ph.getLectureNote = async (noteId) => {
  // Returns LectureNote
  const LectureNote = Parse.Object.extend('LectureNote');
  const lectureQuery = new Parse.Query(LectureNote);
  lectureQuery.equalTo('objectId', noteId);
  lectureQuery.include('author');
  const lectureNote = await lectureQuery.first();
  return lectureNote;
};

ph.getUserProfile = async (username) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo('username', username);
  const user = await query.first();
  return user;
};

ph.getLecturesOfUserPointer = async (user) => {
  const LectureNote = Parse.Object.extend('LectureNote');
  const query = new Parse.Query(LectureNote);
  query.equalTo('author', user);
  const lectureNotes = await query.find();
  return lectureNotes;
};

ph.saveLectureNote = async (data, userId) => {
  const Lecture = Parse.Object.extend('LectureNote');
  const note = new Lecture();
  const authorPointer = new Parse.User().set('objectId', userId);

  const fields = Object.keys(data);
  fields.forEach((f) => {
    note.set(f, data[f]);
  });
  note.set('author', authorPointer);

  return note.save();
};

ph.isRemotelyFaved = async (noteId, userId) => {
  // Returns Boolean
  const favStatusQuery = new Parse.Query(Parse.User);
  favStatusQuery.equalTo('objectId', userId);
  const user = await favStatusQuery.first();
  const favedNotes = user.get('favedNotes');
  return favedNotes.includes(noteId);
};

export default ph;
