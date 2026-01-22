import  { useState } from "react";
import axios from "axios";
import MoodDisplay from "./components/MoodDisplay";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [input, setInput] = useState("");
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/mood/generate`, {
        prompt: input,
      });
      setMood(data);
    } catch (err) {
      console.error("Connection failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center pt-20 transition-all duration-1000 px-4"
      style={{
        backgroundColor: mood ? `${mood.color}11` : "#0f172a",
        color: "#ffffff",
      }}
    >
      <div className="w-full max-w-md">
        {/* Header - Always at top */}
        <h1 className="text-4xl font-black text-center mb-10 tracking-tight">
          MoodBoard <span className="text-blue-500">AI</span>
        </h1>

        {/* Search Bar - Stays here */}
        <form onSubmit={handleSubmit} className="relative group">
          <input
            className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            placeholder="Describe your current vibe..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-3 px-5 py-2 bg-white text-black rounded-xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "..." : "Go"}
          </button>
        </form>

        {/* Results Area - Appears right below the bar */}
        <div className="mt-8 w-full">
          <MoodDisplay data={mood} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
