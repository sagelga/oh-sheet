<template>
  <div class="quality-thumbs">

    <el-button type="text" style="margin-right: 0.5em">
      <span class="material-icons">thumb_up</span>
      <span id="voteUp"></span>
    </el-button>

    <el-button type="text">
      <span class="material-icons" style="margin-right: 0.15em">thumb_down</span>
      <span id="voteDown"></span>
    </el-button>

  </div>
</template>

<style lang="scss">
  .quality-thumbs {
    .material-icons {
      font-size: 1.6em;
    }
  }
</style>

<script>
const Parse = require('parse/dist/parse.min');

Parse.initialize('A7gOtAmlXetuUbCejDVjEPiyMJpR4ET9TSjDHiqP', 'UaRg8CWpNhY9WbkDk93Ki6LQZ7ssnQfVRMXYyRJr');
Parse.serverURL = 'https://parseapi.back4app.com/';

const LectureNote = Parse.Object.extend('LectureNote');
const query = new Parse.Query(LectureNote);
query.equalTo('objectId', 'azDugQ1izn');
query.find().then((results) => {
  const voteUp = results[0].attributes.voteUp;
  const voteDown = results[0].attributes.voteDown;
  console.log(voteUp);
  console.log(voteDown);
});

export default {
  name: 'QualityThumbs',
};
</script>
