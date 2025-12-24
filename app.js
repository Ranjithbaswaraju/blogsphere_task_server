const express=require('express')
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const {connectDB}=require("./confige/db.js")
const authRoutes=require("./routes/authRoutes.js")
const postRoutes=require("./routes/postRoutes.js")
const userRoutes=require("./routes/userRoutes.js")
const commentRoutes=require("./routes/commentRoutes.js")
const likeRouter=require("./routes/likeRoutes.js")
const cors=require('cors')
app.use(express.json())
app.use(express.urlencoded())
connectDB()


app.use(
    cors({
        origin: ["https://blogsphere-task-client.vercel.app","http://localhost:5173"]
    })
)

app.use("/auth",authRoutes)
app.use("/post",postRoutes)
app.use("/comment",commentRoutes)
app.use("/likePost",likeRouter)
app.use("/",userRoutes)


app.listen(process.env.port,()=>{
    console.log(`server running at ${process.env.port}`)
})