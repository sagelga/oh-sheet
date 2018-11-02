<template>
    <div class="body">
      <img src="/img/Oh_sheet_logo_for_footer_crop.JPG" class="logo" align="top">
      <p id="quote" style="font-size: 36px;"></p><br>
      <p id="author"></p>
    </div>
</template>

<style scoped>
  .logo {
    height: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
  }
  .body {
    background-color: #3c3c3c;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
  a:link {
    color: white;
    background-color: transparent;
  }
  p, p1 {
    color: #FFFFFF;
    margin-top:0;
    margin-bottom: 0;
    font-size: 16px;
  }
</style>
<script>
import BoxedContainer from '@/components/BoxedContainer.vue';

export default {
  name: 'Footer',
  components: {
    BoxedContainer,
  },
  methods: {
    randomQuote() {
      const quote = ['จงกระหาย และ ทำตัวให้โง่ตลอดเวลา', 'ใช้ชีวิตราวกับว่าคุณจะตายพรุ่งนี้ เรียนรู้ราวกับว่าคุณจะมีชีวิตอยู่ตลอดไป', 'ความสำเร็จคือครูที่แย่มาก เพราะมันล่อลวงคนฉลาดให้คิดว่าพวกเขาไม่มีวันล้มเหลว', 'จินตนาการสำคัญกว่าความรู้ เพราะความรู้นั้นมีจำกัด แต่จินตนาการมีอยู่ทุกพื้นที่บนโลก',
        'เราก้าวเดินไปข้างหน้า เปิดประตูบานใหม่ๆ และทำในสิ่งใหม่ๆ เพราะคนเป็นสิ่งมีชีวิตที่อยากรู้อยากเห็น และเจ้าความอยากรู้อยากเห็นนี่เองที่นำพาเราไปสู่หนทางใหม่ๆ', 'ฉันจะเป็นเจ้าแห่งโจรสลัด', 'ถ้ามัวแต่จะพูดถึงจุดจบที่สวยหรู สู้ใช้ชีวิตต่อไปอย่างสวยงามจนกว่าจะถึงจุดจบไม่ดีกว่าเหรอ',
        'ชีวิตก็เหมือนกล่องช็อกโกแลตหลากรส คุณไม่มีทางรู้เลยว่าคุณจะหยิบเจอรสอะไร', 'ไม่ใช่ความสามารถหรอกที่บอกว่าเราเป็นใคร แต่มันอยู่ที่เราเลือกต่างหาก', 'การหัวเราะใส่ตัวเอง คือ การรักตัวเอง'];
      const author = ['สตีฟ จอบส์', 'มหาตมะ คานธี', 'บิลล์ เกตส์', 'อัลเบิร์ต ไอน์สไตน์', 'วอลท์ ดิสนีย์', 'มังกี้ ดี ลูฟี่', 'ซากาตะ กินโทกิ', 'ฟอเรสท์ กัมพ์', 'อัลบัส ดัมเบิลดอร์', 'มิกกี้ เม้าส์'];
      const randomValue = Math.floor(Math.random() * quote.length);
      const quoteRandom = quote[randomValue];
      document.getElementById('quote').innerText = quoteRandom;
      document.getElementById('author').innerText = author[randomValue];
    },
  },
  mounted() {
    this.randomQuote();
  },
};
</script>
