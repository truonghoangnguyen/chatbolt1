const API_URL = '/api/chat';  // Explicitly set to backend port
// test local host
//const API_URL = "http://localhost:3000/api/chat"
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
      console.error(`Error details x: ${JSON.stringify(response.statusText)}`);
      const errorDetails = await response.text(); // Try to capture any error message from the server response
      console.error(`Error details: ${errorDetails} ${JSON.stringify(response)}`);
      throw new Error(`Failed to get response from server: ${response.status} ${response.statusText}. Details: ${errorDetails}`);
    }

    if (!response.ok) {
      throw new Error('Failed to get response from server' );
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}
