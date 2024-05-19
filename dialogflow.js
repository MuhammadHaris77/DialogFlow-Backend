const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion, Card } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
  
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add(`Hi i am pizza bot Ai Assistant   how can help you ?? ` )
    }
    function fallBack(agent) {
        console.log(`intent  =>  hi`);
        agent.add("fallback from server side?")
    }

    function order(agent) {
        console.log(`intent  =>  hi`);
        agent.add("ok sir your is done")
    }

    let intentMap = new Map();
    intentMap.set('Default Fallback Intent', fallBack); 
    intentMap.set('Welcome', hi); 
    intentMap.set('order', order); 
  
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});