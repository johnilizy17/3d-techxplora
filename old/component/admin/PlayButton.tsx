import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./Play.json";
import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";

const PlayButton = () => {

    const router = useRouter();
    return (
        <Center
        onClick={()=>router.push("/how")} position={"fixed"} bottom={"0px"} right="10px">
            <Lottie style={{height:150, width:150}} animationData={groovyWalkAnimation} loop={true} />
        </Center>
        )
};

export default PlayButton;