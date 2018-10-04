<template>
  <div class="quality-thumbs">

    <el-button type="text" style="margin-right: 0.5em" @click="submitVoteUp" 
                :class="{ chosen: chosenVote == 'up' }">
      <span class="material-icons" >thumb_up</span>
      {{ voteUps }}
    </el-button>

    <el-button type="text" @click="submitVoteDown" :class="{ chosen: chosenVote == 'down' }">
      <span class="material-icons" style="margin-right: 0.15em">thumb_down</span>
      {{ voteDowns }}
    </el-button>

  </div>
</template>

<style lang="sass">
  .quality-thumbs
    .material-icons
      font-size: 1.6em
    .chosen
      color: black
</style>

<script>
const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

const LectureNote = Parse.Object.extend('LectureNote');
const ln = new LectureNote();
const query = new Parse.Query(ln);
const userId = Parse.User.current().id;

export default {
  name: 'QualityThumbs',
  props: {
    voteUp: Number,
    voteDown: Number,
    lectureId: String,
    chosen: String,
  },
  data() {
    return {
      voteUps: this.voteUp,
      voteDowns: this.voteDown,
      chosenVote: this.chosen,
    };
  },
  methods: {
    vote(upDown, lectureNote) {
      let upVoters = lectureNote.get('upVoters');
      let dwVoters = lectureNote.get('downVoters');
      if (upVoters === undefined) upVoters = [];
      if (dwVoters === undefined) dwVoters = [];
      const voters = upDown === 'up' ? upVoters : dwVoters;
      const oppositeVoters = upDown === 'up' ? dwVoters : upVoters;

      if (voters === [] || !voters.includes(userId)) {
        lectureNote.increment(upDown === 'up' ? 'voteUp' : 'voteDown');
        lectureNote.add(upDown === 'up' ? 'upVoters' : 'downVoters', userId);
        if (oppositeVoters.includes(userId)) {
          lectureNote.increment(upDown === 'up' ? 'voteDown' : 'voteUp', -1);
          lectureNote.remove(upDown === 'up' ? 'downVoters' : 'upVoters', userId);
        }
        lectureNote.save().then((updatedLecture) => {
          this.updateComponent(updatedLecture);
        });
      } else {
        lectureNote.increment(upDown === 'up' ? 'voteUp' : 'voteDown', -1);
        lectureNote.remove(upDown === 'up' ? 'upVoters' : 'downVoters', userId);
        lectureNote.save().then((updatedLecture) => {
          this.updateComponent(updatedLecture);
        });
      }
    },
    submitVoteUp() {
      query.get(this.lectureId)
        .then((lecture) => { this.vote('up', lecture); });
    },
    submitVoteDown() {
      query.get(this.lectureId)
        .then((lecture) => { this.vote('down', lecture); });
    },
    findMyVote(upVoters, downVoters) {
      // Find which vote the user did take
      if (upVoters.includes(userId)) return 'up';
      else if (downVoters.includes(userId)) return 'down';
      return false;
    },
    updateComponent(lectureNote) {
      this.voteUps = lectureNote.get('voteUp');
      this.voteDowns = lectureNote.get('voteDown');
      this.chosenVote = this.findMyVote(
        lectureNote.get('upVoters'), lectureNote.get('downVoters')
      );
    },
  },
};
</script>
