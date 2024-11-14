import { app } from "./app.js";
import {connectdb} from "../db/index.js";

connectdb()
.then(()=>{
    app.listen(3000, () => console.log("Server ready on port 3000."));
    console.log('server connected to database')
})
.catch((err)=>{
    console.log(err)
})


