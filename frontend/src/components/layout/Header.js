"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun, Scale } from "lucide-react";
import { useDebateStore } from "@/store/debateStore";

export function Header() {
  const { user, isLoaded } = useUser();
  const { setTheme, theme } = useTheme();
  const { isDebateMode, setDebateMode } = useDebateStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">DeepDive Explorer</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            className={`px-3 py-1 rounded-md flex items-center gap-2 ${
              isDebateMode
                ? "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100"
                : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
            }`}
            onClick={() => setDebateMode(!isDebateMode)}
            aria-label="Toggle debate mode"
          >
            <Scale className="h-4 w-4" />
            Debate Mode
          </button>

          <button
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {user && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
