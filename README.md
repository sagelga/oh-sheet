# Project PONY : ระบบแชร์สรุปบทเรียนออนไลน์
## Project Abstracts ความสำคัญและที่มาของระบบ
เนื่องจากปัญหาที่ว่าผู้ใช้งานต้องการอ่านสรุปบทเรียน เพื่อให้ตามการเรียนในห้องเรียนทัน หรือทำการอ่านทบทวนเพื่อสอบ ซึ่งวิธีดั้งเดิมนั่นก็คือ การขอสรุปของเพื่อน และนำไปถ่ายเอกสาร หรือให้เพื่อนส่งไฟล์ที่จดสรุปมาให้ตนผ่าน PDF แต่การขอเพื่อนคนอื่นๆ เป็นเรื่องที่ผู้ใช้งานหลายๆคนรู้สึกเกรงใจ

โดยถ้าผู้ใช้งานได้ทำการเอาสรุปมาจากเพื่อนแล้ว ก็อาจจะได้รับคำอธิบายที่เข้าใจได้ง่ายกว่า หรือ ความรู้ที่เราไม่ได้จดหรือจดไม่ทัน

ระบบนี้จึงเกิดขึ้นมาจากความคิดของทีมผู้พัฒนา ว่าต้องการลดช่องว่างนั้น โดยการจัดทำระบบแชร์สรุปบทเรียนนั่นเอง

โดยเป้าหมายของระบบที่เราต้องการตอบโจทย์นั่นคือ :
- ได้ความรู้เพิ่มเติมจากสรุปบทเรียนของผู้ใช้อื่น
- ทำให้การหาสรุปและแจกจ่ายบทเรียนสามารถกระทำได้สะดวก
- เปิดโอกาสทางการศึกษามากขึ้น
- ให้ผู้ใช้สามารถปรับปรุงการจดบันทึกด้วยวิธีสังเกตผู้ใช้งานอื่นได้
- เพื่มความสะดวกและลดอคติในการเรียนรู้ให้แก่ผู้ใช้งาน

และเราคาดหวังว่า ผู้ใช้งานที่ได้ใช้งานระบบนั้นจะได้ประโยชน์จากการใช้งาน และร่วมสนับสนุนการพัฒนาระบบต่อๆไป

## Features ฟีเจอร์ของระบบ
โดยฟีเจอร์หลักนั้นมีดังนี้
- ดูสรุปบทเรียน
- อัปโหลดสรุปบทเรียนของตนเอง
- สมัครสมาชิก เพื่อที่จะสามารถเข้าสู่ระบบและเป็นสมาชิกของระบบได้
- เรียกดูสรุปบทเรียนตามตัวกรองที่เลือก

และอื่นๆ อีกมากมายที่กำลังตามมา เพื่อจะมาตอบโจทย์ความต้องการของผู้ใช้งาน

