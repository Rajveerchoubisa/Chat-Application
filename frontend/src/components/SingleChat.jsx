import React from "react";
import { ChatState } from "../Context/ChatProvider.jsx";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender,getSenderFull } from "../config/ChatLogics.jsx";
import ProfileModal from "./miscellaneous/ProfileModal.jsx";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      {selectedChat ? (
        <>
        <Text
        fontSize={{base: "28px",md:"30px"}}
        pb={3}
        px={2}
        w={"100%"}
        display={"flex"}
        justifyContent={{base:"space-between"}}
        alignItems={"center"}
        >
                   <IconButton display={{base: "flex",md:"none"}}
                   icon={<ArrowBackIcon />}
                   onClick={() => setSelectedChat("")}
                   /> 
                   {!selectedChat.isGroupChat ? (
                    <>
                    {getSender(user,selectedChat.users)}
                    <ProfileModal user= {getSenderFull(user,selectedChat.users)} />
                    </>
                   ) : (
                    <>
                    {selectedChat.chatName.toUpperCase()}
                    {/* <UpdatedGroupChatModal
                    fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}
                    /> */}
                    </>
                   )}
        </Text>
        <Box display={"flex"}
        flexDir={"column"}
        justifyContent={"flex-end"}
        p={3}
        bg={"#E8E8E8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
        >
                    {/* Message herer */}

        </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3}>
            Get started Chatting by clicking on user
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
