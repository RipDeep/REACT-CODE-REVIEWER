
# Code Reviewer AI

Code Reviewer AI is a web application that leverages AI to analyze code, detect issues, and suggest optimizations. Built with React and Vite, it provides an interactive interface for uploading or pasting code, running AI-powered analysis, and viewing actionable feedback.

## Features

- **AI-Powered Code Review:** Analyze code for critical issues, warnings, and informational tips.
- **Optimized Code Suggestions:** Get improved versions of your code.
- **Multi-language Support:** Supports Python, JavaScript, TypeScript, Java, C, C++, and more.
- **Interactive Editor:** Monaco-based code editor with syntax highlighting.
- **File Upload:** Import code files directly for analysis.
- **Quality Score:** Visual representation of code quality.
- **Modern UI:** Responsive, dark-themed interface with smooth animations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
	```sh
	git clone <your-repo-url>
	cd "Code Reviewer"
	```

2. **Install dependencies:**
	```sh
	npm install
	```

3. **Set up API Keys:**
	- Create a `.env` file in the project root if it doesn't exist.
	- Add your Google Generative AI API keys:
	  ```
	  VITE_GOOGLE_API_KEY_1=your_key_1
	  VITE_GOOGLE_API_KEY_2=your_key_2
	  VITE_GOOGLE_API_KEY_3=your_key_3
	  VITE_GOOGLE_API_KEY_4=your_key_4
	  ```

### Running the App

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

## Project Structure

- `src/`
  - `components/` – Reusable UI components (Navbar, Analysis panels, etc.)
  - `pages/` – Main pages (Landing, Home, Demo)
  - `assets/` – Static assets (SVGs, images)
  - `App.jsx` – Main app component
  - `main.jsx` – Entry point

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Framer Motion](https://www.framer.com/motion/)
- [Google Generative AI](https://ai.google.dev/)

## License

This project is for educational/demo purposes.

---

**Note:** You must provide your own Google Generative AI API keys for the code analysis features to work.
