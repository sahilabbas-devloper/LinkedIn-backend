 import rateLimit from "express-rate-limit"

 const likeLimiter = rateLimit({
    windowMs: 60* 1000,
    max: 10 ,
    message: {message: "cool down few seconds.."}
 })

 export default likeLimiter