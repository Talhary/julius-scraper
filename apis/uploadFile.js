import { token } from "../config.js";

fetch("https://api.julius.ai/files/signed_url", {
    "headers": {
  
      "authorization": "Bearer "+token,
      "content-type": "application/json",
      "cypress-test-id": "b14065b7",
      "ga-client-id": "2092621048.1734420801",
      "gcs": "true",
      "interactive-charts": "true",
   
    },
    "body": "{\"filename\":\"unnamed.jpg\",\"mimeType\":\"image/jpeg\"}",
    "method": "POST"
  }).then(res=>res.json()).then(console.log)