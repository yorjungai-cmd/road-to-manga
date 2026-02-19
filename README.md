# 🎌 Yor's Road to Reading Japanese Manga

> Personal Japanese learning system — Stage 1 to 3, with Google login and cloud sync.

**Live:** https://road-to-manga.vercel.app

---

## 📁 Files

| File | Description |
|------|-------------|
| `index.html` | **Main Portal** — Dashboard, overall progress, daily mission, roadmap |
| `japanese-learning.html` | **Stage 1** — Hiragana & Katakana (Daily Learning), Kanji N5, Grammar N5 basics |
| `grammar-stage2.html` | **Stage 2** — Grammar N5→N4, Particles, Conditionals, Verb Conjugation |
| `vocab-stage3.html` | **Stage 3** — SRS Vocabulary 250+ cards, Quiz modes, Matching game, Typing |
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
- Activity heatmap 48 สัปดาห์

### ☁️ Google Login + Cloud Sync
- Login ด้วย Google 1 คลิก
- Progress sync ข้ามเครื่อง ข้าม Browser
- Fallback เป็น localStorage ถ้าไม่ได้ login
- Auto-sync ทุก 30 วินาที + sync ตอนปิดหน้าต่าง

### 🎯 Quiz & Games
- Multiple choice, Reverse quiz, Speed round (60 วินาที)
- Matching game (JP ↔ Thai), Typing practice

### 📊 Progress Tracking
- Overall progress dashboard + Streak 🔥
- Stage unlock system (Stage 2 ล็อคจน Stage 1 ≥30%)
- SRS distribution chart

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
| Auth | Firebase Authentication (Google Sign-in) |
| Database | Firebase Firestore |
| Hosting | Vercel (auto-deploy จาก GitHub) |
| Storage fallback | Browser localStorage |

---

## 🚀 Local Usage

เปิด `index.html` ในเว็บ Browser ได้เลย — ไม่ต้องการ server

> ⚠️ ไฟล์ทั้งหมดต้องอยู่ใน **folder เดียวกัน** รวมถึง `firebase.js`

---

## 📝 Changelog

### v1.3 — 2026-02-19
- ♻️ แยก Firebase logic ออกเป็น `firebase.js` ไฟล์เดี่ยว (ไม่ต้องแก้ 4 ไฟล์แล้ว)
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
- 📅 เพิ่ม Daily Learning system (5 ตัว/วัน) สำหรับ Hiragana, Katakana, Kanji
- 🎮 3 rounds ต่อวัน: Study → Quiz → Mastery typing
- 🗺️ แผนที่ตัวอักษรทั้งหมดแสดง progress แบบ visual
- 🔗 Credit bar + ← Portal button ในทุกหน้า
- 📊 Cross-stage progress tracking
- 🔓 Stage unlock system

### v1.0 — 2026-02-19
- 🎉 Initial release — อัปขึ้น GitHub + Vercel ครั้งแรก
- 📖 Stage 1: Hiragana 46, Katakana 46, Kanji N5 80 ตัว, Flashcard, Quiz
- 📝 Stage 2: Grammar N5→N4 (5 บท), Particles, Conditionals, Verb conjugation
- 🔁 Stage 3: SRS Vocabulary 250+ คำ, Matching game, Typing, Speed round
- 💾 localStorage สำหรับเก็บ progress
- 🎨 Dark theme สไตล์ญี่ปุ่น, Sakura pink accent

---

## 📝 License

All Rights Reserved © Yor — Personal project, not for redistribution.

---

*Created by Yor · 日本語道場 · 語彙道場 · 文法道場*
