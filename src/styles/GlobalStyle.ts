import { createGlobalStyle, withTheme } from "styled-components";
import { ThemeProps } from "./themes";

type GlobalThemeProps = {
  theme: ThemeProps;
};

const globalStyle = createGlobalStyle`



:root {
    //night-mode
    --night-background: linear-gradient(#0d0333, #26013d, #301140);
    --night-color: white;

    //morning-mode
    --morning-background: linear-gradient(#4dc4ff, #ffcc66);
    --morning-color: black;

    //midday-mode
    --midday-background: linear-gradient(#99ccff, #66b2ff);
    --midday-color: black;

    //dusk-mode
    --dusk-background: linear-gradient(#ff9966, #9966ff);
    --dusk-color: black;

    //dawn-mode
    --dawn-background: linear-gradient(#9966ff, #ff9966);
    --dawn-color: black;
    
  }

*{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font: 'Roboto', sans-serif; 
    }
    #root{
        margin:0 auto;
        padding:0;
    }
    html,
    body {
      width: 100%;
      height: 100%;
      font-size: 14px;
    }

body  {
  min-width: 335px;
  width: 100%;
  height: 100%;
  font-family: Montserrat;
  background-color: #b9adad;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  margin: 0 auto;
  background-image: ${({ theme }: GlobalThemeProps) => theme.background};
  color:  ${({ theme }: GlobalThemeProps) => theme.color};
 
}
 `;

export default withTheme(globalStyle);
