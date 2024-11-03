const API_URL = '/api/chat';  // Explicitly set to backend port

export async function generateAIResponse(userInput: string): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from server');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}