## How to use วิธีการใช้งาน
ในขณะนี้ เราได้ทำการ host เว็บไซต์ของเราไว้ที่ [https://ohsheet.xyz/](https://ohsheet.xyz/)

## How to install วิธีการเปิดใช้งาน
```
# Install dependencies (required on first run):
npm install

# Start the development server:
npm run serve

# Build the for production:
npm run build
```

## Technology
เราได้ใช้ VueJS เพื่อมาทำเว็บไซต์หลัก<br>
และใช้ ElementJS เพื่อมาเป็น framework ในการทำงาน

ในฝั่งของ database เราใช้ MongoDB เพื่อจัดการข้อมูลบนเว็บ<br>
สำหรับในการจัดเก็บ lecture เราได้ทำการใช้ [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/)

## CI Checking ระบบเช็ค Integration อัตโนมัติ
เราใช้ CircleCI เพื่อทำการเช็คการทำงานของโค้ดว่าทำงานได้หรือไม่<br>
โดยได้แยกการเช็คออกมาเป็น release branch (sprint) ดังนี้

| master                                                                                                                                                                                                                                        | release/sprint-1                                                                                                                                                                                                                                                      | release/sprint-2                                                                                                                                                                                                                                                      | release/sprint-3<br>`Current Sprint`                                                                                                                                                                                                                                  | release/sprint-4                                                                                                                                                                                                                                                      |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 SEP - 2 DEC                                                                                                                                                                                                                                 | 3 SEP - 23 SEP                                                                                                                                                                                                                                                        | 1 OCT - 21 OCT                                                                                                                                                                                                                                                        | 22 OCT - 11 NOV                                                                                                                                                                                                                                                       | 12 NOV - 2 DEC                                                                                                                                                                                                                                                        |
| [![CircleCI](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/master.svg?style=svg&circle-token=4a79d7cd87beaeab28be229919c50730893c5a6b)](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/master) | [![CircleCI](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-1.svg?style=svg&circle-token=4a79d7cd87beaeab28be229919c50730893c5a6b)](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-1) | [![CircleCI](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-2.svg?style=svg&circle-token=4a79d7cd87beaeab28be229919c50730893c5a6b)](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-2) | [![CircleCI](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-3.svg?style=svg&circle-token=4a79d7cd87beaeab28be229919c50730893c5a6b)](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-3) | [![CircleCI](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-4.svg?style=svg&circle-token=4a79d7cd87beaeab28be229919c50730893c5a6b)](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-4) |

## Links
### Issue Tracker + Agile Board
เราใช้ YouTrack เพื่อจัดการ Issue และทำ Agile โดยสามารถเข้าไปดูได้ที่ [http://kumakumamon.me/agiles/](http://kumakumamon.me/agiles/)

สำหรับเพื่อนๆ หรือ อาจารย์ที่ต้องการเข้าไปดูงาน ก็สามารถ login ด้วย guest credetial ได้ โดยการกด Login > Log in as guest

## Team Members ทีมงานคุณภาพ
We are team My Little Pony (Team #17) from IT KMITL

| Profile Picture<br>รูปโปรไฟล์                            | Full Name<br>ชื่อจริง                                    | Student ID<br>รหัสนักศึกษา | GitHub Username<br>บัญชี GitHub              |
|--------------------------------------------------------|-------------------------------------------------------|-------------------------|--------------------------------------------|
| <img src="img/profile-pic/59070022.png" height="75px"> | Kunanon Srisuntiroj<br>คุณานนต์ ศรีสันติโรจน์               | 59070022                | [@sagelga](https://github.com/sagelga)     |
| <img src="img/profile-pic/59070043.png" height="75px"> | Thitipat Worrarat<br>ฐิติภัทร วรรัตน์                      | 59070043                | [@ynhof6](https://github.com/ynhof6)       |
| <img src="img/profile-pic/59070084.png" height="75px"> | Napasin Hongngern<br>นภสินธุ์ หงษ์เงิน                     | 59070084                | [@tiltgod](https://github.com/tiltgod)     |
| <img src="img/profile-pic/59070087.png" height="75px"> | Nathan Yiangsupapaanontr<br>นาธาร เยี่ยงศุภพนนทร์         | 59070087                | [@dobakung](https://github.com/dobakung)   |
| <img src="img/profile-pic/59070117.png" height="75px"> | Patcharaphorn Lertvirul<br>พัชรพร เลิศวิรุฬห์              | 59070117                | [@kukkikkpl](https://github.com/kukkikkpl) |
| <img src="img/profile-pic/59070120.png" height="75px"> | Pimpitcha Pitichotchokphokhin<br>พิมพ์พิชชา ปิติโชติโชคโภคิน | 59070120                | [@anjo120](https://github.com/anjo120)     |

### อาจารย์ที่ปรึกษา
ผศ.ดร.ธีรพงศ์ ลีลานุภาพ

<img src="img/profile-pic/KimLee.jpg" height="75px">

---

รายงาน ซอร์สโค้ด และข้อมูลทางสารสนเทศที่เกี่ยวข้อง<br>
เป็นส่วนหนึ่งของโครงงานวิชา วิศวกรรมซอฟท์แวร์ (Software Engineering) รหัสวิชา 06016219<br>
หลักสูตรวิทยาศาสตร์บัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ<br>
ภาคเรียนที่ 1 ปีการศึกษา 2561<br>
คณะเทคโนโลยีสารสนเทศ<br>
สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
