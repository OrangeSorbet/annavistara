<div align="center">

# Anna Vistāra 🥗✨

**An AI-powered, comprehensive nutrition tracker designed to provide personalized dietary insights and guidance.**

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge">
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI Badge">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Badge">
</p>
</div>

---

## 🌟 Key Features

Anna Vistāra (from Sanskrit, meaning "Food Detail") is more than just a calorie counter. It's a smart nutrition assistant that leverages the power of Google's Gemini AI to make tracking your diet intuitive, detailed, and personalized.

| Feature                  | Description                                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 👤 **Personalized Profile** | Input your name, age, height, weight, and location to tailor the app's calculations and suggestions specifically to you.               |
| 🍽️ **AI Meal Analysis** | Log meals by typing a description or uploading a photo. The AI provides a detailed breakdown of **all** macro and micronutrients.      |
| 🚀 **Meal Shortcuts** | Create, save, and reuse detailed nutritional profiles for your frequent meals. Log your "daily-milk" with a single keyword!              |
| 📊 **Dynamic RDA Guide** | Your Recommended Dietary Allowances for an exhaustive list of nutrients are automatically calculated and updated based on your profile.  |
| 📈 **Visual Day Summary** | Track your daily intake against your goals with colorful donut charts for every nutrient, adjustable for different activity levels.    |
| 💊 **AI Supplement Advisor** | Get intelligent, location-aware suggestions for commercial supplement brands based on your needs.                                    |
| 🗓️ **Activity Calendar** | Get a bird's-eye view of your consistency with a color-coded calendar that tracks how well you met your calorie goals each day.        |
| 🌙 **Light/Dark Mode** | A sleek, modern UI that's easy on the eyes, day or night.                                                                                |
| 🔄 **Data Portability** | Export your entire log to **Excel** or back up all your data (profile, logs, shortcuts) to a **JSON** file for easy import/export.   |

---

## 🛠️ Tech Stack & Architecture

This project uses a modern, efficient tech stack to deliver a seamless user experience.

| Category      | Technology                               | Purpose                                     |
| ------------- | ---------------------------------------- | ------------------------------------------- |
| **Frontend** | `React.js`                               | Building the user interface                 |
| **Styling** | `Tailwind CSS`                           | For rapid, utility-first CSS styling        |
| **AI** | `Google Gemini API`                      | Powering all analysis and advisor features  |
| **Deployment**| `Vercel`                                 | For continuous integration and hosting      |

---


## 🚀 Getting Started Locally

To get a local copy up and running, follow these simple steps.

<details>
<summary><strong>1. Clone the repository</strong></summary>

```sh
git clone https://github.com/OrangeSorbet/annavistara.git
cd annavistara
```

</details>

<details>
<summary><strong>2. Install NPM packages</strong></summary>

```sh
npm install
```

</details>

<details>
<summary><strong>3. Set up Environment Variables (CRUCIAL)</strong></summary>

* Create a file named `.env.local` in the root of your project.
* Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
* Add your key to the `.env.local` file:

```env
REACT_APP_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

</details>

<details>
<summary><strong>4. Run the application</strong></summary>

```sh
npm start
```

The app will then be available at http://localhost:3000.

</details>
