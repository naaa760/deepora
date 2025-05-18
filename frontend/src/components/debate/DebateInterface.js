"use client";

import { useState } from "react";
import { SendHorizontal, ThumbsUp, ThumbsDown } from "lucide-react";
import { useDebateStore } from "@/store/debateStore";
import { useChatStore } from "@/store/chatStore";

export function DebateInterface() {
  const [debateInput, setDebateInput] = useState("");
  const {
    debateTopic,
    setDebateTopic,
    proArguments,
    conArguments,
    addProArgument,
    addConArgument,
    clearDebate,
  } = useDebateStore();
  const { addMessage } = useChatStore();

  const handleSubmitDebateTopic = async (e) => {
    e.preventDefault();
    if (!debateInput.trim()) return;

    // Set the debate topic
    setDebateTopic(debateInput);
    setDebateInput("");

    // Add the question to chat history for reference
    addMessage({
      id: Date.now().toString(),
      content: `Debate topic: ${debateInput}`,
      role: "user",
      timestamp: new Date(),
    });

    // Mock API call - this would be replaced with actual backend call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add Pro arguments (mock data)
      addProArgument({
        id: "pro1",
        content:
          "Universal Basic Income provides a safety net that reduces poverty and financial stress[1]. Studies have shown that giving people a guaranteed income improves health outcomes and reduces healthcare costs[2].",
        citations: [
          {
            id: "1",
            title: "UBI and Poverty Reduction",
            author: "Johnson et al.",
            publication: "Economic Policy Journal",
            year: 2023,
            url: "https://example.com/ubi-poverty",
          },
          {
            id: "2",
            title: "Health Effects of Economic Security",
            author: "Williams M.",
            publication: "Public Health Review",
            year: 2024,
            url: "https://example.com/health-economic-security",
          },
        ],
      });

      addProArgument({
        id: "pro2",
        content:
          "UBI supports entrepreneurship by providing financial security that allows people to take risks and start businesses[3]. It also supports unpaid but valuable work like caregiving and community service[4].",
        citations: [
          {
            id: "3",
            title: "UBI and Entrepreneurship",
            author: "Chen & Park",
            publication: "Innovation Economics",
            year: 2023,
            url: "https://example.com/ubi-entrepreneurship",
          },
          {
            id: "4",
            title: "Valuing Unpaid Work",
            author: "Gonzalez R.",
            publication: "Journal of Economic Perspectives",
            year: 2022,
            url: "https://example.com/unpaid-work-value",
          },
        ],
      });

      // Add Con arguments (mock data)
      addConArgument({
        id: "con1",
        content:
          "Universal Basic Income is prohibitively expensive and would require significant tax increases or budget cuts to implement nationwide[5]. Current estimates suggest it could cost trillions annually for even modest payments[6].",
        citations: [
          {
            id: "5",
            title: "Fiscal Impact of UBI Programs",
            author: "Thompson et al.",
            publication: "Budget Policy Analysis",
            year: 2024,
            url: "https://example.com/ubi-fiscal-impact",
          },
          {
            id: "6",
            title: "Taxation Requirements for UBI",
            author: "Roberts S.",
            publication: "Public Finance Quarterly",
            year: 2023,
            url: "https://example.com/ubi-taxation",
          },
        ],
      });

      addConArgument({
        id: "con2",
        content:
          "UBI may reduce work incentives and labor force participation, particularly for low-wage workers[7]. Some pilot studies have shown modest decreases in employment hours among recipients[8].",
        citations: [
          {
            id: "7",
            title: "Labor Market Effects of Cash Transfers",
            author: "Miller & Brown",
            publication: "Labor Economics",
            year: 2022,
            url: "https://example.com/cash-transfers-labor",
          },
          {
            id: "8",
            title: "UBI Pilot Results: Employment Impacts",
            author: "Garcia J.",
            publication: "Policy Evaluation Journal",
            year: 2023,
            url: "https://example.com/ubi-employment-effects",
          },
        ],
      });

      // Add a system message to chat as well
      addMessage({
        id: (Date.now() + 1).toString(),
        content: `Debate analysis prepared for topic: "${debateInput}". Pro and con arguments are now available in Debate Mode.`,
        role: "system",
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error generating debate:", error);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: "system",
        content:
          "Sorry, there was an error generating the debate. Please try again.",
        timestamp: new Date(),
      });
    }
  };

  const renderArguments = (side, arguments) => {
    return (
      <div className="space-y-4">
        {arguments.map((arg) => (
          <div
            key={arg.id}
            className="border rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <div className="prose dark:prose-invert prose-sm">
              <p>{arg.content}</p>

              {arg.citations && arg.citations.length > 0 && (
                <div className="mt-2 text-sm">
                  <div className="font-medium">Sources:</div>
                  <ul className="list-disc pl-5 mt-1">
                    {arg.citations.map((citation) => (
                      <li key={citation.id}>
                        <a
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {citation.title} ({citation.author}, {citation.year})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-2 mt-3">
                <button className="text-gray-500 hover:text-green-600">
                  <ThumbsUp className="h-4 w-4" />
                </button>
                <button className="text-gray-500 hover:text-red-600">
                  <ThumbsDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col border rounded-lg">
      {!debateTopic ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold mb-4">Debate Mode</h2>
          <p className="text-center mb-6 max-w-md text-gray-600 dark:text-gray-400">
            Enter a topic to see arguments for and against. The AI will research
            and present balanced perspectives with citations.
          </p>

          <form onSubmit={handleSubmitDebateTopic} className="w-full max-w-md">
            <div className="flex gap-2">
              <input
                type="text"
                value={debateInput}
                onChange={(e) => setDebateInput(e.target.value)}
                placeholder="e.g., Universal Basic Income, Nuclear Energy, AI Regulation"
                className="flex-1 p-2 border rounded-md bg-white dark:bg-gray-800"
              />
              <button
                type="submit"
                disabled={!debateInput.trim()}
                className="p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
              >
                <SendHorizontal className="h-5 w-5" />
                <span className="sr-only">Submit</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="font-semibold">Debate: {debateTopic}</h2>
            <button
              onClick={clearDebate}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              New Topic
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 divide-x h-full">
              <div className="p-4 bg-green-50 dark:bg-green-950">
                <div className="mb-3 font-medium text-green-800 dark:text-green-200">
                  Arguments For
                </div>
                {renderArguments("pro", proArguments)}
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950">
                <div className="mb-3 font-medium text-red-800 dark:text-red-200">
                  Arguments Against
                </div>
                {renderArguments("con", conArguments)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
