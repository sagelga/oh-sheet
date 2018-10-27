import store from '@/store';
import ut from './util';

const Parse = require('parse/dist/parse.min');

Parse.initialize(store.state.parseCred.appId, store.state.parseCred.jsKey);
Parse.serverURL = store.state.parseCred.serverUrl;

const ph = {};

const LectureNote = Parse.Object.extend('LectureNote');
const LectureCategory = Parse.Object.extend('LectureCategory');
const LectureLevel = Parse.Object.extend('LectureLevel');
const LectureReport = Parse.Object.extend('LectureReport');

ph.getRecentLectures = async (n) => {
  // Get n recent lectures
  // Returns Array<LectureNote>
  const query = new Parse.Query(LectureNote);
  query.include('author');
  query.limit(n);
  const lectureNotes = await query.find();
  return lectureNotes;
};

ph.getLectureNote = async (noteId) => {
  // Returns LectureNote
  const lectureQuery = new Parse.Query(LectureNote);
  lectureQuery.equalTo('objectId', noteId);
  lectureQuery.include('author');
  // TODO: Add categories relation
  // TODO: Add levels relation
  const lectureNote = await lectureQuery.first();
  return lectureNote;
};

ph.getFavedLectures = async (userId) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo('objectId', userId);
  query.include('favedNotes');
  const user = await query.first();
  return user.get('favedNotes');
};

ph.getUserProfile = async (username) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo('username', username);
  const user = await query.first();
  return user;
};

ph.getLecturesOfUserPointer = async (user) => {
  const query = new Parse.Query(LectureNote);
  query.equalTo('author', user);
  const lectureNotes = await query.find();
  return lectureNotes;
};

ph.getLectureCategories = async () => {
  const query = new Parse.Query(LectureCategory);
  return query.find();
};

ph.searchForLectures = async (title, levelId, categoryId) => {
  const query = new Parse.Query(LectureNote);
  if (title) query.fullText('title', title);
  if (levelId) {
    const level = new LectureLevel();
    level.id = levelId;
    query.equalTo('levels', level);
  }
  if (categoryId) {
    const category = new LectureCategory();
    category.id = categoryId;
    query.equalTo('categories', category);
  }
  query.include('author');
  return query.find();
};

ph.saveLectureNote = async (data, userId) => {
  const note = new LectureNote();
  const authorPointer = new Parse.User().set('objectId', userId);
  const excludedFields = ['levelId', 'category', 'categoryId'];

  const fields = Object.keys(data);
  fields.forEach((f) => {
    if (!excludedFields.includes(f)) note.set(f, data[f]);
  });
  note.set('author', authorPointer);

  const level = new LectureLevel();
  level.id = data.levelId;
  note.relation('levels').add(level);

  data.categoryId.forEach((c) => {
    const category = new LectureCategory();
    category.id = c;
    note.relation('categories').add(category);
  });

  return note.save();
};

ph.isRemotelyFaved = async (noteId, userId) => {
  // Returns Boolean
  const favStatusQuery = new Parse.Query(Parse.User);
  favStatusQuery.equalTo('objectId', userId);
  const user = await favStatusQuery.first();
  const favedNotes = user.get('favedNotes');
  if (favedNotes === undefined) return false;
  const favedNoteIds = [];
  favedNotes.forEach((n) => {
    favedNoteIds.push(n.id);
  });
  return favedNoteIds.includes(noteId);
};

ph.updateLoginStreak = async (user) => {
  // Should only be called when a User is present
  await user.fetch().then((fetchedUser) => {
    let achm = fetchedUser.get('achievements');
    const today = new Date();
    if (achm === undefined) achm = {};
    if (achm.loginStreak !== undefined && achm.loginStreak.length !== 0) {
      const lastDayStr = achm.loginStreak[achm.loginStreak.length - 1];
      const lastDay = ut.dateStrToObj(lastDayStr);
      if (ut.isATomorrowOfB(today, lastDay)) {
        achm.loginStreak.push(today);
        achm.maxLoginStreak = achm.loginStreak.length;
      } else if (!ut.isASameDayAsB(today, lastDay)) {
        achm.loginStreak = [today];
      }
    } else {
      achm.loginStreak = [today];
      achm.maxLoginStreak = 1;
    }
    fetchedUser.set('achievements', achm);
    return fetchedUser.save();
  });
};

ph.createLectureCategory = async (name) => {
  const category = new LectureCategory();
  category.set({ englishName: name, value: name });
  return category.save();
};

ph.submitLectureReport = async (noteId, reason) => {
  const lecture = new LectureNote().set('id', noteId);
  const report = new LectureReport().set({ lectureNote: lecture, reason });
  return report.save();
};

export default ph;
