import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Roboto', sans-serif; 
    }
    #root{
        margin:0 auto;
        padding:0;
    }
    body{
        background-color: hsl(4%, 4%, 98%);
        width:100%
    }
 `;
