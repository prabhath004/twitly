"use client";

import { useSummarize } from "@/lib/use-summarize";

interface SummarizedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  showLoadingState?: boolean;
}

/**
 * Component that displays AI-summarized text
 * Uses OpenAI to shorten long text while preserving key information
 * Falls back to truncation if summarization fails
 */
export function SummarizedText({
  text,
  maxLength = 100,
  className = "",
  showLoadingState = false,
}: SummarizedTextProps) {
  const { summary, isLoading } = useSummarize({
    text,
    maxLength,
    enabled: true,
  });

  if (isLoading && showLoadingState) {
    return <span className={className}>Loading...</span>;
  }

  return <span className={className}>{summary || text}</span>;
}
