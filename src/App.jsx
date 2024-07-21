import { useState } from "react";
import { Button, Box, Text, Image } from "@chakra-ui/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box textAlign="center" fontSize="xl">
      <Text>Hello world</Text>
      <Button colorScheme="teal" onClick={() => setCount(count + 1)} mt={4}>
        Count is {count}
      </Button>
    </Box>
  );
}

export default App;
