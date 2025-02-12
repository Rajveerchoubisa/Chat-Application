import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading,setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();


  const handleClick = () => setShow(!show);

  const SubmitHandler = async() => {
      setLoading(true);
      if(!email || !password){
        toast({
          title: "Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post("/api/user/login", {
          email,
          password
        },
      config 
    );
        

        toast({
          title: "Login successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history("/chats");

      } catch (error) {
        console.error("Login Error:", error.response ? error.response.data : error);
        toast({
          title: error.response?.data?.message || "Error Occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={SubmitHandler}
        isLoading = {loading}
      >
        Login
      </Button>

      <Button
        variant={"solid"}
        colorScheme="orange"
        width={"100%"}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("1234567");
        }}
      >Get Guest User Credentials</Button>
    </VStack>
  );
};

export default Login;
