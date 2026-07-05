import express from "express"
import runGraph from "./ai/graph.ai.js"
import cors from "cors"

const app = express();
app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","POST"],
    credentials : true
}))
app.use(express.json());

app.get("/",async (req,res)=>{
    const result = await runGraph("Write an code for Factorial Function in js")
    res.json(result);
});
app.post("/invoke",async (req,res)=>{
    const {input} = req.body;
    const result = await runGraph(input);
    res.status(200).json({
        message : "Graph invoked successfully",
        success : true,
        data : result
    });
})
export default app;