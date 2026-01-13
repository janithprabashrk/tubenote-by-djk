"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Sparkles, Loader2 } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const generateNotes = async () => {
    setLoading(true);
    // Note: In a real app, you'd fetch the transcript here. 
    // For now, we'll pass a placeholder or use a free transcript tool.
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: "Your video transcript text here..." }),
      });
      const data = await res.json();
      setNotes(data.notes);
    } catch (err) {
      alert("Error generating notes");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-600">TubeNote-by-DJK</h1>
          <p className="text-gray-600 mt-2">AI-Powered YouTube Study Companion</p>
        </header>

        <div className="flex gap-2 mb-8">
          <input 
            className="flex-1 p-3 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste YouTube Link (e.g., https://youtube.com/watch?v=...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={generateNotes}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            Generate
          </button>
        </div>

        {notes && (
          <div className="bg-white p-6 rounded-xl shadow-md border relative">
            <button 
              onClick={() => navigator.clipboard.writeText(notes)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-600"
            >
              <Copy size={20} />
            </button>
            <article className="prose max-w-none">
              <ReactMarkdown>{notes}</ReactMarkdown>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}