import { createBrowserRouter } from "react-router-dom";
import CustomForm from "../common/CustomForm";
import App from "../App";
// import {  } from "../";
const router = createBrowserRouter([
    {
        path:"/",
        Component:App,
        // children:[
        //     {
        //         path:"/form",
        //         Component:CustomForm
        //     },
        // ]
    }
    // ,{
        
    //     path:"/client-form",
    //     Component:CustomForm
    // }
])



export default router