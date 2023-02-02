import React from "react";
import { Button, Typography } from "@mui/material";

import { useWeb3Context } from "../context/contractContext";
import { Box } from "@mui/system";


function Header() {

    const { account, connectToWallet, balance } = useWeb3Context();
    return (
        <>
            <Box>
                balance: {(+balance).toFixed(5)}
            </Box>
            <Box>
                <Typography > Account {account ? account : <Button onClick={connectToWallet}>Connect to wallet</Button>}</Typography>
            </Box>
        </>
    )
}


export default Header