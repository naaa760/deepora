"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { KnowledgeGraph } from "@/components/graph/KnowledgeGraph";

export default function DashboardPage() {
  const [showGraph, setShowGraph] = useState(true);

  // The authentication check is handled by MainLayout
  return (
    <MainLayout>
      <div className="grid h-[calc(100vh-3.5rem)] grid-cols-1 md:grid-cols-3 gap-4">
        <div className={showGraph ? "md:col-span-2" : "md:col-span-3"}>
          <ChatInterface />
        </div>

        {showGraph && (
          <div className="h-full md:col-span-1 rounded-lg border bg-white dark:bg-gray-800">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Knowledge Graph</h2>
              <button
                onClick={() => setShowGraph(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="h-[calc(100%-3.5rem)] p-4">
              <KnowledgeGraph />
            </div>
          </div>
        )}

        {!showGraph && (
          <button
            onClick={() => setShowGraph(true)}
            className="fixed bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full"
            aria-label="Show knowledge graph"
          >
            Graph
          </button>
        )}
      </div>
    </MainLayout>
  );
}
