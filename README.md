# 🎌 Yor's Road to Reading Japanese Manga

> Personal Japanese learning system — Stage 1 to 3, with Google login, cloud sync, and audio pronunciation.

**Live:** https://road-to-manga.vercel.app
**Version:** v1.5.0

---

## 📁 Files

| File | Description |
|------|-------------|
| `index.html` | **Main Portal** — Dashboard, overall progress, daily mission, roadmap |
| `japanese-learning.html` | **Stage 1** — Hiragana & Katakana (Daily Learning), Kanji N5, Grammar N5 basics |
| `grammar-stage2.html` | **Stage 2** — Grammar N5→N4, Particles, Conditionals, Verb Conjugation |
| `vocab-stage3.html` | **Stage 3** — SRS Vocabulary 250+ cards, Quiz modes, Matching game, Typing |
| `dashboard.html` | **Student Dashboard** — Activity heatmap, Grammar weak spots, Lapse tracker |
| `firebase.js` | **Firebase module** — Google Auth + Firestore sync (shared across all pages) |
| `README.md` | Documentation |

---

## ✨ Features

### 📅 Daily Learning System
- เรียนทีละ **5 ตัวอักษรต่อวัน** สำหรับ Hiragana, Katakana, Kanji
- 3 rounds: Study → Quiz → Mastery typing (ต้องผ่าน ≥ 80% ถึง unlock วันถัดไป)
- Memory tips ช่วยจำแต่ละตัวอักษร
- แผนที่ตัวอักษรแสดง progress ทั้งหมด

### 🔁 SRS (Spaced Repetition System)
- Leitner algorithm — 4 states: New → Learning → Young → Mature
- Due date tracking อัตโนมัติ
- Activity heatmap 52 สัปดาห์

### ☁️ Google Login + Cloud Sync
- Login ด้วย Google 1 คลิก
- Progress sync ข้ามเครื่อง ข้าม Browser
- Fallback เป็น localStorage ถ้าไม่ได้ login
- Auto-sync ทุก 30 วินาที + sync ตอนปิดหน้าต่าง

### 🔊 Audio Pronunciation *(new in v1.5)*
- **Web Speech API** — ออกเสียงภาษาญี่ปุ่นได้ทันทีในเบราว์เซอร์ ไม่ต้องโหลดไฟล์เสียง
- **Auto-speak** — เล่นเสียงอัตโนมัติเมื่อเปลี่ยนการ์ด / ขึ้นข้อใหม่
- ปุ่ม 🔊 ทุกจุดที่มี Japanese text — กดฟังซ้ำได้ทุกเมื่อ
- ครอบคลุม **Stage 1** (Flashcard, Quiz, Daily Learning), **Stage 2** (Grammar Quiz), **Stage 3** (SRS Review, Learn New Cards)
- ตั้งค่า `lang: ja-JP`, `rate: 0.85` เหมาะกับการเรียน

### 🎯 Quiz & Games
- Multiple choice, Reverse quiz, Speed round (60 วินาที)
- Matching game (JP ↔ Thai), Typing practice

### 📊 Student Dashboard *(new in v1.4)*
- **Activity Heatmap** — กราฟ 52 สัปดาห์ GitHub-style แสดงวันที่เรียน
- **Grammar Weak Sections** — Progress bar 5 หัวข้อ พร้อม tip เฉพาะจุด
- **Lapse Tracker** — Top 10 คำที่จำยากที่สุด เรียงตามจำนวน lapse
- **Continue Learning** — ปุ่มกลับหน้าเรียนล่าสุดทันที

### 🧭 Navigation *(new in v1.4)*
- ปุ่ม **📊 Dashboard** ใน Portal header
- Dashboard quick action card ใน Portal
- ทุกหน้าเรียนมีลิงก์ Dashboard + Portal ใน Sidebar

---

## 🗺️ Learning Path

```
Stage 1 → Hiragana 46 ตัว  (Daily Learning tab)
       → Katakana 46 ตัว  (Daily Learning tab)
       → Kanji N5 80 ตัว  (Daily Learning tab)
       ↓
Stage 2 → Grammar N5→N4  (5 chapters)
       ↓
Stage 3 → SRS Vocabulary 250+ คำ
       → + Anki (Kaishi 1.5k / Core 2000) สำหรับ 1,500–2,000 คำ
       ↓
       🎌 อ่านมังงะได้!
```

---

## 🛠️ Tech Stack

| ส่วน | เทคโนโลยี |
|------|-----------|
| Frontend | HTML + CSS + Vanilla JavaScript |
| Audio | Web Speech API (`SpeechSynthesisUtterance`, ja-JP) |
| Auth | Firebase Authentication (Google Sign-in) |
| Database | Firebase Firestore |
| Hosting | Vercel (auto-deploy จาก GitHub) |
| Storage fallback | Browser localStorage |

> **Audio support:** Chrome / Edge / Safari รองรับเต็มที่ · Firefox ต้องเปิด `media.webspeech.synth.enabled` ใน about:config

---

## 🚀 Local Usage

เปิด `index.html` ในเว็บ Browser ได้เลย — ไม่ต้องการ server

> ⚠️ ไฟล์ทั้งหมดต้องอยู่ใน **folder เดียวกัน** รวมถึง `firebase.js`

---

## 📝 Changelog

