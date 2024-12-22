import { token } from "../config.js";

export const start = async ()=>{
    try {
        const res = await fetch("https://api.julius.ai/api/chat/start", {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
              "authorization": "Bearer "+token,
              "content-type": "application/json",
              "cypress-test-id": "e5c9e3d9",
              "ga-client-id": "2092621048.1734420801",
              "gcs": "true",
              "interactive-charts": "true",
              "is-demo": "null",
              "is-native": "false",
              "pathname": "/chat",
              "priority": "u=1, i",
              "request-id": "undefined",
              "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "use-dict": "true",
              "visitor-id": "undefined",
              "Referer": "https://julius.ai/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": JSON.stringify({
                provider: 'o1',
                server_type: 'CPU',
                template_id: null,
                chat_type: null,
                tool_preferences: {
                  default_kernel: 'Python',
                  model: 'o1',
                  disable_code: true,
                  disable_search: true,
                  disable_all: true
                },
                conversation_plan: null
              }),
            "method": "POST"
          });
          return await res.json()
    } catch (error) {
        console.log(error)
        return {err:true ,msg:error?.message || error?.msg || "failed to start"}
    }
}
