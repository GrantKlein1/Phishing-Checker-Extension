# 🛡️ PhishWatch — Gmail Phishing Checker Extension

A lightweight Google Chrome extension that protects users from suspicious emails directly inside Gmail — providing **real-time AI-powered phishing detection**.

---

## 📦 Installation

You can install PhishWatch in two ways:

- **Chrome Web Store**: [Download here](https://chromewebstore.google.com/detail/nocpcbmoahjiedngpffjcdjhcbkoedba?utm_source=item-share-cb)  
- **Manual Installation**:
  1. Download the extension `.zip` file or clone this repository.
  2. Extract the project folder (`Phishing-Checker-Extension-main`).
  3. Open `chrome://extensions` in your browser.
  4. Enable **Developer Mode** (top-right corner).
  5. Click **Load unpacked** (top-left corner).
  6. **Important**: Double-click into the `Phishing-Checker-Extension-main` folder and select the nested folder inside it.
  7. Done! Open an email in Gmail and click the extension’s button to scan.

💡 Need help? Contact: **grantklein528@gmail.com**

---

## ✨ Highlights

- 🔍 **Real-time scanning** with Groq LLM for phishing patterns  
- 🧠 **Smart severity scoring** to reduce false positives  
- 📬 **Caution banners** injected seamlessly above suspicious emails  
- 🎨 **6 unique themes** for the "Scan" button  
- 🛡️ **Zero data retention** — privacy-first design  

---

## ❓ How It Works

PhishWatch intercepts Gmail emails in the DOM and sends the **email body, sender, and subject** to a Groq LLM-powered backend.  

- The backend returns a phishing verdict (`true/false`) plus a list of suspicious elements.  
- If phishing is detected:
  - A **caution banner** is displayed at the top of the email.  
  - **Highlighted warnings** mark the most critical suspicious indicators.  
  - All decisions are based on a **scoring model** embedded in the detection prompt.  

---

## 🔐 User Data & Security

PhishWatch is built with **security and privacy at its core**:

- 🚫 **No data storage** — emails are never saved, logged, or stored  
- 📡 **Encrypted communication** with the backend (HTTPS)  
- 🎯 **Local analysis** — only the currently viewed email is processed  
- 🕵️ **No personal data extraction** — only email text is analyzed  
- ✅ **Minimal permissions** — limited to Gmail DOM access  
- 🔘 **On-demand scanning** — email content is only sent when you click **Scan**  

---

## 🎨 Customization

Earn **Scamites** (small rewards) each time you detect a phishing email.  
Spend Scamites on the **Options Page** to unlock six unique background themes.

To access the Options Page:
1. Right-click the extension icon in your Chrome toolbar.  
2. Select **Options**.  

---

## ⚠️ Common Issues & Disclaimers

### 1. Premature Email Check Trigger
- **Issue**: Clicking "Check Email" too quickly may cause errors like `Error handling response: TypeError...`  
- **Cause**: Gmail’s DOM hasn’t fully loaded.  
- **Solution**: Refresh the page before scanning:
  - Click 🔄 (refresh icon)  
  - Or press `Ctrl + R` (Windows/Linux) or `Cmd + R` (Mac)  
  - Wait for the email to fully render, then retry.  

### 2. Platform Disclaimer
- Tested extensively on **Windows**.  
- Expected to work on **macOS**, but not formally tested.  
- Mac users may encounter untested edge cases.  

### 3. File Size Disclaimer
- File size (~20 MB) is larger than typical extensions due to **14 bundled background images and GIFs** available in the Options tab.  

---

## 📮 Contact & Security Reporting

If you discover vulnerabilities, accuracy issues, or have suggestions for improvement, please reach out:  

📧 **grantklein528@gmail.com**

---