### v1.5.0 — 2026-02-20
**Commit:** `feat: implement Web Speech API audio pronunciation across all stages`
- 🔊 เพิ่มระบบ Audio ด้วย **Web Speech API** (`SpeechSynthesisUtterance`, `ja-JP`, rate 0.85)
- **Stage 1** (`japanese-learning.html`):
  - ปุ่ม 🔊 + auto-speak บน Hiragana/Katakana Flashcard (เปลี่ยนการ์ดทีก็พูดทันที)
  - ปุ่ม 🔊 + auto-speak บน Kana Quiz ทุกข้อใหม่
  - ปุ่ม 🔊 + auto-speak บน Daily Learning Study card
  - ปุ่ม 🔊 + auto-speak บน Daily Learning Quiz (เฉพาะ round ที่ถามตัวอักษร)
- **Stage 3** (`vocab-stage3.html`):
  - ปุ่ม 🔊 + auto-speak บน SRS Review card (front & back)
  - ปุ่ม 🔊 + auto-speak บน Learn New Cards
- **Stage 2** (`grammar-stage2.html`):
  - ปุ่ม 🔊 + auto-speak บน Grammar Quiz ทุก section (Verb, Particle, Nai, Cond, Ending)
  - ปุ่ม 🔊 + auto-speak บน Master Quiz — ออกเสียงเฉพาะส่วน JP (ตัดก่อน `—`)
- เพิ่ม CSS `.speak-btn` style ในทุกไฟล์ (hover glow สีตาม theme ของแต่ละ stage)

### v1.4.2 — 2026-02-19
**Commit:** `v1.4.2 — Fix studied-today detection for Stage 1 + add version badge`
- 🐛 แก้ "ยังไม่ได้เรียนวันนี้" ที่แสดงผิดแม้เรียน Stage 1 ไปแล้ว
- ✨ Stage 1 บันทึก `s1_lastStudied` ทุกครั้งที่ผ่าน Quiz round
- 🔧 Portal เช็คทั้ง SRS (Stage 3) และ Daily Learning (Stage 1) ก่อนแสดงสถานะ
- ✨ เพิ่ม version badge `v1.4.2` ในหัว Portal

### v1.4.1 — 2026-02-19
**Commit:** `v1.4.1 — Fix heatmap tooltip clipping on top rows`
- 🐛 แก้ Heatmap tooltip หายเมื่อ hover แถวบนสุด (overflow clipping)
- 🐛 แก้ cell แถวที่ 2 โดนตัดด้านบน
- ✨ Tooltip แถว Sun/Mon พลิกโผล่ลงข้างล่างแทนขึ้นข้างบน

### v1.4 — 2026-02-19
**Commits:**
```
v1.4 — Add Student Dashboard page (dashboard.html)
v1.4 — Add Dashboard navigation to all pages
v1.4 — Fix Thai encoding (mojibake) across all HTML files
v1.4 — Update README to v1.4
```
- ✨ เพิ่มหน้า `dashboard.html` — Student Dashboard ใหม่ทั้งหน้า
  - Activity Heatmap 52 สัปดาห์ (GitHub-style)
  - Grammar Weak Sections — 5 progress bars พร้อม tip เฉพาะจุด
  - Lapse Tracker — Top 10 คำที่จำยากที่สุด พร้อม SRS state
  - Overview stats: Overall %, Vocab learned, Due today, Total lapses, Streak
- 🔗 เพิ่มปุ่ม 📊 Dashboard ใน Portal header
- 🔗 เพิ่ม Dashboard card ใน Quick Actions ของ Portal
- 🔗 เพิ่ม Dashboard + Portal links ใน Sidebar ทุกหน้า (Stage 1–3)
- ▶️ Smart **Continue Learning** button — จำว่าเรียนค้างอยู่หน้าไหน
- 🐛 แก้ Thai/Japanese mojibake encoding ในทุกไฟล์

### v1.3 — 2026-02-19
- ♻️ แยก Firebase logic ออกเป็น `firebase.js` ไฟล์เดี่ยว
- ✨ เพิ่ม Skeleton loading state ระหว่าง Firebase pull ข้อมูล
- 🧹 HTML แต่ละไฟล์เล็กลงเฉลี่ย 9KB
- 📝 เพิ่ม `data-fb-stat` attribute บน Streak และ Overall %

### v1.2 — 2026-02-19
- ☁️ เพิ่มระบบ Google Login ด้วย Firebase Authentication
- 🔄 Auto-sync progress ขึ้น Firestore ทุก 30 วินาที
- 🔒 ตั้ง Firebase Security Rules (เฉพาะเจ้าของข้อมูล)
- 🌐 ตั้ง Authorized Domains (vercel.app + github.io)
- 💾 Fallback เป็น localStorage ถ้าไม่ได้ login
- 🟢 Sync status dot ในทุก credit bar

### v1.1 — 2026-02-19
- 🏗️ สร้าง Portal หลัก (`index.html`) รวม 3 Stage ไว้ในที่เดียว
- 📅 เพิ่ม Daily Learning system (5 ตัว/วัน)
- 🎮 3 rounds ต่อวัน: Study → Quiz → Mastery typing
- 🗺️ แผนที่ตัวอักษรทั้งหมดแสดง progress แบบ visual
- 📊 Cross-stage progress tracking + Stage unlock system

### v1.0 — 2026-02-19
- 🎉 Initial release — อัปขึ้น GitHub + Vercel ครั้งแรก
- 📖 Stage 1: Hiragana 46, Katakana 46, Kanji N5 80 ตัว
- 📝 Stage 2: Grammar N5→N4 (5 บท)
- 🔁 Stage 3: SRS Vocabulary 250+ คำ, Matching, Typing, Speed round
- 💾 localStorage สำหรับเก็บ progress
- 🎨 Dark theme สไตล์ญี่ปุ่น, Sakura pink accent

---

## 📝 License

All Rights Reserved © Yor — Personal project, not for redistribution.

---

*Created by Yor · 日本語道場 · 語彙道場 · 文法道場*
