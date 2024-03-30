import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
font-size: 30px;
font-weight: 600;
background-color: yellow;
`



const StyledApp = styled.div`
  background-color: orange;
  padding: 20px;

`

const App = () => {
  return (
    <>
    <GlobalStyles/>
    <StyledApp>
      <H1>Vite Setup</H1>
      <Button>Check In</Button>
      <Button>Check Out</Button>
      <Input type="number" placeholder="Number of Guests"></Input>
    </StyledApp>
    </>
  );
};

export default App;
