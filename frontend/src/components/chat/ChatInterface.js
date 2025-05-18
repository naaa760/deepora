"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { useGraphStore } from "@/store/graphStore";
import { ChatMessage } from "./ChatMessage";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const { messages, addMessage } = useChatStore();
  const { addNode, addLink } = useGraphStore();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    addMessage({
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    });
    setInput("");

    // Mock API call - replace with actual API call to backend
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response with citations
      const response = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Photosynthesis is the process by which plants, algae, and certain bacteria convert light energy into chemical energy[1]. This process occurs in the chloroplasts of plant cells, specifically in structures called thylakoids[2].

The process is divided into two main phases:

1. Light-dependent reactions: These reactions capture energy from sunlight to produce ATP and NADPH[3].
2. Light-independent reactions (Calvin cycle): These reactions use the ATP and NADPH to convert CO2 into glucose[4].

The overall equation for photosynthesis can be written as:
6CO2 + 6H2O + light energy → C6H12O6 + 6O2[5]`,
        timestamp: new Date(),
        citations: [
          {
            id: "1",
            title: "Photosynthesis: An Overview",
            author: "Campbell et al.",
            publication: "Biology Textbook, 12th Edition",
            year: 2023,
            url: "https://example.com/photosynthesis-overview",
          },
          {
            id: "2",
            title: "Chloroplast Structure and Function",
            author: "Buchanan B.",
            publication: "Plant Cell Biology",
            year: 2022,
            url: "https://example.com/chloroplast-structure",
          },
          {
            id: "3",
            title: "Light-Dependent Reactions in Photosynthesis",
            author: "Johnson M.",
            publication: "Journal of Plant Physiology",
            year: 2023,
            url: "https://example.com/light-dependent",
          },
          {
            id: "4",
            title: "The Calvin Cycle Explained",
            author: "Smith A. & Jones B.",
            publication: "Biochemistry Today",
            year: 2021,
            url: "https://example.com/calvin-cycle",
          },
          {
            id: "5",
            title: "Chemical Equations in Photosynthesis",
            author: "Garcia R.",
            publication: "Plant Science",
            year: 2022,
            url: "https://example.com/photosynthesis-equations",
          },
        ],
      };

      addMessage(response);

      // Update knowledge graph with new information
      const mainNode = {
        id: "photosynthesis",
        label: "Photosynthesis",
        group: 1,
      };
      const subNodes = [
        { id: "light-reactions", label: "Light-Dependent Reactions", group: 2 },
        { id: "calvin-cycle", label: "Calvin Cycle", group: 2 },
        { id: "chloroplasts", label: "Chloroplasts", group: 3 },
        { id: "thylakoids", label: "Thylakoids", group: 3 },
      ];

      addNode(mainNode);
      subNodes.forEach((node) => {
        addNode(node);
        addLink({ source: mainNode.id, target: node.id, value: 1 });
      });
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: "system",
        content:
          "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
      });
    }
  };

  return (
    <div className="flex h-full flex-col border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-md text-center">
              <h2 className="text-2xl font-bold">
                Welcome to DeepDive Explorer
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Ask a question to start exploring any topic in depth with AI
                assistance and reliable sources.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about any topic..."
            className="flex-1 p-2 border rounded-md bg-white dark:bg-gray-800"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            <SendHorizontal className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
