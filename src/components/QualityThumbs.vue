<template>
  <div class="quality-thumbs">

    <el-button type="text" style="margin-right: 0.5em" @click="submitVoteUp"
                :class="{ chosen: chosenVote === 'up', disabled: userId == null }">
      <span class="material-icons" >thumb_up</span>
      {{ voteUps }}
    </el-button>

    <el-button type="text" @click="submitVoteDown"
               :class="{ chosen: chosenVote === 'down', disabled: userId == null }">
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
    color: #003d7d
    .material-icons
      text-shadow: 0 0 6px rgba(0,0,0,0.3)
  .el-button.disabled
    cursor: default
    color: #3c3c3c
    &:hover
      color: #3c3c3c
</style>

<script>
const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

const LectureNote = Parse.Object.extend('LectureNote');
const ln = new LectureNote();
const query = new Parse.Query(ln);

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
      userId: Parse.User.current() ? Parse.User.current().id : null,
    };
  },
  methods: {
    vote(upDown, lectureNote) {
      if (this.userId) {
        let upVoters = lectureNote.get('upVoters');
        let dwVoters = lectureNote.get('downVoters');
        if (upVoters === undefined) upVoters = [];
        if (dwVoters === undefined) dwVoters = [];
        const voters = upDown === 'up' ? upVoters : dwVoters;
        const oppositeVoters = upDown === 'up' ? dwVoters : upVoters;

        if (voters === [] || !voters.includes(this.userId)) {
          lectureNote.increment(upDown === 'up' ? 'voteUp' : 'voteDown');
          lectureNote.add(upDown === 'up' ? 'upVoters' : 'downVoters', this.userId);
          if (oppositeVoters.includes(this.userId)) {
            lectureNote.increment(upDown === 'up' ? 'voteDown' : 'voteUp', -1);
            lectureNote.remove(upDown === 'up' ? 'downVoters' : 'upVoters', this.userId);
          }
          lectureNote.save().then((updatedLecture) => {
            this.updateComponent(updatedLecture);
          });
        } else {
          lectureNote.increment(upDown === 'up' ? 'voteUp' : 'voteDown', -1);
          lectureNote.remove(upDown === 'up' ? 'upVoters' : 'downVoters', this.userId);
          lectureNote.save().then((updatedLecture) => {
            this.updateComponent(updatedLecture);
          });
        }
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
      if (upVoters.includes(this.userId)) return 'up';
      else if (downVoters.includes(this.userId)) return 'down';
      return false;
    },
    updateComponent(lectureNote) {
      this.voteUps = lectureNote.get('voteUp');
      this.voteDowns = lectureNote.get('voteDown');
      this.chosenVote = this.findMyVote(lectureNote.get('upVoters'), lectureNote.get('downVoters'));
    },
  },
};
</script>
