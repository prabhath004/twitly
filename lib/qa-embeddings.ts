/**
 * QA Embeddings Handler
 *
 * Handles generating and storing embeddings for brand Q&A responses
 * Used for RAG (Retrieval Augmented Generation) to retrieve relevant brand context
 */

import { createSupabaseAdminClient } from "./supabase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

interface EmbeddingSource {
  type: "brand_summary" | "brand_voice" | "qa_pair" | "insights" | "values";
  content: string;
  title?: string;
}

interface QAEmbeddingInput {
  brandAgentId: string;
  userId: string;
  qaResponseId: string;
  brandSummary?: string;
  brandVoice?: string;
  keyInsights?: string;
  coreValuesMission?: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Generate embedding for a text using OpenAI's text-embedding-3-small
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });

    if (response.data && response.data.length > 0) {
      return response.data[0].embedding;
    }

    throw new Error("No embedding returned from OpenAI");
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

/**
 * Generate and store embeddings for all brand Q&A responses
 * This is called when the user completes onboarding and submits Q&A responses
 */
export async function storeBrandQAEmbeddings(
  input: QAEmbeddingInput
): Promise<string[]> {
  const supabase = createSupabaseAdminClient();
  const storedEmbeddingIds: string[] = [];

  try {
    const sources: EmbeddingSource[] = [];

    // Create source objects from all the Q&A data
    if (input.brandSummary) {
      sources.push({
        type: "brand_summary",
        content: input.brandSummary,
        title: "Brand Summary",
      });
    }

    if (input.brandVoice) {
      sources.push({
        type: "brand_voice",
        content: input.brandVoice,
        title: "Brand Voice & Tone",
      });
    }

    if (input.keyInsights) {
      sources.push({
        type: "insights",
        content: input.keyInsights,
        title: "Key Insights",
      });
    }

    if (input.coreValuesMission) {
      sources.push({
        type: "values",
        content: input.coreValuesMission,
        title: "Core Values & Mission",
      });
    }

    // Add Q&A pairs as sources
    input.questions.forEach((qa, index) => {
      sources.push({
        type: "qa_pair",
        content: `Q: ${qa.question}\nA: ${qa.answer}`,
        title: `Q&A Pair ${index + 1}`,
      });
    });

    // Generate embeddings for each source
    for (const source of sources) {
      try {
        console.log(`Generating embedding for: ${source.title}`);

        const embedding = await generateEmbedding(source.content);

        // Store in brand_embeddings table
        const { data, error } = await (supabase as any)
          .from("brand_embeddings")
          .insert({
            brand_agent_id: input.brandAgentId,
            user_id: input.userId,
            qa_response_id: input.qaResponseId,
            source_type: source.type,
            source_content: source.content,
            source_title: source.title,
            embedding: embedding,
            embedding_model: "text-embedding-3-small",
            tokens_used: Math.ceil(source.content.length / 4), // Rough estimate
          })
          .select("id");

        if (error) {
          console.error(`Error storing embedding for ${source.title}:`, error);
          throw error;
        }

        if (data && data.length > 0) {
          storedEmbeddingIds.push((data as any)[0].id);
          console.log(`Stored embedding: ${(data as any)[0].id}`);
        }
      } catch (error) {
        console.error(`Failed to process source "${source.title}":`, error);
        // Continue with other sources instead of failing completely
      }
    }

    return storedEmbeddingIds;
  } catch (error) {
    console.error("Error storing brand Q&A embeddings:", error);
    throw error;
  }
}

/**
 * Search for relevant embeddings using vector similarity
 * This is used during tweet generation to retrieve relevant brand context
 */
export async function searchRelevantEmbeddings(
  brandAgentId: string,
  queryText: string,
  limit: number = 5,
  similarityThreshold: number = 0.5
): Promise<
  Array<{
    id: string;
    sourceType: string;
    sourceContent: string;
    sourceTitle: string;
    similarityScore: number;
  }>
> {
  const supabase = createSupabaseAdminClient();

  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(queryText);

    // Search using the stored search function
    const { data, error } = await (supabase as any).rpc("search_brand_embeddings", {
      p_brand_agent_id: brandAgentId,
      p_query_embedding: queryEmbedding,
      p_limit: limit,
      p_threshold: similarityThreshold,
    });

    if (error) {
      console.error("Error searching embeddings:", error);
      throw error;
    }

    // Transform the response
    return (
      data?.map(
        (item: {
          id: string;
          source_type: string;
          source_content: string;
          source_title: string;
          similarity_score: number;
        }) => ({
          id: item.id,
          sourceType: item.source_type,
          sourceContent: item.source_content,
          sourceTitle: item.source_title,
          similarityScore: item.similarity_score,
        })
      ) || []
    );
  } catch (error) {
    console.error("Error searching relevant embeddings:", error);
    throw error;
  }
}

/**
 * Update project embeddings when project information changes
 */
export async function updateProjectEmbeddings(
  brandAgentId: string,
  userId: string,
  updateTitle: string,
  updateContent: string,
  category: string = "general",
  priority: number = 5
): Promise<string> {
  const supabase = createSupabaseAdminClient();

  try {
    // Generate embedding for the update
    const embedding = await generateEmbedding(updateContent);

    // Store in project_updates table
    const { data, error } = await (supabase as any)
      .from("project_updates")
      .insert({
        brand_agent_id: brandAgentId,
        user_id: userId,
        update_title: updateTitle,
        update_content: updateContent,
        update_category: category,
        update_embedding: embedding,
        priority: priority,
        is_published: true,
        published_at: new Date().toISOString(),
      })
      .select("id");

    if (error) {
      console.error("Error updating project embeddings:", error);
      throw error;
    }

    if (data && data.length > 0) {
      return (data as any)[0].id;
    }

    throw new Error("Failed to store project update");
  } catch (error) {
    console.error("Error updating project embeddings:", error);
    throw error;
  }
}

/**
 * Get latest project updates for a brand agent
 */
export async function getLatestProjectUpdates(
  brandAgentId: string,
  limit: number = 10
): Promise<
  Array<{
    id: string;
    updateTitle: string;
    updateContent: string;
    updateCategory: string;
    priority: number;
    publishedAt: string;
  }>
> {
  const supabase = createSupabaseAdminClient();

  try {
    const { data, error } = await supabase
      .from("project_updates")
      .select("id, update_title, update_content, update_category, priority, published_at")
      .eq("brand_agent_id", brandAgentId)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching project updates:", error);
      throw error;
    }

    return (
      data?.map(
        (item: {
          id: string;
          update_title: string;
          update_content: string;
          update_category: string;
          priority: number;
          published_at: string;
        }) => ({
          id: item.id,
          updateTitle: item.update_title,
          updateContent: item.update_content,
          updateCategory: item.update_category,
          priority: item.priority,
          publishedAt: item.published_at,
        })
      ) || []
    );
  } catch (error) {
    console.error("Error getting project updates:", error);
    throw error;
  }
}
