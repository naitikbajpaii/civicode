# 🏗️ CiviCode – IS Code AI Companion

CiviCode is a modern web application designed to assist Civil Engineering students and professionals by providing intelligent access to Indian Standard (IS) Codes. Powered by the Gemini API and built with modern frontend tools, it offers AI-based search and context-aware suggestions over a curated library of IS Codes.

## 🚀 Features

- 🧠 **AI-powered Smart Search** using Gemini 2.5 Flash via structured prompt engineering
- 📚 **Explore 50+ curated IS Codes** related to Civil Engineering
- 🔍 **Search suggestions** and natural language queries
- 💬 Returns answers with relevant code, page number, and explanation

## 🛠️ Tech Stack

- **Frontend**: ReactJS, Vite, Tailwind CSS, PostCSS, JavaScript
- **AI Integration**: Gemini API (`@google/generative-ai`)
- **Environment**: Vercel (for deployment), `.env` for API key handling

## 📦 Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/civicode.git
cd civicode

# 2. Install dependencies
npm install

# 3. Create a .env file and add your Gemini API Key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# 4. Start the development server
npm run dev
```

## 🧠 How It Works

- User enters a natural language query (e.g., *"What is the IS Code for M25 concrete?"*)
- The app builds a structured prompt from IS Code metadata and sends it to Gemini
- Gemini responds in JSON format with:
  - A natural reply
  - Relevant IS Code(s)
  - Page number from the code’s content table
  - Reason for relevance

## 📁 Project Structure

```
/public
/src
  /components
  /hooks
    useGeminiSearch.js
  /data
    iscodes.json
.env
vite.config.js
README.md
```

## 🧪 Example Output

```json
{
  "responseText": "You should refer to IS 456:2000 for M25 concrete design guidelines.",
  "results": [
    {
      "code": "IS 456:2000",
      "page": 15,
      "reason": "Covers M25 concrete specifications"
    }
  ]
}
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

© 2025 [CiviCode Project Team]
