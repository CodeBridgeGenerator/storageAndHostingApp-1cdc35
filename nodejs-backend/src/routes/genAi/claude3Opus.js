const LLM_API_URL = process.env.LLM_CLASS3;
const axios = require("axios");

async function claude3sonnet(request, response) {
  // Mock response for testing (when LLM_CLASS3 is not configured)
  if (!LLM_API_URL) {
    console.warn(
      "LLM_CLASS3 environment variable not set. Using mock response for testing.",
    );
    const question = request.body?.question || "What is the meaning of life?";
    const documents = request.body?.documents || [];

    const mockResponse = {
      id: "msg_mock_" + Date.now(),
      type: "message",
      role: "assistant",
      model: "claude-3-opus-20240229-v1:0 (MOCK)",
      stop_reason: "end_turn",
      stop_sequence: null,
      input_tokens: 150,
      output_tokens: 200,
      response_text: `Mock Claude Response to: "${question}"\n\nThis is a simulated response for testing purposes since LLM_CLASS3 is not configured.\n\n${
        documents && documents.length > 0
          ? `Retrieved ${documents.length} document(s) for context:\n${documents.map((d, i) => `[${i + 1}] ${d.content?.substring(0, 100)}...`).join("\n")}\n\n`
          : "No documents were retrieved for this query.\n\n"
      }To use a real Claude API:\n1. Set LLM_CLASS3 environment variable to your Claude API endpoint\n2. Ensure your API key is configured\n3. Restart the backend`,
    };

    console.log("Mock response:", mockResponse);
    return response.status(200).json(mockResponse);
  }

  const requestOptions = {
    method: "post",
    url: LLM_API_URL,
    data: request.body,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 120000,
  };

  let responseText;
  try {
    responseText = await axios(requestOptions);
  } catch (error) {
    console.error("LLM API call failed:", error.message);
    return response.status(200).json({
      success: false,
      error: error.message,
      response_text: `Error calling LLM API: ${error.message}. Please check if LLM_CLASS3 is correctly configured.`,
    });
  }

  return response.status(200).json(responseText.data);
}

module.exports = claude3sonnet;
