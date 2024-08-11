import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  deleteDoc, // Import deleteDoc
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  Box,
  Container,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  Heading,
} from "@chakra-ui/react";

import { IdentityCard } from "../../elements/IdentityCard";
import { database } from "../../database/firebaseResources";

export const Dashboard = () => {
  let env_passcode = import.meta.env.VITE_SUDO_DASHBOARD;
  const loginCheck = localStorage.getItem("dashboard_code") === env_passcode;

  const [tickets, setTickets] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(loginCheck);

  useEffect(() => {
    if (!loginCheck || !isLoggedIn) return;

    const ticketsCollectionRef = query(
      collection(database, "tickets"),
      where("isComplete", "==", false),
      orderBy("createdAt", "desc")
    );

    const unsubscribeTickets = onSnapshot(ticketsCollectionRef, (snapshot) => {
      const updatedTickets = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate().toLocaleString(),
      }));
      setTickets(updatedTickets);
    });

    const tokensCollectionRef = collection(database, "tokens");
    const fetchTokens = async () => {
      const tokenDocs = await getDocs(tokensCollectionRef);
      const tokenList = tokenDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTokens(tokenList);
    };

    fetchTokens();

    return () => unsubscribeTickets();
  }, [isLoggedIn]);

  const toggleComplete = async (ticket) => {
    const ticketDocRef = doc(database, "tickets", ticket.id);
    await updateDoc(ticketDocRef, {
      isComplete: !ticket.isComplete,
    });
  };

  const deleteToken = async (tokenId) => {
    const tokenDocRef = doc(database, "tokens", tokenId);
    await deleteDoc(tokenDocRef);
    setTokens(tokens.filter((token) => token.id !== tokenId));
  };

  useEffect(() => {
    if (password === env_passcode) {
      localStorage.setItem("dashboard_code", env_passcode);
      setIsLoggedIn(true);
    }
  }, [password]);

  if (!isLoggedIn) {
    return (
      <Container mt={3} maxW="600px">
        <Heading as="h3">Zero Knowledge Passcode</Heading>
        <FormControl id="password" mt={3}>
          <FormLabel>Enter password</FormLabel>
          <Input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </Container>
    );
  }

  return (
    <Container mt={3} maxW="95%">
      <Heading as="h1">Requests</Heading>
      <Stack spacing={3} mt={3}>
        {tickets.map((ticket) => (
          <Box
            key={ticket.id}
            bg={ticket.isComplete ? "green.500" : "gray.100"}
            color={ticket.isComplete ? "white" : "black"}
            p={4}
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontWeight="bold">Contact: {ticket.contact}</Text>
            <Text mt={2}>{ticket.message}</Text>
            <Checkbox
              mt={3}
              isChecked={ticket.isComplete}
              onChange={() => toggleComplete(ticket)}
            >
              Complete?
            </Checkbox>
            <Text mt={2} fontSize="sm">
              Submitted on: {ticket.createdAt}
            </Text>
          </Box>
        ))}
      </Stack>

      <Heading as="h1" mt={6}>
        Tokens
      </Heading>
      <Stack spacing={3} mt={3}>
        {tokens.map((token) => (
          <Box key={token.id} p={4} borderRadius="md" boxShadow="md">
            <IdentityCard
              theme="cashu"
              number={token.token?.substr(0, 16) + "..."}
              name={"Balance: 1 SAT"}
              realValue={token.token}
            />
            <Button
              colorScheme="red"
              onMouseDown={() => deleteToken(token.id)}
              mt={3}
            >
              Delete Token
            </Button>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};
