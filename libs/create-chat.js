export const CreateChat = async () => {
  try {
    const res = await fetch("https://api.julius.ai/api/chat/start", {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJoM0dwdVZXd2JMMTJpYnBtamlxWCJ9.eyJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vdXNlcl9lbWFpbCI6InBrbWFpbHl0cHJlbWl1bUBnbWFpbC5jb20iLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vdXNlcl9pcCI6IjE4Mi4xOTEuMTM4Ljk1IiwiaHR0cHM6Ly9jaGF0d2l0aHlvdXJkYXRhLmlvL3VzZXJfY291bnRyeUNvZGUiOiJQSyIsImh0dHBzOi8vY2hhdHdpdGh5b3VyZGF0YS5pby91c2VyX2NvbnRpbmVudENvZGUiOiJBUyIsImh0dHBzOi8vY2hhdHdpdGh5b3VyZGF0YS5pby9lbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9jaGF0d2l0aHlvdXJkYXRhLmlvL3N1YnNjcmlwdGlvbl9zdGF0dXMiOiJhY3RpdmUiLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vcHJvZHVjdCI6InByb2RfTzdRdXU3ZUpWenFxNU4iLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vY3JlYXRlZF9hdCI6IjIwMjQtMTItMTlUMTI6NDU6MDEuNDMxWiIsImlzcyI6Imh0dHBzOi8vYXV0aC5qdWxpdXMuYWkvIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDAwMTM3Mzk5NzA0MjUyMzg4NzAiLCJhdWQiOlsiaHR0cHM6Ly9jaGF0d2l0aHlvdXJkYXRhLmlvIiwiaHR0cHM6Ly9jaGF0d2l0aHlvdXJkYXRhLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MzQ3ODQ4NTcsImV4cCI6MTczNzM3Njg1Nywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyIsImF6cCI6IlFYVHNXRGx0eVRJMVZyUkhPUVJSZlR0RzFjZjRZREs4In0.ZmFEMNnGqJwpCCm3bWpB_16W5l35xooYKCNAlVZd_d7gZSTC8yyM85bCwRH1nVnKF0DL8IvgrQ4rl1wyx0eZyj9DwdloyQpvM3iLncfiw-CBp4SrtxAMmXvI2kj5UK7im3YE-sxcdZs630HiYV-i0JONuwCi7YrhAbMkER26V8wP50nQb90ZV1tXvQxvM6cGtTIpCw5sxkKLLX-h8BjYQcj6eKRT1WunIor-rHTcdTwNaMI3Fei3b_sISWWZA6jHsTGL_u166EHCq0H8cVhkUC47NPeLz8vUhomIOsxWRd18db1YlP3I3nQC-_i-uNmWLkOMbB-BzXvFCpEoftLykQ",
        "content-type": "application/json",
        "cypress-test-id": "ef3e8fb1",
        "ga-client-id": "2092621048.1734420801",
        gcs: "true",
        "interactive-charts": "true",
        "is-demo": "null",
        "is-native": "false",
        pathname: "/chat",
        priority: "u=1, i",
        "request-id": "undefined",
        "sec-ch-ua":
          '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "use-dict": "true",
        "visitor-id": "undefined",
        Referer: "https://julius.ai/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({
        provider: "GPT-4o",
        server_type: "CPU",
        template_id: null,
        chat_type: null,
        tool_preferences: {
          default_kernel: "Python",
          model: "GPT-4o",
        },
        conversation_plan: null,
      }),
      method: "POST",
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    return { err: true, msg: error?.message || "failed to create chat" };
  }
};
