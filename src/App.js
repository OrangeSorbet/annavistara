import React, { useState, useEffect, useCallback, useRef } from 'react';
// Note for deployment: The Excel export functionality requires the 'xlsx' library.
// Please include the following script tag in your main HTML file's <head> section:
// <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

// --- IMPORTANT FOR DARK MODE ---
// For Dark Mode to work, you MUST update your `tailwind.config.js` file.
// It should look like this:
// module.exports = {
//   darkMode: 'class', // This line is essential
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// --- Helper Icons (No SVG used) ---
const CameraIcon = () => <span role="img" aria-label="camera">📷</span>;
const UserIcon = () => <span role="img" aria-label="user">👤</span>;
const BookIcon = () => <span role="img" aria-label="book">📚</span>;
const PillIcon = () => <span role="img" aria-label="pill">💊</span>;
const ChartIcon = () => <span role="img" aria-label="chart">🍽️</span>;
const DownloadIcon = () => <span role="img" aria-label="download">📥</span>;
const UploadIcon = () => <span role="img" aria-label="upload">📤</span>;
const ExcelIcon = () => <span role="img" aria-label="excel">📄</span>;
const SunIcon = () => <span role="img" aria-label="sun">☀️</span>;
const MoonIcon = () => <span role="img" aria-label="moon">🌙</span>;
const UndoIcon = () => <span role="img" aria-label="undo">↩️</span>;
const FoodIcon = () => <span role="img" aria-label="food">🍲</span>;
const EditIcon = () => <span role="img" aria-label="edit">✏️</span>;
const DeleteIcon = () => <span role="img" aria-label="delete">🗑️</span>;
const PlusIcon = () => <span role="img" aria-label="plus">➕</span>;
const QuestionIcon = () => <span role="img" aria-label="question mark">❓</span>;

// --- Comprehensive Nutrient List ---
const ALL_NUTRIENTS = [
    { name: 'Energy', units: ['kcal'], defaultUnit: 'kcal' },
    { name: 'Protein', units: ['g', 'mg'], defaultUnit: 'g' },
    { name: 'Carbohydrates', units: ['g', 'mg'], defaultUnit: 'g' },
    { name: 'Fat', units: ['g', 'mg'], defaultUnit: 'g' },
    { name: 'Saturated Fat', units: ['g', 'mg'], defaultUnit: 'g' },
    { name: 'Unsaturated Fat', units: ['g', 'mg'], defaultUnit: 'g' },
    { name: 'Cholesterol', units: ['mg'], defaultUnit: 'mg' },
    { name: 'Amino Acids', units: ['g', 'mg'], defaultUnit: 'g' },
    { name: 'Omega-3', units: ['g', 'mg'], defaultUnit: 'g' },
    { name: 'Vitamin C', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Vitamin B3 (Niacin)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Vitamin E', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Vitamin B5 (Pantothenic Acid)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Vitamin A', units: ['µg', 'IU'], defaultUnit: 'µg' },
    { name: 'Vitamin B6', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Vitamin B2 (Riboflavin)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Vitamin B1 (Thiamine)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Vitamin B12', units: ['µg'], defaultUnit: 'µg' },
    { name: 'Magnesium (Mg)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Chloride', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Sodium (Na)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Calcium (Ca)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Iron (Fe)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Zinc (Zn)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Manganese (Mn)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Copper (Cu)', units: ['mg', 'µg'], defaultUnit: 'mg' },
    { name: 'Iodine (I)', units: ['µg'], defaultUnit: 'µg' },
];


// --- Main App Component ---
const App = () => {
    const [currentPage, setCurrentPage] = useState('profile');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const renderPage = () => {
        switch (currentPage) {
            case 'tracker':
                return <MealTrackerPage />;
            case 'rda':
                return <RdaPage />;
            case 'advisor':
                return <AdvisorPage />;
            case 'profile':
            default:
                return <ProfilePage />;
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200">
            <Header theme={theme} setTheme={setTheme} />
            <div className="container mx-auto max-w-lg p-4 pb-24">
                {renderPage()}
            </div>
            <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};
export default App;

// --- Header Component ---
const Header = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
            <div className="container mx-auto max-w-lg p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Anna Vistāra</h1>
                <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-lg">
                    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>
        </header>
    );
};

// --- Navigation Component ---
const BottomNav = ({ currentPage, setCurrentPage }) => {
    const navItems = [
        { id: 'profile', icon: <UserIcon />, label: 'Profile' },
        { id: 'tracker', icon: <ChartIcon />, label: 'Tracker' },
        { id: 'rda', icon: <BookIcon />, label: 'RDA Guide' },
        { id: 'advisor', icon: <PillIcon />, label: 'Advisor' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-around max-w-lg mx-auto">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm transition-colors duration-200 ${currentPage === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500'}`}
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span>{item.label}</span>
                         {currentPage === item.id && <div className="w-8 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-1"></div>}
                    </button>
                ))}
            </div>
        </nav>
    );
};

