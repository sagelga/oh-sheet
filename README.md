# Project PONY (ระบบแชร์สรุปบทเรียนออนไลน์)

## Project Abstracts ความสำคัณและที่มาของระบบ
นักเรียน นักศึกษา ต้องการอ่านสรุปบทเรียนจากหลายมุมมอง เพื่อให้ได้ข้อมูลที่อาจขาดหายไปจาก การบันทึกเพียงคนเดียว ซึ่งการไปหาสรุปจากคนอื่นๆ กระทำได้ยาก เนื่องจากไม่ทราบว่าใครมีสรุปของวิชา ใดบ้าง หรือมีเนื้อหาที่ต้องการหรือไม่

เป้าหมายของระบบคือสร้างช่องทางให้ผู้ใช้งาน เช่น นักศึกษา ที่มีการเรียนในวิชาเดียวกัน หรือคล้ายคลึงกัน สามารถแบ่งปันสรุปของตนเองให้ผู้ใช้งานท่านอื่นได้ และสามารถเข้าไปดูสรุปของผู้ใช้งานอื่น เพื่อนำมาพัฒนาการจดบันทึกของตนเอง และเก็บตกความรู้ที่อาจจะตกไประหว่างการจดบันทึกของตนเอง

โดยประโชน์ของระบบคือ :
- ได้ความรู้เพิ่มเติมจากผู้ใช้อื่น
- ทำให้การหาสรุปสามารถกระทำได้สะดวก
- เปิดโอกาสทางการศึกษามากขึ้น
- ให้ผู้ใช้สามารถปรับปรุงการจดบันทึก จากการสังเกตผู้ใช้งานอื่นได้
- ผู้ใช้รู้สึกสะดวกสบายและลดอคติในการเรียนรู้

## Features ฟีเจอร์ของระบบ
โดยฟีเจอร์หลักนัน้ รวมไปด้วย
- ดูสรุปบทเรียน
- อัปโหลดสรุปบทเรียนของตนเอง
- สมัครสมาชิก เพื่อที่จะสามารถเข้าสู่ระบบและเป็นสมาชิกของระบบได้
- เรียกดูสรุปบทเรียนตามตัวกรองที่เลือก

> NOTE : We are currently in Alpha development cycle right now. <br>
> We continuously improved and ship new functional feature every month. Stay tuned.

## How to install
```
# Install dependencies (required on first run):
npm install

# Start the development server:
npm run serve

# Build the for production:
npm run build
```

## Technology
This Progressive Web Application uses Vue and Vue Router, with ElementJS as a UI framework.

We also use MongoDB and [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/) for database and file storage.

## CI Checking
We are currently using CircleCI Continuous Integration service.<br>
Here's are some status on each sprint branch.

|master|release/sprint-1|release/sprint-2|release/sprint-3|release/sprint-4|
|-|-|-|-|-|
|`WIP`|`Status : Active`<br>[![CircleCI](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-1.svg?style=svg&circle-token=4a79d7cd87beaeab28be229919c50730893c5a6b)](https://circleci.com/gh/IRIS-KMITL/se-y61-project-my-little-pony/tree/release%2Fsprint-1)|`Status : Inactive`<br>|`Status : Inactive`<br>|`Status : Inactive`<br>|


## Licensing
We haven't thought about licensing this project yet. Please check out later.

## Links
### Issue Tracking 
We use YouTrack for issue management + Agile board.<br>
Visit our YouTrack server at : [kumakumamon.me](http://kumakumamon.me)

For Aj. Teerapong, you can use this pre-generated username to observe :

- Username : `kimlee`
- Password : `kimleeSE2018`

### Documentation
We use [GitHub Wiki](https://github.com/IRIS-KMITL/se-y61-project-my-little-pony/wiki) on how to call API and many others.

### Notes
We use [Dropbox Paper](https://paper.dropbox.com/doc/Team-Pony-Notes--AMIJDaViQyVW09cDNZXEI8nbAg-PlOpOdkh9KS0o61vw9bVc) to keep on how we should do work.

## Team Members ทีมงานคุณภาพ
We are team My Little Pony from IT KMITL

| Profile Picture<br>รูปโปรไฟล์                            | Full Name<br>ชื่อจริง                               | Student ID<br>รหัสนักศึกษา | GitHub Username<br>บัญชี GitHub              |
|--------------------------------------------------------|--------------------------------------------------|-------------------------|--------------------------------------------|
| <img src="img/profile-pic/59070022.png" height="75px"> | Kunanon Srisuntiroj<br>คุณานนต์ ศรีสันติโรจน์          | 59070022                | [@sagelga](https://github.com/sagelga)     |
| <img src="img/profile-pic/59070043.png" height="75px"> | Thitipat Worrarat<br>ฐิติภัทร วรรัตน์                 | 59070043                | [@ynhof6](https://github.com/ynhof6)       |
| <img src="img/profile-pic/59070084.png" height="75px"> | Napasin Hongngern<br>นภสินธุ์ หงษ์เงิน                | 59070084                | [@tiltgod](https://github.com/tiltgod)     |
| <img src="img/profile-pic/59070087.png" height="75px"> | Nathan Yiangsupapaanontr<br>นาธาร เยี่ยงศุภพนนทร์    | 59070087                | [@zartre](https://github.com/zartre)       |
| <img src="img/profile-pic/59070117.png" height="75px"> | Patcharaphorn Lertvirul<br>พัชรพร เลิศวิรุฬห์            | 59070117                | [@kukkikkpl](https://github.com/kukkikkpl) |
| <img src="img/profile-pic/59070120.png" height="75px"> | Pimpitcha Pitichotchokphokhin<br>พิมพ์พิชชา ปิติโชติโชคโภคิน | 59070120                | [@anjo120](https://github.com/anjo120)            |

### อาจารย์ที่ปรึกษา
ผศ.ดร.ธีรพงศ์ ลีลานุภาพ

<img src="img/profile-pic/KimLee.jpg" height="75px">

---

รายงาน และ ซอร์สโค้ดนี้ เป็นส่วนหนึ่งของวิชา วิศวกรรมซอฟท์แวร์ Software Engineering (06016219)<br>
หลักสูตรวิทยาศาสตร์บัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ<br>
ภาคเรียนที่ 1 ปีการศึกษา 2561<br>
คณะเทคโนโลยีสารสนเทศ<br>
สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
