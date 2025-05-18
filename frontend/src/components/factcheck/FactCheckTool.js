"use client";

import { useState } from "react";
import { Check, X, AlertTriangle } from "lucide-react";

export function FactCheckTool() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!claim.trim()) return;

    setLoading(true);
    
    // Mock API call - this would be replaced with actual backend call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - this would come from your AI backend
      const factCheckResult = {
        credibilityScore: 65,
        analysis: "This claim contains elements of truth but lacks context and makes oversimplifications.",
        issues: [
          "The claim omits important time period context",
          "Statistical evidence is cherry-picked",
          "Correlation is presented as causation"
        ],
        sources: [
          {
            title: "Economic Impact Study 2023",
            author: "National Bureau of Economic Research",
            url: "https://example.com/economic-study"
          },
          {
            title: "Climate Analysis Report",
            author: "International Climate Institute",
            url: "https://example.com/climate-report"
          }
        ]
      };
      
      setResult(factCheckResult);
    } catch (error) {
      console.error("Error checking fact:", error);
      setResult({
        error: "Sorry, we couldn't analyze this claim. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <Check className="h-5 w-5 text-green-600" />;
    if (score >= 50) return <AlertTriangle className="h-5 w-5 text-amber-600" />;
    return <X className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Fact Checker</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Paste a claim or statement to analyze its credibility and see supporting evidence.
      </p>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder="Paste a claim to fact-check, e.g., 'Global temperatures have not increased in the past decade'"
          className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 h-24"
        />
        <button
          type="submit"
          disabled={!claim.trim() || loading}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Check Fact"}
        </button>
      </form>
      
      {result && !result.error && (
        <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="font-bold">Credibility Score:</div>
            <div className={`flex items-center gap-1 ${getScoreColor(result.credibilityScore)}`}>
              {getScoreIcon(result.credibilityScore)}
              <span className="font-bold">{result.credibilityScore}%</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="font-semibold mb-1">Analysis:</div>
            <p>{result.analysis}</p>
          </div>
          
          {result.issues && result.issues.length > 0 && (
            <div className="mb-4">
              <div className="font-semibold mb-1">Issues Identified:</div>
              <ul className="list-disc pl-5">
                {result.issues.map((issue, index) => (
                  <li key={index} className="text-red-600 dark:text-red-400">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {result.sources && result.sources.length > 0 && (
            <div>
              <div className="font-semibold mb-1">Sources:</div>
              <ul className="list-disc pl-5">
                {result.sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {source.title} ({source.author})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {result && result.error && (
        <div className="border border-red-300 rounded-md p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
          {result.error}
        </div>
      )}
    </div>
  );
} 