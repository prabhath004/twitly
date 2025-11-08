import { useState, useEffect, useCallback } from "react";

interface UseSummarizeOptions {
  text: string;
  maxLength?: number;
  enabled?: boolean;
}

interface UseSummarizeResult {
  summary: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to summarize text using OpenAI API
 * Only summarizes if text is longer than maxLength
 * Returns original text if already short enough
 */
export function useSummarize({
  text,
  maxLength = 100,
  enabled = true,
}: UseSummarizeOptions): UseSummarizeResult {
  const [summary, setSummary] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summarize = useCallback(async () => {
    // Don't summarize if disabled or text is empty
    if (!enabled || !text) {
      setSummary(text);
      return;
    }

    // Don't summarize if text is already short enough
    if (text.length <= maxLength) {
      setSummary(text);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, maxLength }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize text");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Error summarizing text:", err);
      setError(err instanceof Error ? err.message : "Failed to summarize");
      // Fallback to truncated text
      setSummary(text.substring(0, maxLength) + (text.length > maxLength ? "..." : ""));
    } finally {
      setIsLoading(false);
    }
  }, [text, maxLength, enabled]);

  useEffect(() => {
    summarize();
  }, [summarize]);

  return { summary, isLoading, error };
}
