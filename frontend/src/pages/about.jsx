// src/pages/About.jsx
import { motion } from "framer-motion";
import { Utensils, Search, Salad, Youtube } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About <span className="text-green-400">SyNutrify</span>
        </motion.h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Your personal smart recipe finder with nutrition tracking, ingredient-based search, 
          and interactive cooking guides.  
        </p>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 bg-gray-800 rounded-2xl max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-semibold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Search className="w-12 h-12 text-green-400" />,
              title: "Search Recipes",
              desc: "Type an ingredient or dish name, and discover recipes instantly."
            },
            {
              icon: <Salad className="w-12 h-12 text-green-400" />,
              title: "View Nutrition",
              desc: "Get detailed nutrition breakdown for every recipe you explore."
            },
            {
              icon: <Youtube className="w-12 h-12 text-green-400" />,
              title: "Watch & Cook",
              desc: "Follow YouTube cooking videos directly from recipe pages."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 p-6 rounded-xl shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-300">
          <li>✅ Ingredient-based search for personalized results</li>
          <li>✅ Nutrition analysis of every recipe</li>
          <li>✅ Direct YouTube integration for cooking tutorials</li>
          <li>✅ Mobile-friendly & dark mode optimized</li>
          <li>✅ Saves time by combining food + health insights</li>
        </ul>
      </section>

      {/* Why Choose */}
      <section className="py-12 px-6 bg-gray-800 rounded-2xl max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Why Choose SyNutrify?</h2>
        <p className="text-center text-gray-300 max-w-3xl mx-auto">
          Unlike other recipe apps, SyNutrify combines **AI-powered recipe search, 
          nutrition tracking, and cooking guides** into a single platform.  
          Whether you’re a student, professional, or health-conscious food lover — 
          SyNutrify makes cooking smart, simple, and fun.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <motion.a
          href="/"
          className="bg-green-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-400 transition"
          whileHover={{ scale: 1.05 }}
        >
          Start Exploring Recipes 🍳
        </motion.a>
      </section>
    </div>
  );
}

