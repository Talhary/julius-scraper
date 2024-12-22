import { token } from "../config.js";

export const message = async (conversationId,content)=>{
    if(!conversationId || !content) return {err:true, msg:'please provide all details'}
    try {
        const res = await fetch("https://api.julius.ai/api/chat/message", {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
              "authorization": "Bearer "+token,
              "content-type": "application/json",
              "conversation-id": conversationId,
              "cypress-test-id": "b14065b7",
              "ga-client-id": "2092621048.1734420801",
              "gcs": "true",
              "interactive-charts": "true",
              "is-demo": "null",
              "is-native": "false",
              "platform": "web",
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
                message: { content },
                provider: 'default',
                chat_mode: 'auto',
                client_version: '20240130',
                theme: 'dark',
                new_images: [],
                new_attachments: {},
                dataframe_format: 'json',
                selectedModels: null
              }) ,
            "method": "POST"
          });
          return await res.json();
    } catch (error) {
        console.error(error);
        return {err:true, msg:error?.message || "failed to chat"}
    }
}
// console.log(JSON.parse("{\"message\":{\"content\":\"hi\"},\"provider\":\"default\",\"chat_mode\":\"auto\",\"client_version\":\"20240130\",\"theme\":\"dark\",\"new_images\":[],\"new_attachments\":{},\"dataframe_format\":\"json\",\"selectedModels\":null}"))