import { generateAIResponse } from './openai';

export async function generateChatResponse(input: string): Promise<string> {

  // For all other queries, use AI response
  return generateAIResponse(input);
}
