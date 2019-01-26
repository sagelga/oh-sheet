<template>
    <div class="footer">
      <img src="/img/logo-text-white.svg" class="logo" align="top">
      <p id="quote">{{ randomQuote.quote }}</p>
      <p id="author">{{ randomQuote.author }}</p>
    </div>
</template>

<style lang="sass" scoped>
.logo
  width: 150px
  display: block
  margin: 0 auto 1em
  padding: 0
.footer
  padding: 3em 1em
  background-color: #3c3c3c
  color: #FFF
  text-align: center
p
  &#quote
    font-style: italic
    line-height: 1.4em
    max-width: 400px
    margin: 0 auto
  &#author
    font-family: 'Neue Helvetica W31', sans-serif
    color: #989898
</style>
<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

const quote = [
  'จงกระหาย และ ทำตัวให้โง่ตลอดเวลา',
  'ใช้ชีวิตราวกับว่าคุณจะตายพรุ่งนี้ เรียนรู้ราวกับว่าคุณจะมีชีวิตอยู่ตลอดไป',
  'ความสำเร็จคือครูที่แย่มาก เพราะมันล่อลวงคนฉลาดให้คิดว่าพวกเขาไม่มีวันล้มเหลว',
  'จินตนาการสำคัญกว่าความรู้ เพราะความรู้นั้นมีจำกัด แต่จินตนาการมีอยู่ทุกพื้นที่บนโลก',
  'เราก้าวเดินไปข้างหน้า เปิดประตูบานใหม่ๆ และทำในสิ่งใหม่ๆ เพราะคนเป็นสิ่งมีชีวิตที่อยากรู้อยากเห็น และเจ้าความอยากรู้อยากเห็นนี่เองที่นำพาเราไปสู่หนทางใหม่ๆ',
  'ฉันจะเป็นเจ้าแห่งโจรสลัด',
  'ถ้ามัวแต่จะพูดถึงจุดจบที่สวยหรู สู้ใช้ชีวิตต่อไปอย่างสวยงามจนกว่าจะถึงจุดจบไม่ดีกว่าเหรอ',
  'ชีวิตก็เหมือนกล่องช็อกโกแลตหลากรส คุณไม่มีทางรู้เลยว่าคุณจะหยิบเจอรสอะไร',
  'ไม่ใช่ความสามารถหรอกที่บอกว่าเราเป็นใคร แต่มันอยู่ที่เราเลือกต่างหาก',
  'การหัวเราะใส่ตัวเอง คือ การรักตัวเอง'];
const author = ['สตีฟ จอบส์', 'มหาตมะ คานธี', 'บิลล์ เกตส์', 'อัลเบิร์ต ไอน์สไตน์',
  'วอลท์ ดิสนีย์', 'มังกี้ ดี ลูฟี่', 'ซากาตะ กินโทกิ', 'ฟอเรสท์ กัมพ์', 'อัลบัส ดัมเบิลดอร์',
  'มิกกี้ เม้าส์'];

export default {
  name: 'Footer',
  components: {
    BoxedContainer,
  },
  computed: {
    randomQuote() {
      const randomValue = Math.floor(Math.random() * quote.length);
      const quoteRandom = quote[randomValue];
      return { quote: quoteRandom, author: author[randomValue] };
    },
  },
};
</script>
