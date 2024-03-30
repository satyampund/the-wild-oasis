import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";


const StyledApp = styled.div`
  background-color: orange;
  padding: 20px;
`

const App = () => {
  return (
    <>
    <GlobalStyles/>
    <StyledApp>
      <Heading as='h1'>Vite Setup</Heading>
      <Heading as='h2'>Check In and Out</Heading>
      <Button>Check In</Button>
      <Button>Check Out</Button>
      <Heading as='h3'>Form</Heading>
      <Input type="number" placeholder="Number of Guests"></Input>
    </StyledApp>
    </>
  );
};

export default App;
