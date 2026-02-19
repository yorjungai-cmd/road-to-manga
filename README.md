# 🎌 Yor's Road to Reading Japanese Manga

> Personal Japanese learning system — Stage 1 to 3, with Google login and cloud sync.

**Live:** https://road-to-manga.vercel.app

---

## 📁 Files

| File | Description |
|------|-------------|
| `index.html` | **Main Portal** — Dashboard, overall progress, daily mission, roadmap |
| `japanese-learning.html` | **Stage 1** — Hiragana & Katakana (Daily Learning system), Kanji N5, Grammar N5 basics |
| `grammar-stage2.html` | **Stage 2** — Grammar N5→N4, Particles, Conditionals, Verb Conjugation, Sentence Endings |
| `vocab-stage3.html` | **Stage 3** — SRS Vocabulary system, 250+ cards, Quiz modes, Matching game, Typing practice |

---

## ✨ Features

### 📅 Daily Learning System
- เรียนทีละ **5 ตัวอักษรต่อวัน** สำหรับ Hiragana, Katakana, Kanji
- 3 rounds ต่อวัน: Study → Quiz → Mastery typing
- ต้องผ่าน Mastery ≥ 80% ถึง unlock วันถัดไปได้
- Memory tips ช่วยจำแต่ละตัวอักษร

### 🔁 SRS (Spaced Repetition System)
- ระบบ Leitner algorithm ทบทวนตามความยาก
- 4 card states: New → Learning → Young → Mature
- Due date tracking อัตโนมัติ

### ☁️ Google Login + Cloud Sync
- Login ด้วย Google 1 คลิก
- Progress sync ข้ามเครื่อง ข้าม Browser
- Fallback เป็น localStorage ถ้าไม่ได้ login
- Auto-sync ทุก 30 วินาที

### 🎯 Quiz & Games
- Multiple choice, Reverse quiz, Speed round
- Matching game (จับคู่ JP ↔ Thai)
- Typing practice (พิมพ์ romaji)

### 📊 Progress Tracking
- Overall progress dashboard
- Streak tracking 🔥
- Activity heatmap 48 สัปดาห์
- SRS distribution chart

---

## 🗺️ Learning Path

```
Stage 1 → Hiragana 46 ตัว  (Daily Learning tab)
       → Katakana 46 ตัว  (Daily Learning tab)
       → Kanji N5 80 ตัว  (Daily Learning tab)
       ↓
Stage 2 → Grammar N5→N4  (5 chapters, Quiz แต่ละบท)
       ↓
Stage 3 → SRS Vocabulary 250+ คำ
       → + Anki (Kaishi 1.5k / Core 2000)  สำหรับ 1,500–2,000 คำ
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

ไฟล์ทั้งหมดต้องอยู่ใน **folder เดียวกัน**

---

## 📝 License

All Rights Reserved © Yor — Personal project, not for redistribution.

---

*Created by Yor · 日本語道場 · 語彙道場 · 文法道場*
