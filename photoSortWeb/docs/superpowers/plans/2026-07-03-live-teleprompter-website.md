# Live Teleprompter Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static GitHub Pages-ready website for Live Teleprompter with a product homepage, privacy policy, and user agreement.

**Architecture:** Follow the existing `MyPassword` static-site pattern: a `static/` site with bilingual homepage and legal pages, plus a duplicated `LiveTeleprompter/` directory for product-path hosting. Use only HTML, CSS, JavaScript, and copied image assets so the site can be hosted from any static file server.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, static PNG assets, local browser preview.

---

### Task 1: Create Static Site Skeleton

**Files:**
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/index.html`
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/index.html`
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/css/app.css`
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/js/app.js`

- [ ] **Step 1: Add root redirect page**

Create `/Users/yingsongkeji/Desktop/photoSortWeb/index.html` with a meta refresh and link to `static/index.html`.

- [ ] **Step 2: Add bilingual homepage**

Create `/Users/yingsongkeji/Desktop/photoSortWeb/static/index.html` using `html[data-lang]` bilingual spans, sections for hero, features, privacy, Pro, and FAQ.

- [ ] **Step 3: Add shared CSS**

Create `/Users/yingsongkeji/Desktop/photoSortWeb/static/css/app.css` with responsive layout, top nav, hero, screenshot frame, cards, FAQ, and legal link styling.

- [ ] **Step 4: Add language switcher JS**

Create `/Users/yingsongkeji/Desktop/photoSortWeb/static/js/app.js` to persist `liveteleprompter-lang` and switch Chinese/English content.

### Task 2: Add Product Assets

**Files:**
- Copy images into: `/Users/yingsongkeji/Desktop/photoSortWeb/static/images/`

- [ ] **Step 1: Copy screenshots**

Copy Chinese and English App Store screenshot PNGs from `/Users/yingsongkeji/Desktop/提词器上架截图/` into `static/images/` as stable ASCII filenames.

- [ ] **Step 2: Reference screenshots**

Use `images/home-zh.png` for Chinese mode and `images/home-en.png` for English mode.

### Task 3: Add Legal Pages

**Files:**
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/PrivacyPolicy/index.html`
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/PrivacyPolicy/en.html`
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/PrivacyPolicy/zh.html`
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/UserAgreement/index.html`
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/UserAgreement/en.html`
- Create: `/Users/yingsongkeji/Desktop/photoSortWeb/static/UserAgreement/zh.html`

- [ ] **Step 1: Add privacy pages**

Write English and Chinese privacy pages describing local script storage, local preferences, Apple StoreKit purchases, optional contact email, and no self-operated cloud sync.

- [ ] **Step 2: Add user agreement pages**

Write English and Chinese terms covering user responsibilities, Free/Pro behavior, Apple purchase restoration, acceptable use, disclaimers, and contact.

- [ ] **Step 3: Add language redirect index pages**

Each legal `index.html` redirects to `zh.html` when the browser language starts with `zh`, otherwise `en.html`.

### Task 4: Duplicate Product Directory

**Files:**
- Create/update: `/Users/yingsongkeji/Desktop/photoSortWeb/LiveTeleprompter/`

- [ ] **Step 1: Copy `static/` contents**

Copy the completed `static/` contents into `LiveTeleprompter/` so the product path mirrors the static site.

- [ ] **Step 2: Verify links**

Check that homepage links and legal page nav work from both `static/` and `LiveTeleprompter/`.

### Task 5: Verify

**Files:**
- Verify all HTML, CSS, JS, and copied image assets.

- [ ] **Step 1: Validate file tree**

Run `find /Users/yingsongkeji/Desktop/photoSortWeb -maxdepth 3 -type f`.

- [ ] **Step 2: Check links**

Run a script to confirm every local `href` and `src` target exists.

- [ ] **Step 3: Preview locally**

Start a local static server and open the homepage in browser if available; otherwise provide file paths.
