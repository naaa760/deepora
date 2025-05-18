"use client";

import { useState } from "react";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function ChatMessage({ message }) {
  const [activeSource, setActiveSource] = useState(null);

  // Function to render content with citation superscripts
  const renderContentWithCitations = () => {
    if (!message.citations || message.citations.length === 0) {
      return <ReactMarkdown>{message.content}</ReactMarkdown>;
    }

    // This is a simplified approach - a more robust solution would parse markdown properly
    let content = message.content;
    message.citations.forEach((citation) => {
      const citationMarker = `[${citation.id}]`;
      content = content.replace(
        citationMarker,
        `[${citation.id}](# "${citation.title} - ${citation.author}, ${citation.year}")`
      );
    });

    return (
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => (
            <sup>
              <a
                {...props}
                className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  const citationId = props.children?.[0]?.toString();
                  if (citationId) {
                    const citation = message.citations?.find(
                      (c) => c.id === citationId
                    );
                    if (citation) setActiveSource(citation);
                  }
                }}
              />
            </sup>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div
      className={`flex gap-3 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role !== "user" && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-white dark:bg-gray-800 shadow">
          {message.role === "assistant" ? (
            <Bot className="h-4 w-4" />
          ) : (
            <span className="text-xs">SYS</span>
          )}
        </div>
      )}

      <div
        className={`relative max-w-[80%] rounded-lg px-4 py-3 ${
          message.role === "user"
            ? "bg-blue-600 text-white"
            : message.role === "system"
            ? "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        <div className="prose dark:prose-invert prose-sm">
          {renderContentWithCitations()}
        </div>

        {message.timestamp && (
          <div className="mt-1 text-xs opacity-60">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>

      {message.role === "user" && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-blue-600 text-white shadow">
          <User className="h-4 w-4" />
        </div>
      )}

      {activeSource && (
        <div className="fixed bottom-20 right-8 w-96 rounded-lg border bg-white dark:bg-gray-800 p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{activeSource.title}</h3>
            <button
              onClick={() => setActiveSource(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Author:</span> {activeSource.author}
            </p>
            <p>
              <span className="font-medium">Publication:</span>{" "}
              {activeSource.publication} ({activeSource.year})
            </p>
            <a
              href={activeSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Source
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