// --- Profile Page Component ---
const ProfilePage = () => {
    const [profile, setProfile] = useState({ name: '', age: '', height: '', weight: '', location: 'India' });
    const [saved, setSaved] = useState(false);
    const [restoreText, setRestoreText] = useState('');

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    const handleSave = () => {
        if (Object.values(profile).some(field => field === '')) {
            alert("Please fill out all profile fields before saving.");
            return;
        }
        localStorage.setItem('userProfile', JSON.stringify(profile));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };
    
    const handleDownloadData = () => {
        const userProfile = localStorage.getItem('userProfile');
        const dailyLog = localStorage.getItem('dailyLog');
        const mealConstants = localStorage.getItem('mealConstants');
        const supplementConstants = localStorage.getItem('supplementConstants');
        const data = {
            userProfile: userProfile ? JSON.parse(userProfile) : {},
            dailyLog: dailyLog ? JSON.parse(dailyLog) : {},
            mealConstants: mealConstants ? JSON.parse(mealConstants) : {},
            supplementConstants: supplementConstants ? JSON.parse(supplementConstants) : {}
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "nutrition_data_backup.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleRestoreData = () => {
        if (!restoreText) {
            alert("Please paste your backup data into the text box.");
            return;
        }
        try {
            const data = JSON.parse(restoreText);
            if (data.userProfile) {
                localStorage.setItem('userProfile', JSON.stringify(data.userProfile));
                setProfile(data.userProfile);
            }
            if (data.dailyLog) {
                localStorage.setItem('dailyLog', JSON.stringify(data.dailyLog));
            }
            if (data.mealConstants) {
                localStorage.setItem('mealConstants', JSON.stringify(data.mealConstants));
            }
             if (data.supplementConstants) {
                localStorage.setItem('supplementConstants', JSON.stringify(data.supplementConstants));
            }
            alert('Data restored successfully!');
            setRestoreText('');
        } catch (error) {
            alert('Error parsing data. Please make sure you copied the entire JSON backup file.');
        }
    };
    
    const handleExportToExcel = () => {
        if (typeof window.XLSX === 'undefined') {
            alert('Excel export library is not available. This feature requires an internet connection or for the library to be included in the project.');
            return;
        }

        const dailyLog = JSON.parse(localStorage.getItem('dailyLog') || '{}');
        const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');

        if (Object.keys(dailyLog).length === 0) {
            alert("No data to export!");
            return;
        }

        const wb = window.XLSX.utils.book_new();
        const currentYear = new Date().getFullYear();
        const ws_data = [];

        // Create Header Row with Day and Month
        const header = ["Day", "Month", "Item", "Details", ...ALL_NUTRIENTS.map(n => n.name)];
        ws_data.push(header);

        // Get and sort dates
        const sortedDates = Object.keys(dailyLog).sort();

        // Group logs by month
        const groupedByMonth = sortedDates.reduce((acc, date) => {
            const month = new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(date);
            return acc;
        }, {});

        // Process each month
        Object.keys(groupedByMonth).forEach(month => {
            // Add a month header row
            ws_data.push([month]);

            groupedByMonth[month].forEach(date => {
                const dayData = dailyLog[date];
                const dateObj = new Date(date);
                const day = dateObj.getDate();
                const monthName = dateObj.toLocaleString('default', { month: 'long' });
                
                const rda = getPersonalizedRDA(profile);
                const rdaMap = rda.reduce((acc, item) => {
                    acc[item.nutrient] = parseFloat(item.value) || 1;
                    return acc;
                }, {});

                const dateTotals = {};
                rda.forEach(item => { dateTotals[item.nutrient] = 0; });

                // Add Meal and Supplement Rows for the date
                [...(dayData.meals || []), ...(dayData.supplements || [])].forEach(item => {
                    const isMeal = !!item.items;
                    const row = [
                        day,
                        monthName,
                        item.name,
                        isMeal ? item.items.join(', ') : item.dose
                    ];
                    ALL_NUTRIENTS.forEach(nutrient => {
                        const value = parseFloat(item.nutrition[nutrient.name]) || 0;
                        row.push(value);
                        dateTotals[nutrient.name] += value;
                    });
                    ws_data.push(row);
                });

                // Add summary rows for the date
                const rdaRow = [day, monthName, "RDA", "", ...ALL_NUTRIENTS.map(n => rdaMap[n.name] || 0)];
                const percentRow = [day, monthName, "% RDA Achieved", "", ...ALL_NUTRIENTS.map(n => `${Math.round((dateTotals[n.name] / (rdaMap[n.name] || 1)) * 100)}%`)];
                
                ws_data.push(rdaRow, percentRow);
                ws_data.push([]); // Spacer row
            });
        });

        const ws = window.XLSX.utils.aoa_to_sheet(ws_data);
        ws['!autofilter'] = { ref: "A1:" + window.XLSX.utils.encode_col(header.length - 1) + "1" };
        window.XLSX.utils.book_append_sheet(wb, ws, String(currentYear));

        const fileName = `Annavistara-${profile.name || 'user'}.xlsx`;
        window.XLSX.writeFile(wb, fileName);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 text-center">Your Profile</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age (years)</label>
                    <input type="number" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Height (cm)</label>
                    <input type="number" value={profile.height} onChange={e => setProfile({...profile, height: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight (kg)</label>
                    <input type="number" value={profile.weight} onChange={e => setProfile({...profile, weight: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700" />
                </div>
                <button onClick={handleSave} className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                    {saved ? 'Saved!' : 'Save Profile'}
                </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Data Management</h2>
                 <div className="space-y-4">
                     <button onClick={handleDownloadData} className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                         <DownloadIcon /> Download Backup
                     </button>
                     <div className="space-y-2">
                        <textarea 
                            value={restoreText}
                            onChange={e => setRestoreText(e.target.value)}
                            placeholder="Paste your JSON backup data here..."
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                            rows="4"
                        ></textarea>
                         <button onClick={handleRestoreData} className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                           <UploadIcon /> Restore from Text
                        </button>
                     </div>
                      <button onClick={handleExportToExcel} className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors">
                         <ExcelIcon /> Export to Excel
                     </button>
                 </div>
            </div>
        </div>
    );
};

// --- Meal Tracker Page Component ---
const MealTrackerPage = () => {
    const [dailyLog, setDailyLog] = useState({});
    const [mealConstants, setMealConstants] = useState({});
    const [supplementConstants, setSupplementConstants] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [activeTab, setActiveTab] = useState('text');
    const [mealDescription, setMealDescription] = useState('');
    const [showSupplementForm, setShowSupplementForm] = useState(false);
    const [supplementName, setSupplementName] = useState('');
    const [supplementDose, setSupplementDose] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [showConstantCreator, setShowConstantCreator] = useState(false);
    const [activityLevel, setActivityLevel] = useState('moderate');
    

    useEffect(() => {
        const storedLog = localStorage.getItem('dailyLog');
        if (storedLog) setDailyLog(JSON.parse(storedLog));
        const storedMealConstants = localStorage.getItem('mealConstants');
        if (storedMealConstants) setMealConstants(JSON.parse(storedMealConstants));
        const storedSupplementConstants = localStorage.getItem('supplementConstants');
        if (storedSupplementConstants) setSupplementConstants(JSON.parse(storedSupplementConstants));
    }, []);

    const saveLog = useCallback((newLog) => {
        setDailyLog(newLog);
        localStorage.setItem('dailyLog', JSON.stringify(newLog));
    }, []);

    const saveMealConstants = useCallback((newConstants) => {
        setMealConstants(newConstants);
        localStorage.setItem('mealConstants', JSON.stringify(newConstants));
    }, []);

    const saveSupplementConstants = useCallback((newConstants) => {
        setSupplementConstants(newConstants);
        localStorage.setItem('supplementConstants', JSON.stringify(newConstants));
    }, []);
    
    const handleAddMeal = (mealData) => {
        const newLog = { ...dailyLog };
        if (!newLog[currentDate]) {
            newLog[currentDate] = { meals: [], supplements: [] };
        }
        newLog[currentDate].meals.push({ ...mealData, id: Date.now() });
        saveLog(newLog);
        setAnalysisResult(null);
        setMealDescription('');
    };

    const handleAddSupplement = async () => {
        if (!supplementName) return;

        const keyword = supplementName.toLowerCase().trim();
        if (supplementConstants[keyword]) {
            const newLog = { ...dailyLog };
            if (!newLog[currentDate]) {
                newLog[currentDate] = { meals: [], supplements: [] };
            }
            newLog[currentDate].supplements.push({ ...supplementConstants[keyword], id: Date.now() });
            saveLog(newLog);
            alert(`Logged supplement from shortcut: ${keyword}`);
            setSupplementName('');
            setSupplementDose('');
            setShowSupplementForm(false);
            return;
        }

        if (!supplementDose) {
            alert("Please provide a dose for the new supplement.");
            return;
        }

        setIsLoading(true);
        setLoadingMessage(`Analyzing ${supplementName}...`);

        try {
            const analysisPrompt = `Act as a nutritional database. Provide a highly accurate and detailed nutritional information for the supplement "${supplementName}" with a dose of "${supplementDose}". Include an exhaustive list of all possible macros and micronutrients. The final 'name' in the JSON should be the corrected, official product name. Format the response as a valid JSON object only, like this: {"name": "Official Product Name", "dose": "${supplementDose}", "nutrition": {"Energy": 0, "Protein": 0, "Carbohydrates": 0, "Fat": 0, "Vitamin C": 40, "Zinc (Zn)": 10}}. If a nutrient isn't present, omit it.`;
            let resultText = await callGeminiApiForAnalysis(analysisPrompt);
            const parsedResult = JSON.parse((resultText.match(/\{[\s\S]*\}/) || ['{}'])[0]);

            const newLog = { ...dailyLog };
            if (!newLog[currentDate]) {
                newLog[currentDate] = { meals: [], supplements: [] };
            }
            newLog[currentDate].supplements.push({ ...parsedResult, id: Date.now() });
            saveLog(newLog);
            setSupplementName('');
            setSupplementDose('');
            setShowSupplementForm(false);
        } catch (error) {
            console.error("Supplement analysis failed:", error);
            alert("Could not analyze supplement. It will be added with zero nutritional value. You can edit it manually.");
            const newLog = { ...dailyLog };
            if (!newLog[currentDate]) {
                newLog[currentDate] = { meals: [], supplements: [] };
            }
            newLog[currentDate].supplements.push({ id: Date.now(), name: supplementName, dose: supplementDose, nutrition: {} });
            saveLog(newLog);
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    const handleUpdateLogItem = (updatedItem) => {
        const newLog = { ...dailyLog };
        const logForDate = newLog[editingItem.date];
        if (editingItem.type === 'meal') {
            const mealIndex = logForDate.meals.findIndex(m => m.id === editingItem.id);
            if (mealIndex > -1) logForDate.meals[mealIndex] = updatedItem;
        } else {
            const supIndex = logForDate.supplements.findIndex(s => s.id === editingItem.id);
            if (supIndex > -1) logForDate.supplements[supIndex] = updatedItem;
        }
        saveLog(newLog);
        setEditingItem(null);
    };

    const handleDeleteMeal = (mealId) => {
        if (window.confirm("Are you sure you want to delete this meal log?")) {
            const newLog = { ...dailyLog };
            if (newLog[currentDate]) {
                newLog[currentDate].meals = newLog[currentDate].meals.filter(m => m.id !== mealId);
                saveLog(newLog);
            }
        }
    };

    const handleUndoSupplement = (supplementId) => {
        const newLog = { ...dailyLog };
        if (newLog[currentDate]) {
            newLog[currentDate].supplements = newLog[currentDate].supplements.filter(s => s.id !== supplementId);
            saveLog(newLog);
        }
    };
    
    const callGeminiApiForAnalysis = async (prompt, base64ImageData = null) => {
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        let parts = [{ text: prompt }];
        if (base64ImageData) {
            parts.push({ inlineData: { mimeType: "image/jpeg", data: base64ImageData } });
        }
        const payload = { contents: [{ role: "user", parts }] };
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const result = await response.json();
        return result.candidates[0].content.parts[0].text;
    };

    const analyzeMeal = async (description, image) => {
        const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (Object.values(profileData).some(field => field === '')) {
            alert("Please complete your profile before using AI features.");
            return;
        }

        setIsLoading(true);
        setLoadingMessage('Analyzing nutrition...');
        setAnalysisResult(null);

        try {
            const analysisPrompt = `Analyze the following meal for a ${profileData.age}-year-old male (${profileData.height}cm, ${profileData.weight}kg). Provide a detailed nutritional breakdown including an exhaustive list of macros (Energy, Protein, Carbohydrates, Fat, Saturated Fat, Unsaturated Fat, Cholesterol) and key micronutrients (Vitamin C, B3, E, B5, A, B6, B2, B1, B12, Magnesium, Chloride, Sodium, Calcium, Iron, Zinc, Manganese, Copper, Iodine, Omega-3). Format the response as a valid JSON object only, like this: {"name": "Meal Name", "items": ["Item 1", "Item 2"], "nutrition": {"Energy": 0, "Protein": 0, "Carbohydrates": 0, "Saturated Fat": 0, "Unsaturated Fat": 0, "Cholesterol": 0, "Vitamin C": 0, "Iron (Fe)": 0}}. The meal is: ${description}`;
            
            let resultText = await callGeminiApiForAnalysis(analysisPrompt, image);
            const parsedResult = JSON.parse((resultText.match(/\{[\s\S]*\}/) || ['{}'])[0]);
            
            setAnalysisResult(parsedResult);
        } catch (error) {
            console.error("Meal analysis failed:", error);
            alert("Sorry, there was an error analyzing your meal. Please try again.");
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };
    
    const handleTextAnalysis = () => {
        if (!mealDescription) return;
        const keyword = mealDescription.toLowerCase().trim();
        if (mealConstants[keyword]) {
            handleAddMeal(mealConstants[keyword]);
            alert(`Logged meal from shortcut: ${keyword}`);
            setMealDescription('');
            return;
        }
        analyzeMeal(mealDescription, null);
    };
    
    const getTodayLog = () => dailyLog[currentDate] || { meals: [], supplements: [] };

    return (
        <div>
            {editingItem && <EditModal item={editingItem} onSave={handleUpdateLogItem} onClose={() => setEditingItem(null)} />}
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 text-center">Meal Tracker</h1>
            <input type="date" value={currentDate} onChange={e => setCurrentDate(e.target.value)} className="w-full p-2 border rounded-md mb-4 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Analyze & Add Item</h2>
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                    <button onClick={() => setActiveTab('text')} className={`flex-1 py-2 text-center font-semibold ${activeTab === 'text' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>By Text</button>
                    <button onClick={() => setActiveTab('camera')} className={`flex-1 py-2 text-center font-semibold ${activeTab === 'camera' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>By Image</button>
                </div>

                {activeTab === 'text' && (
                    <div className="space-y-4">
                        <textarea value={mealDescription} onChange={e => setMealDescription(e.target.value)} placeholder="Enter full meal description or a shortcut keyword..." className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 disabled:bg-gray-200" rows="3" disabled={isLoading}></textarea>
                        
                        <div className="text-center">
                             <button 
                                onClick={() => setShowConstantCreator(!showConstantCreator)} 
                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {showConstantCreator ? 'Hide Shortcut Creator' : 'Create Meal/Supplement Shortcut'}
                            </button>
                        </div>

                        {showConstantCreator && <MealConstantCreator saveMealConstants={saveMealConstants} mealConstants={mealConstants} saveSupplementConstants={saveSupplementConstants} supplementConstants={supplementConstants} />}

                        <button onClick={handleTextAnalysis} className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300" disabled={isLoading}>Analyze or Log Meal</button>
                    </div>
                )}
                {activeTab === 'camera' && (
                    <ImageUploader onImageReady={(base64) => analyzeMeal("the meal in the image", base64)} title="Analyze by Photo" isDisabled={isLoading} />
                )}

                {isLoading && <div className="text-center p-4">{loadingMessage}</div>}
                {analysisResult && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <h3 className="font-bold text-lg mb-2 text-center">{analysisResult.name}</h3>
                        <div className="text-sm space-y-1 max-h-40 overflow-y-auto">
                            {Object.entries(analysisResult.nutrition).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="font-semibold">{key}:</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => handleAddMeal(analysisResult)} className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600">Add to Log</button>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Today's Log ({currentDate})</h2>
                <div>
                    <h3 className="font-semibold text-lg mb-2">Meals:</h3>
                    {getTodayLog().meals.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                            {getTodayLog().meals.map((meal) => (
                                <li key={meal.id} className="group">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <strong>{meal.name}</strong>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-2">
                                                {Object.entries(meal.nutrition).map(([key, value]) => <span key={key}>{key}: {value}</span>)}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button onClick={() => setEditingItem({ ...meal, type: 'meal', date: currentDate })} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 mr-2"><EditIcon /></button>
                                            <button onClick={() => handleDeleteMeal(meal.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500"><DeleteIcon /></button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p>No meals logged yet.</p>}
                </div>
                 <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2 flex justify-between items-center">
                        <span>Supplements:</span>
                        {!showSupplementForm && <button onClick={() => setShowSupplementForm(true)} className="text-sm bg-indigo-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-indigo-600"><PlusIcon /></button>}
                    </h3>
                    {showSupplementForm && (
                        <div className="space-y-2 mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                            <input type="text" value={supplementName} onChange={e => setSupplementName(e.target.value)} placeholder="Supplement name or shortcut" className="w-full p-2 border rounded-md bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500"/>
                            <input type="text" value={supplementDose} onChange={e => setSupplementDose(e.target.value)} placeholder="Dose (e.g., 1 capsule)" className="w-full p-2 border rounded-md bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500"/>
                            <div className="flex gap-2">
                                <button onClick={handleAddSupplement} className="w-full bg-green-500 text-white font-semibold py-1 px-3 rounded-md" disabled={isLoading}>{isLoading ? 'Analyzing...' : 'Add'}</button>
                                <button onClick={() => setShowSupplementForm(false)} className="w-full bg-gray-400 text-white font-semibold py-1 px-3 rounded-md">Cancel</button>
                            </div>
                        </div>
                    )}
                    {getTodayLog().supplements.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {getTodayLog().supplements.map((sup) => (
                                <li key={sup.id} className="group">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <strong>{sup.name}</strong> - {sup.dose}
                                            <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-2">
                                                {Object.entries(sup.nutrition).map(([key, value]) => <span key={key}>{key}: {value}</span>)}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button onClick={() => setEditingItem({ ...sup, type: 'supplement', date: currentDate })} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 mr-2"><EditIcon /></button>
                                            <button onClick={() => handleUndoSupplement(sup.id)} className="text-red-500 hover:text-red-700"><UndoIcon /></button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p>No supplements logged yet.</p>}
                </div>
            </div>
            <DaySummary log={getTodayLog()} activityLevel={activityLevel} setActivityLevel={setActivityLevel} />
            <ActivityCalendar dailyLog={dailyLog} activityLevel={activityLevel}/>
        </div>
    );
};

// --- Meal Constant Creator ---
const MealConstantCreator = ({ saveMealConstants, mealConstants, saveSupplementConstants, supplementConstants }) => {
    const [type, setType] = useState('meal');
    const [keyword, setKeyword] = useState('');
    const [nutrition, setNutrition] = useState({});
    const [customNutrients, setCustomNutrients] = useState([]);
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const rda = getPersonalizedRDA(profile);
    const rdaMap = rda.reduce((acc, item) => {
        const nutrientName = item.nutrient.split(' (')[0];
        acc[nutrientName] = parseFloat(item.value) || 1;
        return acc;
    }, {});

    const handleNutrientChange = (nutrient, value) => {
        setNutrition(prev => ({ ...prev, [nutrient]: value }));
    };

    const handleCustomNutrientChange = (index, field, value) => {
        const updated = [...customNutrients];
        updated[index][field] = value;
        setCustomNutrients(updated);
    };

    const addCustomNutrient = () => {
        setCustomNutrients([...customNutrients, { name: '', value: 0, unit: 'g' }]);
    };
    
    const handleSave = () => {
        if (!keyword) {
            alert("Please enter a keyword.");
            return;
        }

        const finalNutrition = {};
        Object.entries(nutrition).forEach(([key, value]) => {
            if (value && parseFloat(value) > 0) {
                const nutrientInfo = ALL_NUTRIENTS.find(n => n.name === key);
                finalNutrition[`${key}`] = `${value} ${nutrientInfo.defaultUnit}`;
            }
        });

        customNutrients.forEach(cust => {
            if (cust.name && cust.value > 0) {
                finalNutrition[`${cust.name}`] = `${cust.value} ${cust.unit}`;
            }
        });

        if (Object.keys(finalNutrition).length === 0) {
            alert("Please enter at least one nutrient value.");
            return;
        }

        const newConstant = {
            name: keyword,
            items: type === 'meal' ? ["Custom Shortcut"] : [],
            dose: type === 'supplement' ? "1 serving" : undefined,
            nutrition: finalNutrition
        };

        if (type === 'meal') {
            const newConstants = { ...mealConstants, [keyword.toLowerCase()]: newConstant };
            saveMealConstants(newConstants);
        } else {
            const newConstants = { ...supplementConstants, [keyword.toLowerCase()]: newConstant };
            saveSupplementConstants(newConstants);
        }

        alert(`Shortcut '${keyword}' saved!`);
        setKeyword('');
        setNutrition({});
        setCustomNutrients([]);
    };

    return (
        <div className="space-y-2 p-2 bg-gray-200 dark:bg-gray-600 rounded-md mt-2">
            <div className="flex border-b border-gray-300 dark:border-gray-500">
                <button onClick={() => setType('meal')} className={`flex-1 py-1 text-sm font-semibold ${type === 'meal' ? 'bg-indigo-500 text-white rounded-t-md' : ''}`}>Meal</button>
                <button onClick={() => setType('supplement')} className={`flex-1 py-1 text-sm font-semibold ${type === 'supplement' ? 'bg-indigo-500 text-white rounded-t-md' : ''}`}>Supplement</button>
            </div>
            <h3 className="font-semibold text-center pt-2">Create a Detailed {type === 'meal' ? 'Meal' : 'Supplement'} Shortcut</h3>
            <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Shortcut Keyword (e.g., myproteinshake)" className="w-full p-2 border rounded-md bg-white dark:bg-gray-700"/>
            <div className="max-h-40 overflow-y-auto space-y-2 p-1">
                {ALL_NUTRIENTS.map(({ name, units }) => (
                    <div key={name} className="grid grid-cols-12 gap-2 items-center">
                        <label className="text-sm col-span-4">{name.split(' (')[0]}</label>
                        <input 
                            type="number"
                            placeholder="Value"
                            value={nutrition[name] || ''}
                            onChange={e => handleNutrientChange(name, e.target.value)}
                            className="w-full p-1 border rounded-md col-span-4 bg-white dark:bg-gray-700"
                        />
                        <select className="text-xs p-1 border rounded-md col-span-2 bg-white dark:bg-gray-700">
                            {units.map(u => <option key={u}>{u}</option>)}
                        </select>
                        <span className="text-xs col-span-2 text-right">
                            {Math.round(((parseFloat(nutrition[name]) || 0) / (rdaMap[name.split(' (')[0]] || 1)) * 100)}%
                        </span>
                    </div>
                ))}
                {customNutrients.map((cust, index) => (
                     <div key={index} className="grid grid-cols-12 gap-2 items-center">
                        <input type="text" placeholder="Nutrient" value={cust.name} onChange={e => handleCustomNutrientChange(index, 'name', e.target.value)} className="text-sm col-span-4 p-1 border rounded-md bg-white dark:bg-gray-700"/>
                        <input type="number" placeholder="Value" value={cust.value} onChange={e => handleCustomNutrientChange(index, 'value', e.target.value)} className="w-full p-1 border rounded-md col-span-4 bg-white dark:bg-gray-700"/>
                        <select value={cust.unit} onChange={e => handleCustomNutrientChange(index, 'unit', e.target.value)} className="text-xs p-1 border rounded-md col-span-2 bg-white dark:bg-gray-700">
                            <option>g</option><option>mg</option><option>µg</option><option>kcal</option><option>IU</option>
                        </select>
                    </div>
                ))}
            </div>
            <button onClick={addCustomNutrient} className="w-full text-sm bg-gray-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-600">Add Custom Nutrient</button>
            <button onClick={handleSave} className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Save Shortcut</button>
        </div>
    );
};


// --- Day Summary Component ---
const DaySummary = ({ log, activityLevel, setActivityLevel }) => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');

    const rda = getPersonalizedRDA(profile, activityLevel);
    const rdaMap = rda.reduce((acc, item) => {
        acc[item.nutrient] = {
            value: parseFloat(item.value) || 1,
            unit: item.value.split(' ')[1] || ''
        };
        return acc;
    }, {});

    const totals = React.useMemo(() => {
        const newTotals = {};
        rda.forEach(item => { newTotals[item.nutrient] = 0; });

        (log.meals || []).forEach(meal => {
            for (const [key, value] of Object.entries(meal.nutrition)) {
                if (newTotals[key] !== undefined) newTotals[key] += parseFloat(value) || 0;
            }
        });
        (log.supplements || []).forEach(sup => {
            for (const [key, value] of Object.entries(sup.nutrition)) {
                if (newTotals[key] !== undefined) newTotals[key] += parseFloat(value) || 0;
            }
        });
        return newTotals;
    }, [log, rda]);
    
    const activityLevels = {
        light: { name: 'Light', tip: 'Primarily sitting (e.g., student, desk job)' },
        moderate: { name: 'Moderate', tip: 'Mix of sitting and moving (e.g., active student, light exercise)' },
        heavy: { name: 'Heavy', tip: 'Physically demanding work or intense training' }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Day Summary</h2>
            
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                {Object.entries(activityLevels).map(([key, { name, tip }]) => (
                    <button 
                        key={key} 
                        onClick={() => setActivityLevel(key)} 
                        className={`flex-1 py-2 text-center font-semibold flex items-center justify-center gap-1 group relative ${activityLevel === key ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        {name}
                        <span className="text-xs"><QuestionIcon/></span>
                        <span className="absolute bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded-md scale-0 group-hover:scale-100 transition-transform origin-bottom">{tip}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {Object.entries(totals).map(([nutrient, total]) => {
                    const goal = rdaMap[nutrient]?.value || 1;
                    const unit = rdaMap[nutrient]?.unit || '';
                    const percent = Math.min(Math.round((total / goal) * 100), 100);
                    return (
                        <div key={nutrient} className="flex flex-col items-center">
                            <DonutChart percentage={percent} />
                            <p className="text-xs font-semibold mt-2 text-center">{nutrient.split(' (')[0]}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round(total)}/{goal} {unit}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const DonutChart = ({ percentage }) => {
    const color = percentage >= 90 ? '#22c55e' : percentage >= 70 ? '#84cc16' : percentage >= 50 ? '#facc15' : '#ef4444';
    const backgroundStyle = {
        background: `radial-gradient(white 60%, transparent 61%), conic-gradient(${color} 0% ${percentage}%, #e5e7eb ${percentage}% 100%)`
    };
    return (
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={backgroundStyle}>
            <div className="absolute text-base font-bold text-gray-800">{percentage}%</div>
        </div>
    );
};


// --- Edit Modal Component ---
const EditModal = ({ item, onSave, onClose }) => {
    const [editedItem, setEditedItem] = useState(JSON.parse(JSON.stringify(item)));
    const [customNutrients, setCustomNutrients] = useState([]);

    const handleNutritionChange = (key, value) => {
        const newNutrition = { ...editedItem.nutrition, [key]: value };
        setEditedItem({ ...editedItem, nutrition: newNutrition });
    };

    const handleCustomNutrientChange = (index, field, value) => {
        const updated = [...customNutrients];
        updated[index][field] = value;
        setCustomNutrients(updated);
    };

    const addCustomNutrient = () => {
        setCustomNutrients([...customNutrients, { name: '', value: 0, unit: 'g' }]);
    };

    const handleSave = () => {
        const finalNutrition = { ...editedItem.nutrition };
        customNutrients.forEach(cust => {
            if (cust.name && cust.value > 0) {
                finalNutrition[`${cust.name} (${cust.unit})`] = cust.value;
            }
        });
        onSave({ ...editedItem, nutrition: finalNutrition });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit {editedItem.name}</h2>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {Object.entries(editedItem.nutrition).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{key}</label>
                            <input 
                                type="text" 
                                value={value}
                                onChange={(e) => handleNutritionChange(key, e.target.value)}
                                className="w-1/2 p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                            />
                        </div>
                    ))}
                    {customNutrients.map((cust, index) => (
                         <div key={index} className="grid grid-cols-12 gap-2 items-center">
                            <input type="text" placeholder="Nutrient" value={cust.name} onChange={e => handleCustomNutrientChange(index, 'name', e.target.value)} className="text-sm col-span-5 p-1 border rounded-md bg-white dark:bg-gray-700"/>
                            <input type="number" placeholder="Value" value={cust.value} onChange={e => handleCustomNutrientChange(index, 'value', e.target.value)} className="w-full p-1 border rounded-md col-span-4 bg-white dark:bg-gray-700"/>
                            <select value={cust.unit} onChange={e => handleCustomNutrientChange(index, 'unit', e.target.value)} className="text-xs p-1 border rounded-md col-span-3 bg-white dark:bg-gray-700">
                                <option>g</option><option>mg</option><option>µg</option><option>kcal</option><option>IU</option>
                            </select>
                        </div>
                    ))}
                </div>
                <button onClick={addCustomNutrient} className="w-full text-sm mt-2 bg-gray-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-600">Add Custom Nutrient</button>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={onClose} className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-md hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSave} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700">Save</button>
                </div>
            </div>
        </div>
    );
};


// --- Activity Calendar Component ---
const ActivityCalendar = ({ dailyLog, activityLevel }) => {
    const [date, setDate] = useState(new Date());
    const [selectedDateLog, setSelectedDateLog] = useState(null);
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const rda = calculateRDA(profile, activityLevel);

    const getDayStatusColor = (day) => {
        const dateString = day.toISOString().split('T')[0];
        const log = dailyLog[dateString];
        if (!log) return 'bg-gray-200 dark:bg-gray-700';

        const totals = { calories: 0, protein: 0 };
        (log.meals || []).forEach(meal => {
            totals.calories += parseFloat(meal.nutrition.Energy) || 0;
            totals.protein += parseFloat(meal.nutrition['Protein']) || 0;
        });
        (log.supplements || []).forEach(sup => {
            totals.calories += parseFloat(sup.nutrition.Energy) || 0;
            totals.protein += parseFloat(sup.nutrition['Protein']) || 0;
        });

        const caloriePercent = (totals.calories / rda.calories) * 100;
        const proteinPercent = (totals.protein / rda.protein) * 100;

        if (caloriePercent >= 95 && proteinPercent >= 95) return 'bg-green-500 text-white';
        if (caloriePercent >= 95) return 'bg-lime-500 text-white';
        if (caloriePercent >= 80) return 'bg-yellow-400 text-gray-800';
        if (caloriePercent >= 50) return 'bg-orange-400 text-white';
        return 'bg-red-500 text-white';
    };

    const handleDateClick = (day) => {
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDateLog({
            date: dateString,
            log: dailyLog[dateString] || { meals: [], supplements: [] },
            workRoutine: activityLevel
        });
    };

    const renderCalendar = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(year, month, i);
            const colorClass = getDayStatusColor(dayDate);
            days.push(
                <button key={i} onClick={() => handleDateClick(i)} className={`w-10 h-10 flex items-center justify-center rounded-full ${colorClass}`}>
                    {i}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
            {selectedDateLog && <LogDetailModal logData={selectedDateLog} onClose={() => setSelectedDateLog(null)} />}
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Activity Calendar</h2>
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>&lt;</button>
                <h3 className="font-semibold">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <div key={`day-header-${index}`} className="font-bold">{day}</div>)}
                {renderCalendar()}
            </div>
             <div className="flex flex-wrap gap-2 text-xs mt-4 justify-center">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div>Full RDA</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-lime-500"></div>Calories Met</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400"></div><span>Over 80%</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-400"></div><span>Over 50%</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Under 50%</span></div>
            </div>
        </div>
    );
};

// --- Log Detail Modal ---
const LogDetailModal = ({ logData, onClose }) => {
    const { date, log, workRoutine } = logData;
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const rda = getPersonalizedRDA(profile, workRoutine);

    // Map RDA for easy access
    const rdaMap = rda.reduce((acc, item) => {
        const [valueStr, unit] = item.value.split(' ');
        acc[item.nutrient] = { value: parseFloat(valueStr) || 1, unit: unit || '' };
        return acc;
    }, {});

    // State for totals to allow dynamic updates
    const [totals, setTotals] = React.useState({});

    // Update totals whenever log changes
    React.useEffect(() => {
        const totalsTemp = {};
        rda.forEach(item => { totalsTemp[item.nutrient] = 0; });

        [...(log.meals || []), ...(log.supplements || [])].forEach(item => {
            for (const [key, value] of Object.entries(item.nutrition)) {
                if (totalsTemp[key] !== undefined) totalsTemp[key] += parseFloat(value) || 0;
            }
        });

        setTotals(totalsTemp);
    }, [log, rda]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-2">Details for {date}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Work Routine: <span className="font-semibold capitalize">{workRoutine}</span>
                </p>

                <div className="max-h-64 overflow-y-auto space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Nutrient Summary</h3>
                        <div className="space-y-2">
                           {Object.entries(totals).map(([nutrient, total]) => {
                                const goal = rdaMap[nutrient]?.value || 1;
                                const unit = rdaMap[nutrient]?.unit || '';
                                const percent = Math.min(Math.round((total / goal) * 100), 100);

                                return (
                                    <div key={nutrient}>
                                        <div className="flex justify-between text-xs font-medium">
                                            <span>{nutrient.split(' (')[0]}</span>
                                            <span>{Math.round(total)}/{goal} {unit}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
                                        </div>
                                    </div>
                                );
                           })}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

// --- RDA Page Component ---
const RdaPage = () => {
    const [profile, setProfile] = useState(null);
    const [rdaData, setRdaData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            const parsedProfile = JSON.parse(storedProfile);
            if (parsedProfile.age && parsedProfile.weight && parsedProfile.height) {
                setProfile(parsedProfile);
                setRdaData(getPersonalizedRDA(parsedProfile));
            } else {
                 setRdaData(getPersonalizedRDA(null)); // Get default values
            }
        } else {
            setRdaData(getPersonalizedRDA(null)); // Get default values
        }
    }, []);

    const filteredData = rdaData.filter(item => item.nutrient.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!profile || !profile.age || !profile.weight || !profile.height) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 text-center">Your Personalized RDA Guide</h1>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                    <p className="mb-4">Please complete your profile (age, height, and weight) to get personalized RDA values.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Displaying default values for a reference Indian male.</p>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-4">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {getPersonalizedRDA(null).map(item => (
                            <li key={item.nutrient} className="py-3 flex justify-between items-center">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{item.nutrient}</span>
                                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 text-center">Your Personalized RDA Guide</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Values calculated for you based on your profile and ICMR-NIN 2020 data.</p>
            <input type="text" placeholder="Search for a nutrient..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 border rounded-md mb-4 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredData.map(item => (
                        <li key={item.nutrient} className="py-3 flex justify-between items-center">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{item.nutrient}</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// --- Advisor Page Component ---
const AdvisorPage = () => {
    const [activeTab, setActiveTab] = useState('supplements');
    return (
        <div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 text-center">AI Advisor</h1>
             <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                <button onClick={() => setActiveTab('supplements')} className={`flex-1 py-2 text-center font-semibold flex items-center justify-center gap-2 ${activeTab === 'supplements' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}><PillIcon /> Supplements</button>
                <button onClick={() => setActiveTab('meals')} className={`flex-1 py-2 text-center font-semibold flex items-center justify-center gap-2 ${activeTab === 'meals' ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}><FoodIcon /> Meal Advisor</button>
            </div>
            {activeTab === 'supplements' ? <SupplementAdvisor /> : <MealAdvisor />}
        </div>
    );
};

// --- Supplement Advisor Component ---
const SupplementAdvisor = () => {
    const [query, setQuery] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getSuggestion = async () => {
        if (!query) return;
        setIsLoading(true);
        setSuggestion('');
        const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const prompt = `I am a ${profileData.age}-year-old male in ${profileData.location} (${profileData.height}cm, ${profileData.weight}kg). I am looking for a supplement for "${query}". Please suggest a specific, commercially available product in India (like Becosules, Shelcal, etc.). Explain why it's a good choice and give the typical dosage. Keep the response concise and practical.`;
        
        const result = await (async () => {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
                const result = await response.json();
                return result.candidates[0].content.parts[0].text;
            } catch (error) {
                console.error("Gemini API call failed:", error);
                return "Error: Could not get a suggestion.";
            }
        })();

        setSuggestion(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">What are you looking for? (e.g., "Vitamin B Complex", "Calcium for bones")</p>
            <div className="space-y-4">
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Enter your need..." className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                <button onClick={getSuggestion} className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700">Get Suggestion</button>
            </div>
            {isLoading && <div className="text-center p-4">Finding suggestions...</div>}
            {suggestion && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <h3 className="font-bold">Suggestion:</h3>
                    <p className="whitespace-pre-wrap">{suggestion}</p>
                </div>
            )}
             <p className="text-xs text-gray-500 mt-4 text-center">Disclaimer: This is an AI-generated suggestion. Always consult with a healthcare professional before starting any new supplement.</p>
        </div>
    );
};

// --- Meal Advisor Component ---
const MealAdvisor = () => {
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [adviceType, setAdviceType] = useState(null);
    const [budget, setBudget] = useState('');
    const [imageReady, setImageReady] = useState(false);

    const getMealSuggestion = async (base64Image) => {
        if (!base64Image) {
            alert("Please upload an image first.");
            return;
        }
        if (!adviceType) {
            alert("Please select a preference (Diet or Budget).");
            return;
        }
        if (adviceType === 'budget' && !budget) {
            alert("Please enter a budget.");
            return;
        }
        setIsLoading(true);
        setSuggestion('');

        const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        let prompt;
        if (adviceType === 'diet') {
            prompt = `I am a ${profileData.age}-year-old male (${profileData.height}cm, ${profileData.weight}kg) aiming for muscle gain. Based on the attached restaurant menu image, suggest the most diet-friendly and high-protein meal option available. Explain your choice briefly.`;
        } else {
            prompt = `I am a ${profileData.age}-year-old male (${profileData.height}cm, ${profileData.weight}kg) aiming for muscle gain. Based on the attached restaurant menu image, suggest the best value-for-money, high-protein meal option that fits within a budget of INR ${budget}. Explain your choice briefly.`;
        }

        const result = await (async () => {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: base64Image } }] }] };
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
                const result = await response.json();
                return result.candidates[0].content.parts[0].text;
            } catch (error) {
                console.error("Gemini API call failed:", error);
                return "Error: Could not get a suggestion.";
            }
        })();
        
        setSuggestion(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
            <ImageUploader onImageReady={() => setImageReady(true)} title="Upload Menu Photo" onAnalyze={getMealSuggestion} />

            {imageReady && (
                <div>
                    <h3 className="font-semibold text-center mb-2">Choose your preference:</h3>
                    <div className="flex gap-4">
                        <button onClick={() => setAdviceType('diet')} className={`w-full py-2 rounded-md font-semibold ${adviceType === 'diet' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>Diet Friendly</button>
                        <button onClick={() => setAdviceType('budget')} className={`w-full py-2 rounded-md font-semibold ${adviceType === 'budget' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>Budget Friendly</button>
                    </div>
                </div>
            )}

            {adviceType === 'budget' && (
                <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="Enter budget (INR)" className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
            )}

            {isLoading && <div className="text-center p-4">Thinking...</div>}
            {suggestion && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <h3 className="font-bold">Meal Suggestion:</h3>
                    <p className="whitespace-pre-wrap">{suggestion}</p>
                </div>
            )}
        </div>
    );
};

// --- Image Uploader Component ---
const ImageUploader = ({ onImageReady, title, onAnalyze, isDisabled }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const profileIncomplete = () => {
        const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const missingFields = ['age', 'height', 'weight', 'location'].filter(f => !profileData[f]);
        if (missingFields.length > 0) {
            alert(`Please complete all fields in your profile (${missingFields.join(', ')}) before using AI features.`);
            return true;
        }
        return false;
    };

    const handleFile = (file) => {
        if (profileIncomplete()) return;

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                const base64 = reader.result.split(',')[1];
                setImageBase64(base64);
                if (onImageReady) onImageReady(base64);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image file.");
        }
    };

    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); };
    const handlePaste = useCallback((e) => {
        if (profileIncomplete()) return;

        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                handleFile(items[i].getAsFile());
                break;
            }
        }
    }, []);

    useEffect(() => { window.addEventListener('paste', handlePaste); return () => window.removeEventListener('paste', handlePaste); }, [handlePaste]);

    const startCamera = async () => {
        if (profileIncomplete()) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) videoRef.current.srcObject = stream;
            setShowModal(true);
        } catch (err) { alert("Could not access camera."); }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            const dataUrl = canvasRef.current.toDataURL('image/jpeg');
            setImageSrc(dataUrl);
            const base64 = dataUrl.split(',')[1];
            setImageBase64(base64);
            if (onImageReady) onImageReady(base64);
            stopCamera();
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setShowModal(false);
    };

    return (
        <div className="mt-4">
            <div className="flex gap-2">
                <button onClick={() => document.getElementById('file-upload').click()} className="w-1/2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600" disabled={isDisabled}>Select File</button>
                <button onClick={startCamera} className="w-1/2 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600" disabled={isDisabled}>Use Camera</button>
            </div>
            <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />

            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`mt-4 p-4 border-2 border-dashed rounded-lg text-center transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50' : 'border-gray-300 dark:border-gray-600'}`}>
                {imageSrc ? <img src={imageSrc} alt="Uploaded" className="max-h-48 mx-auto rounded-md" /> : <p>Drag & drop an image, or paste from clipboard (Ctrl+V)</p>}
            </div>

            {imageSrc && onAnalyze && <button onClick={() => onAnalyze(imageBase64)} className="w-full mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700" disabled={isDisabled}>Analyze Image</button>}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center">
                    <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg"></video>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    <div className="flex gap-4 mt-4">
                        <button onClick={captureImage} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md">Capture</button>
                        <button onClick={stopCamera} className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-md">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- Helper Functions ---
const getPersonalizedRDA = (profile, activityLevel = 'moderate') => {
    const baseRDA = ALL_NUTRIENTS.reduce((acc, nut) => {
        // Placeholder values - a real app would have a detailed database
        acc[nut.name] = { value: 1, unit: nut.defaultUnit, perKg: false };
        return acc;
    }, {});

    // Update with known values from ICMR
    Object.assign(baseRDA, {
        'Energy': { value: 2710, unit: 'kcal' },
        'Protein': { value: 0.83, unit: 'g', perKg: true },
        'Carbohydrates': { value: 4, unit: 'g', perKg: true },
        'Fat': { value: 1, unit: 'g', perKg: true },
        'Vitamin A': { value: 1000, unit: 'µg' },
        'Vitamin D': { value: 15, unit: 'µg' },
        'Vitamin E': { value: 10, unit: 'mg' },
        'Vitamin C': { value: 82, unit: 'mg' },
        'Vitamin B1 (Thiamine)': { value: 2.2, unit: 'mg' },
        'Vitamin B2 (Riboflavin)': { value: 3.1, unit: 'mg' },
        'Vitamin B3 (Niacin)': { value: 22, unit: 'mg' },
        'Vitamin B6': { value: 3.0, unit: 'mg' },
        'Vitamin B12': { value: 2.5, unit: 'µg' },
        'Calcium (Ca)': { value: 1050, unit: 'mg' },
        'Iron (Fe)': { value: 26, unit: 'mg' },
        'Zinc (Zn)': { value: 17.6, unit: 'mg' },
        'Magnesium (Mg)': { value: 385, unit: 'mg' },
        'Sodium (Na)': { value: 2000, unit: 'mg' },
        'Chloride': { value: 2300, unit: 'mg' },
        'Iodine (I)': { value: 150, unit: 'µg' },
        'Copper (Cu)': { value: 1.35, unit: 'mg' },
        'Manganese (Mn)': { value: 4, unit: 'mg' },
    });
    
    const activityMultipliers = {
        light: 1.375,
        moderate: 1.55,
        heavy: 1.725
    };

    if (!profile || !profile.weight || !profile.age || !profile.height) {
         return Object.entries(baseRDA).map(([nutrient, data]) => ({
            nutrient,
            value: `${data.value} ${data.unit.replace('/kg','')}`
        }));
    }

    const { age, weight, height } = profile;
    const bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    const calories = Math.round(bmr * activityMultipliers[activityLevel]);

    const personalized = {};
    Object.entries(baseRDA).forEach(([nutrient, data]) => {
        let finalValue = data.value;
        if (nutrient === 'Energy') {
            finalValue = calories;
        } else if (data.perKg) {
            finalValue = Math.round(data.value * weight);
        }
        personalized[nutrient] = `${finalValue} ${data.unit.replace('/kg', '')}`;
    });
    
    return Object.entries(personalized).map(([nutrient, value]) => ({
        nutrient,
        value
    }));
};

const calculateRDA = (profile, activityLevel = 'moderate') => {
    if (!profile || !profile.weight || !profile.age || !profile.height) {
        return { calories: 2710, protein: 55 };
    }
    const { age, weight, height } = profile;
    const activityMultipliers = {
        light: 1.375,
        moderate: 1.55,
        heavy: 1.725
    };
    // Harris-Benedict Equation for BMR
    const bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    const calories = Math.round(bmr * activityMultipliers[activityLevel]);
    const protein = Math.round(0.83 * weight);
    return { calories, protein };
};
