export const CreateChat = async () => {
    try {
      const res = await fetch("https://api.julius.ai/api/chat/start", {
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
          authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJoM0dwdVZXd2JMMTJpYnBtamlxWCJ9.eyJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vdXNlcl9lbWFpbCI6InRhbGhhcmlhejc4M0BnbWFpbC5jb20iLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vdXNlcl9pcCI6IjE4Mi4xOTEuMTM5LjExOSIsImh0dHBzOi8vY2hhdHdpdGh5b3VyZGF0YS5pby91c2VyX2NvdW50cnlDb2RlIjoiUEsiLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vdXNlcl9jb250aW5lbnRDb2RlIjoiQVMiLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vZW1haWxfdmVyaWZpZWQiOnRydWUsImh0dHBzOi8vY2hhdHdpdGh5b3VyZGF0YS5pby9zdWJzY3JpcHRpb25fc3RhdHVzIjoiYWN0aXZlIiwiaHR0cHM6Ly9jaGF0d2l0aHlvdXJkYXRhLmlvL3Byb2R1Y3QiOiJwcm9kX083UXV1N2VKVnpxcTVOIiwiaHR0cHM6Ly9jaGF0d2l0aHlvdXJkYXRhLmlvL2NyZWF0ZWRfYXQiOiIyMDI0LTEyLTEzVDEwOjE1OjIzLjc4MloiLCJpc3MiOiJodHRwczovL2F1dGguanVsaXVzLmFpLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTAwNjIzNzM5MTQ4NDM3NjA3Mjc3IiwiYXVkIjpbImh0dHBzOi8vY2hhdHdpdGh5b3VyZGF0YS5pbyIsImh0dHBzOi8vY2hhdHdpdGh5b3VyZGF0YS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzM0NDI4OTU5LCJleHAiOjE3MzcwMjA5NTksInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MiLCJhenAiOiJRWFRzV0RsdHlUSTFWclJIT1FSUmZUdEcxY2Y0WURLOCJ9.UngBz_PkE9xBS44rx-CNA6TAVpQz_SaW3m4iu6vGxBDDowxE2kwUZJalo-MRecdc6I6ybLHnKBTlzWMnbbfxZqagGbG3oDJ_D3rC84NtR1mReY5wdUPleI9fGAE7j9yob-L0KaAdn_ywWhnlTDTPevp7Ht2opVwqTmBr79d8bFwunwrsmpQwpa0dE5GBbT4xaBhNB2qEhsmn56VNVAeajuvZuLONclMRHd6sUFCsUL_22Fv4twpSp5qyQY5voGZr9aur6B8zs-p-2zbA8c818Xe54ILCZuSmy7IJUSOZStYgAkNQxBRx9q0pvETQ6UOawCCZ9-BhoaN5r-_I0CDW3A",
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
  