# 🇳🇵 Sarkari Sathi (सरकारी साथी)
**Your Digital Guide to Nepali Government Services.**

Sarkari Sathi is a GovTech solution designed to simplify the complex processes of obtaining official documents in Nepal. We provide a clear, step-by-step roadmap for citizens navigating the requirements for Passports, Citizenship, Driving Licenses, and more.

---

## 🌟 Key Features
* **Bilingual Dashboard:** A clean, centralized interface to access information for major government services.
* **Cloud Authentication:** Secure user login and registration powered by **Firebase Authentication**.
* **Real-time Database:** User profiles and chat history stored in **Cloud Firestore** for instant synchronization.
* **Nepali Theme:** A unique UI reflecting the national identity with a Himalayan aesthetic and national symbols.
* **Interactive Guidance:** Simplified checklists for document requirements.

---

## 🛠️ Tech Stack
| Component | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | FastAPI (Python) for API server and RAG logic |
| **Database** | Google Firebase (Firestore) |
| **Auth** | Firebase Authentication (Phone/Email) |
| **AI/RAG** | Python-based Retrieval-Augmented Generation for document queries |

---

## 📂 Project Structure
```text
├── backend/
│   ├── main.py          # FastAPI server handling Auth & Chat logic
│   ├── firebase_config.py # Firebase Admin SDK initialization
│   └── rag_engine.py    # Logic for searching local JSON criteria
├── frontend/
│   ├── index.html       # Login/Signup interface
│   ├── services.html    # Service Selection Dashboard
│   └── style.css        # Himalayan-themed styling
└── requirements.txt     # Python dependencies (firebase-admin, fastapi, etc.)

## 🚀 How to Run Locally

### 1. Prerequisites
* Python 3.8+ installed.
* A code editor like **VS Code** (we recommend using **Gemini Code Assist** for development).

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone [https://github.com/yourusername/sarkari-sathi.git](https://github.com/yourusername/sarkari-sathi.git)
cd sarkari-sathi
pip install fastapi uvicorn sqlalchemy passlib[bcrypt]