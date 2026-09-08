import React, { useState } from "react";
import {
  Search,
  HeartPulse,
  Pill,
  Activity,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Brain,
  Apple,
  Stethoscope,
  X,
  ChevronDown,
  Check,
} from "lucide-react";

export default function HealthLibrary() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const libraryData = [
    {
      title: "Diabetes",
      type: "Disease",
      icon: HeartPulse,
      category: "Diseases",
      description: "Learn symptoms, causes, treatment and prevention.",
      details: {
        overview: "Diabetes is a chronic condition affecting blood sugar levels.",
        symptoms: ["Excessive thirst", "Frequent urination", "Fatigue", "Blurred vision"],
        causes: ["Genetics", "Obesity", "Sedentary lifestyle", "Age"],
        treatment: ["Insulin therapy", "Oral medications", "Diet management", "Exercise"],
        prevention: ["Maintain healthy weight", "Regular exercise", "Balanced diet", "Annual checkups"]
      }
    },
    {
      title: "Hypertension",
      type: "Disease",
      icon: HeartPulse,
      category: "Diseases",
      description: "Understand high blood pressure and heart health.",
      details: {
        overview: "Hypertension (high blood pressure) increases risk of heart disease and stroke.",
        symptoms: ["Headaches", "Shortness of breath", "Chest pain", "Dizziness"],
        causes: ["Salt intake", "Stress", "Lack of exercise", "Genetics"],
        treatment: ["ACE inhibitors", "Beta blockers", "Diuretics", "Lifestyle changes"],
        prevention: ["Reduce salt", "Exercise regularly", "Manage stress", "Limit alcohol"]
      }
    },
    {
      title: "Asthma",
      type: "Disease",
      icon: Stethoscope,
      category: "Diseases",
      description: "Breathing condition affecting airways.",
      details: {
        overview: "Asthma is a respiratory condition causing inflammation of the airways.",
        symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Persistent cough"],
        causes: ["Allergies", "Air pollution", "Exercise", "Cold air"],
        treatment: ["Inhalers", "Corticosteroids", "Bronchodilators", "Allergy management"],
        prevention: ["Avoid triggers", "Regular exercise", "Clean environment", "Allergy control"]
      }
    },
    {
      title: "COVID-19",
      type: "Disease",
      icon: HeartPulse,
      category: "Diseases",
      description: "Viral infection caused by SARS-CoV-2 virus.",
      details: {
        overview: "COVID-19 is a contagious respiratory illness with varying severity.",
        symptoms: ["Fever", "Cough", "Loss of taste/smell", "Difficulty breathing"],
        causes: ["Viral infection", "Close contact"],
        treatment: ["Rest", "Hydration", "Antiviral drugs", "Oxygen therapy"],
        prevention: ["Vaccination", "Masking", "Distancing", "Hand hygiene"]
      }
    },
    {
      title: "Paracetamol",
      type: "Medicine",
      icon: Pill,
      category: "Medicines",
      description: "Used for fever and mild pain relief.",
      details: {
        dosage: "500-1000mg every 4-6 hours",
        maxDaily: "4000mg per day",
        uses: ["Fever reduction", "Pain relief", "Headaches", "Muscle aches"],
        sideEffects: ["Nausea", "Allergic reactions (rare)", "Liver issues (overdose)"],
        interactions: ["Alcohol", "Other acetaminophen products"],
        warnings: ["Not for liver disease", "Avoid with alcohol", "Check other medications"]
      }
    },
    {
      title: "Ibuprofen",
      type: "Medicine",
      icon: Pill,
      category: "Medicines",
      description: "Anti-inflammatory pain relief medicine.",
      details: {
        dosage: "200-400mg every 4-6 hours",
        maxDaily: "1200mg per day (OTC)",
        uses: ["Pain relief", "Inflammation reduction", "Fever", "Menstrual cramps"],
        sideEffects: ["Stomach upset", "Heartburn", "Dizziness", "Nausea"],
        interactions: ["Blood thinners", "ACE inhibitors", "Aspirin"],
        warnings: ["Take with food", "Avoid if pregnant", "Monitor for GI issues"]
      }
    },
    {
      title: "Aspirin",
      type: "Medicine",
      icon: Pill,
      category: "Medicines",
      description: "Pain reliever and blood thinner.",
      details: {
        dosage: "325-650mg every 4-6 hours",
        maxDaily: "3000mg per day",
        uses: ["Pain relief", "Heart attack prevention", "Stroke prevention", "Fever"],
        sideEffects: ["Stomach irritation", "Bleeding", "Rash", "Difficulty breathing"],
        interactions: ["Ibuprofen", "Blood thinners", "Methotrexate"],
        warnings: ["Not for children", "Avoid if allergic", "Take with food"]
      }
    },
    {
      title: "Metformin",
      type: "Medicine",
      icon: Pill,
      category: "Medicines",
      description: "First-line diabetes medication.",
      details: {
        dosage: "500-1000mg twice daily",
        maxDaily: "2550mg per day",
        uses: ["Type 2 diabetes", "PCOS management", "Prediabetes prevention"],
        sideEffects: ["Nausea", "Diarrhea", "Metallic taste", "Lactic acidosis (rare)"],
        interactions: ["Contrast dye", "Certain diabetes drugs", "Alcohol"],
        warnings: ["Monitor kidney function", "Avoid before surgery", "Stay hydrated"]
      }
    },
    {
      title: "Headache",
      type: "Symptom",
      icon: Activity,
      category: "Symptoms",
      description: "Common symptom with various causes.",
      details: {
        types: ["Tension headache", "Migraine", "Cluster headache", "Sinus headache"],
        causes: ["Stress", "Dehydration", "Sleep deprivation", "Caffeine withdrawal", "Eye strain"],
        homeRemedy: ["Rest", "Hydration", "Cold/warm compress", "Massage", "Relaxation"],
        whenToSeek: ["Severe pain", "Vision changes", "Neck stiffness", "Frequent occurrence"],
        prevention: ["Manage stress", "Sleep well", "Stay hydrated", "Regular exercise"]
      }
    },
    {
      title: "Fever",
      type: "Symptom",
      icon: Activity,
      category: "Symptoms",
      description: "Body temperature higher than normal.",
      details: {
        normal: "98.6°F (37°C)",
        mild: "99-100.9°F (37.2-38.3°C)",
        high: "101°F+ (38.3°C+)",
        causes: ["Infection", "Inflammation", "Heat exhaustion", "Medications"],
        homeRemedy: ["Rest", "Cool compress", "Fluids", "Light clothing", "Fever-reducing medicine"],
        whenToSeek: ["High fever in child", "Fever lasting 3+ days", "Severe symptoms", "Difficulty breathing"]
      }
    },
    {
      title: "Cough",
      type: "Symptom",
      icon: Activity,
      category: "Symptoms",
      description: "Reflex to clear airways of irritants.",
      details: {
        types: ["Dry cough", "Wet cough (productive)", "Whooping cough", "Chronic cough"],
        causes: ["Cold/flu", "Allergies", "Acid reflux", "Asthma", "Smoking"],
        homeRemedy: ["Honey tea", "Cough drops", "Humidifier", "Stay hydrated", "Rest"],
        whenToSeek: ["Lasting 3+ weeks", "Bloody sputum", "Severe pain", "Breathing difficulty"]
      }
    },
    {
      title: "Fatigue",
      type: "Symptom",
      icon: Activity,
      category: "Symptoms",
      description: "Persistent lack of energy and tiredness.",
      details: {
        causes: ["Sleep deprivation", "Anemia", "Thyroid issues", "Depression", "Chronic illness"],
        homeRemedy: ["Quality sleep", "Exercise", "Balanced diet", "Stress management", "Hydration"],
        investigation: ["Blood tests", "Thyroid screening", "Sleep study", "Mental health evaluation"],
        prevention: ["Sleep routine", "Regular exercise", "Balanced meals", "Stress relief"]
      }
    },
    {
      title: "Mental Wellness",
      type: "Health Guide",
      icon: Brain,
      category: "Mental Health",
      description: "Tips for managing stress and anxiety.",
      details: {
        strategies: ["Meditation", "Deep breathing", "Yoga", "Journaling", "Therapy"],
        stressManagement: ["Exercise", "Mindfulness", "Social connection", "Adequate sleep", "Hobbies"],
        anxiety: ["Progressive muscle relaxation", "Cognitive behavioral therapy", "Medication if needed"],
        depression: ["Professional help", "Social support", "Exercise", "Medication", "Therapy"],
        resources: ["Therapists", "Support groups", "Hotlines", "Apps", "Counseling services"]
      }
    },
    {
      title: "Sleep Hygiene",
      type: "Health Guide",
      icon: Brain,
      category: "Mental Health",
      description: "Improve sleep quality and manage insomnia.",
      details: {
        bestPractices: ["Consistent bedtime", "Dark room", "Cool temperature", "No screens 1 hour before"],
        avoid: ["Caffeine after noon", "Heavy meals late", "Alcohol before bed", "Exercise close to bedtime"],
        techniques: ["4-7-8 breathing", "Progressive relaxation", "Visualization", "Meditation"],
        duration: ["Adults need 7-9 hours", "Teens need 8-10 hours", "Children need 9-12 hours"],
        whenToSeek: ["Persistent insomnia", "Sleep apnea symptoms", "Daytime impairment"]
      }
    },
    {
      title: "Stress Management",
      type: "Health Guide",
      icon: Brain,
      category: "Mental Health",
      description: "Techniques for managing daily stress.",
      details: {
        physicalActivities: ["Yoga", "Walking", "Swimming", "Dancing", "Sports"],
        mindfulness: ["Meditation", "Breathing exercises", "Mindful eating", "Body scan"],
        lifestyle: ["Time management", "Hobbies", "Social time", "Adequate sleep"],
        professional: ["Counseling", "Therapy", "Coaching", "Support groups"],
        emergency: ["Crisis hotlines", "Emergency services", "Trusted support person"]
      }
    },
    {
      title: "Healthy Nutrition",
      type: "Nutrition",
      icon: Apple,
      category: "Nutrition",
      description: "Balanced diet and healthy lifestyle guidance.",
      details: {
        foodGroups: ["Vegetables", "Fruits", "Whole grains", "Proteins", "Dairy", "Healthy fats"],
        servings: ["Vegetables: 2-3 cups daily", "Fruits: 1.5-2 cups daily", "Grains: 5-8 ounces daily"],
        proteins: ["Lean meats", "Fish", "Beans", "Nuts", "Eggs", "Tofu"],
        hydration: ["8-10 glasses water daily", "Limit sugary drinks", "Tea/coffee in moderation"],
        avoid: ["Excessive salt", "Added sugars", "Ultra-processed foods", "Excess alcohol"]
      }
    },
    {
      title: "Weight Management",
      type: "Nutrition",
      icon: Apple,
      category: "Nutrition",
      description: "Healthy approaches to maintaining ideal weight.",
      details: {
        principles: ["Calorie balance", "Portion control", "Balanced macronutrients", "Regular exercise"],
        diet: ["Mediterranean diet", "DASH diet", "Plant-based diet", "Intermittent fasting"],
        exercise: ["150 min cardio/week", "Strength training 2x/week", "Flexibility training"],
        monitoring: ["Track progress", "Weight checks monthly", "Body measurements", "How clothes fit"],
        support: ["Dietitian consultation", "Support groups", "Fitness programs"]
      }
    },
    {
      title: "Vitamin & Minerals",
      type: "Nutrition",
      icon: Apple,
      category: "Nutrition",
      description: "Essential nutrients for optimal health.",
      details: {
        vitaminD: ["Sun exposure 10-30 min/day", "Fatty fish", "Fortified milk", "Supplements"],
        vitaminC: ["Citrus fruits", "Berries", "Leafy greens", "Bell peppers"],
        iron: ["Red meat", "Spinach", "Beans", "Fortified cereals"],
        calcium: ["Dairy products", "Leafy greens", "Fortified plants", "Supplements"],
        zinc: ["Oysters", "Beef", "Chickpeas", "Nuts", "Seeds"]
      }
    },
    {
      title: "Disease Prevention",
      type: "Health Guides",
      icon: BookOpen,
      category: "Health Guides",
      description: "Preventive measures for common diseases.",
      details: {
        vaccinations: ["Annual flu shot", "COVID-19 vaccine", "Pneumonia vaccine", "Shingles vaccine"],
        screenings: ["Blood pressure", "Cholesterol", "Cancer screening", "Diabetes screening"],
        lifestyle: ["Exercise regularly", "Maintain healthy weight", "Don't smoke", "Limit alcohol"],
        checkups: ["Annual physical", "Dental checkups", "Eye exams", "Age-appropriate screenings"],
        monitoring: ["Track vital signs", "Keep health records", "Monitor symptoms"]
      }
    },
    {
      title: "First Aid Basics",
      type: "Health Guides",
      icon: BookOpen,
      category: "Health Guides",
      description: "Essential first aid knowledge for emergencies.",
      details: {
        cpr: ["Hand position on chest", "Push hard and fast", "100-120 compressions/min", "Call emergency"],
        bleeding: ["Apply pressure", "Use clean bandage", "Elevate if possible", "Seek help if severe"],
        burns: ["Cool with water", "Remove tight items", "Cover with clean cloth", "Avoid ice"],
        choking: ["Back blows", "Abdominal thrusts", "Call emergency", "CPR if unconscious"],
        allergies: ["Remove allergen", "Antihistamine", "Epinephrine if severe", "Emergency services"]
      }
    },
    {
      title: "Exercise & Fitness",
      type: "Health Guides",
      icon: BookOpen,
      category: "Health Guides",
      description: "Guidelines for regular physical activity.",
      details: {
        cardio: ["Brisk walking", "Running", "Cycling", "Swimming", "150 min/week"],
        strength: ["Weight training", "Resistance bands", "Bodyweight exercises", "2-3 times/week"],
        flexibility: ["Stretching", "Yoga", "Pilates", "Tai Chi", "Daily"],
        beginners: ["Start slow", "Increase gradually", "Warm up and cool down", "Rest days"],
        benefits: ["Better heart health", "Weight management", "Mental health", "Energy levels"]
      }
    },
  ];

  const filteredData = libraryData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const trending = [
    "Diabetes",
    "Fever",
    "Migraine",
    "Vitamin D",
    "Asthma",
    "Blood Pressure",
  ];

  const featuredArticles = [
    {
      title: "Understanding Diabetes",
      description:
        "Everything you need to know about symptoms, causes and management.",
    },
    {
      title: "Heart Health Guide",
      description:
        "Protect your heart with healthy habits and regular monitoring.",
    },
    {
      title: "Mental Wellness",
      description:
        "Simple ways to improve focus, mood and emotional health.",
    },
  ];

  const categories = [
    { name: "All", icon: ShieldCheck },
    { name: "Diseases", icon: HeartPulse },
    { name: "Medicines", icon: Pill },
    { name: "Symptoms", icon: Activity },
    { name: "Nutrition", icon: Apple },
    { name: "Mental Health", icon: Brain },
    { name: "Health Guides", icon: BookOpen },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const DetailModal = ({ item, onClose }) => {
    if (!item) return null;

    const Icon = item.icon;
    const detailEntries = Object.entries(item.details).filter(
      ([_, value]) => value && (Array.isArray(value) ? value.length > 0 : value !== "")
    );

    const getSectionLabel = (key) => {
      const labels = {
        overview: "📋 Overview",
        symptoms: "🤒 Symptoms",
        causes: "🔍 Causes",
        treatment: "💊 Treatment",
        prevention: "🛡️ Prevention",
        types: "📊 Types",
        homeRemedy: "🏥 Home Remedies",
        whenToSeek: "⚠️ When to Seek Help",
        dosage: "⏰ Dosage",
        maxDaily: "📍 Maximum Daily Dose",
        uses: "✅ Uses",
        sideEffects: "⚠️ Side Effects",
        interactions: "🔗 Drug Interactions",
        warnings: "⛔ Warnings",
        investigation: "🔬 Investigation",
        strategies: "🎯 Strategies",
        stressManagement: "😌 Stress Management",
        anxiety: "😰 Anxiety Relief",
        depression: "💔 Depression Support",
        resources: "📞 Resources",
        bestPractices: "✨ Best Practices",
        avoid: "❌ Avoid These",
        techniques: "🧘 Techniques",
        duration: "⏱️ Sleep Duration",
        physicalActivities: "🏃 Physical Activities",
        mindfulness: "🧠 Mindfulness",
        lifestyle: "🌟 Lifestyle Changes",
        professional: "👨‍⚕️ Professional Help",
        emergency: "🚨 Emergency",
        foodGroups: "🍽️ Food Groups",
        servings: "🥗 Daily Servings",
        proteins: "🍗 Protein Sources",
        hydration: "💧 Hydration",
        principles: "🎯 Principles",
        diet: "🥘 Diet Options",
        exercise: "💪 Exercise Plan",
        monitoring: "📊 Monitoring",
        support: "🤝 Support",
        vitaminD: "☀️ Vitamin D",
        vitaminC: "🍊 Vitamin C",
        iron: "⚔️ Iron",
        calcium: "🥛 Calcium",
        zinc: "✨ Zinc",
        vaccinations: "💉 Vaccinations",
        screenings: "🔍 Screenings",
        lifestyle: "🌱 Lifestyle",
        checkups: "🏥 Checkups",
        cpr: "❤️ CPR",
        bleeding: "🩸 Bleeding",
        burns: "🔥 Burns",
        choking: "😵 Choking",
        allergies: "🦟 Allergies",
        cardio: "🏃 Cardio",
        strength: "💪 Strength",
        flexibility: "🤸 Flexibility",
        beginners: "🌱 For Beginners",
        benefits: "🌟 Benefits",
      };
      return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-3xl p-6 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Icon size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{item.title}</h2>
                <p className="text-emerald-100 mt-1">{item.type}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {detailEntries.map(([key, value], index) => (
              <div key={key} className="border border-emerald-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-emerald-50 to-green-50 p-4 hover:from-emerald-100 hover:to-green-100 transition"
                >
                  <span className="font-semibold text-slate-900 text-lg">
                    {getSectionLabel(key)}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-emerald-600 transition ${
                      expandedSections[key] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedSections[key] && (
                  <div className="bg-white p-4 border-t border-emerald-100">
                    {typeof value === "string" ? (
                      <p className="text-slate-700 leading-relaxed">{value}</p>
                    ) : Array.isArray(value) ? (
                      <ul className="space-y-2">
                        {value.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check size={18} className="text-emerald-600 mt-1 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-emerald-50 border-t border-emerald-200 p-4 flex gap-3 justify-center rounded-b-3xl">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition"
            >
              Close
            </button>
            <button className="px-6 py-2 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition">
              Save to Favorites
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#86efac,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#bbf7d0,transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full font-medium mb-6">
              <ShieldCheck size={16} />
              Trusted Medical Knowledge
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900">
              Health
              <span className="text-emerald-600"> Library</span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-600 text-lg mt-6">
              Explore trusted information about diseases, medicines,
              symptoms, wellness and preventive healthcare.
            </p>

            <div className="mt-10 max-w-2xl mx-auto relative">
              <Search
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search diseases, medicines, symptoms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/90 backdrop-blur-xl border border-emerald-200 rounded-2xl py-4 pl-14 pr-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-200"
              />
            </div>

            <div className="flex justify-center flex-wrap gap-3 mt-8">
              {trending.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSearch(item);
                    setSelectedCategory("All");
                  }}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                    search === item
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "bg-white border-emerald-200 hover:bg-emerald-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["500+", "Articles"],
            ["200+", "Medicines"],
            ["100+", "Conditions"],
            ["24/7", "Health Access"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="bg-white rounded-3xl p-6 shadow-md border border-emerald-100 text-center"
            >
              <h3 className="text-3xl font-bold text-emerald-600">{num}</h3>
              <p className="text-slate-600 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES - WORKING BUTTONS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Browse Categories
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSearch("");
                }}
                className={`rounded-3xl p-6 border shadow transition-all ${
                  selectedCategory === cat.name
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-xl -translate-y-1"
                    : "bg-white border-emerald-100 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <Icon
                  className={`mb-4 ${
                    selectedCategory === cat.name
                      ? "text-white"
                      : "text-emerald-600"
                  }`}
                  size={34}
                />
                <h3
                  className={`font-semibold ${
                    selectedCategory === cat.name
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {cat.name}
                </h3>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-emerald-600" />
          <h2 className="text-3xl font-bold">Featured Articles</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.title}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-4">
                {article.title}
              </h3>

              <p className="text-emerald-50 mb-6">
                {article.description}
              </p>

              <button className="flex items-center gap-2 font-semibold hover:translate-x-1 transition">
                Read Article
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HEALTH LIBRARY ITEMS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Health Resources
          </h2>
          <p className="text-slate-600">
            Showing {filteredData.length} result{filteredData.length !== 1 ? "s" : ""} for "{selectedCategory === "All" ? "all categories" : selectedCategory}"
            {search && ` - "${search}"`}
          </p>
        </div>

        {filteredData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-6 shadow-md border border-emerald-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 transition">
                    <Icon
                      size={28}
                      className="text-emerald-600 group-hover:text-white transition"
                    />
                  </div>

                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                    {item.type}
                  </span>

                  <h3 className="text-xl font-bold mt-4 text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 mt-3">
                    {item.description}
                  </p>

                  {/* Detailed Information Preview */}
                  <div className="mt-4 pt-4 border-t border-emerald-100 space-y-2 text-sm text-slate-600">
                    {item.details.overview && (
                      <div>
                        <span className="font-semibold text-slate-900">Overview:</span>
                        <p>{item.details.overview}</p>
                      </div>
                    )}
                    {item.details.symptoms && (
                      <div>
                        <span className="font-semibold text-slate-900">Key Points:</span>
                        <ul className="list-disc list-inside mt-1">
                          {item.details.symptoms.slice(0, 2).map((symptom, idx) => (
                            <li key={idx}>{symptom}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-5 flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No results found for your search.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-[32px] p-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Stay Informed. Stay Healthy.
          </h2>

          <p className="max-w-2xl mx-auto text-emerald-100">
            Access reliable health information anytime and make better
            healthcare decisions with Near My Med.
          </p>

          <button className="mt-6 px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:scale-105 transition">
            Explore More
          </button>
        </div>
      </section>

      {/* Detail Modal */}
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
