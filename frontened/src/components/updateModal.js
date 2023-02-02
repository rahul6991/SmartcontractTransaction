import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useWeb3Context } from "../context/contractContext";

export default function UpdateModal({ message, handleModal }) {
    const [data, setData] = useState(message._str);
    const [error, setError] = useState();

    const handleClose = () => handleModal(null);
    const handleChange = (e) => {
        setData(e.target.value)
    }
    const { updateTransaction } = useWeb3Context()
    const callback = (res) => {
        if (res) {
            handleClose()

        } else {
            setError('ERROR WERROR ERROR');
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }
    const submit = () => {
        updateTransaction(data, callback)
    }

    return (
        <Dialog open={!!message} onClose={handleClose}>
            <DialogTitle id="modal-modal-title" variant="h6" component="h2">
                Write data on Chain
            </DialogTitle>
            <Typography color={'red'} align={'center'}>{error}</Typography>
            <Divider light />
            <DialogContent sx={{ width: 500 }}>
                <Box mt={4}>
                    <Typography mt={4} variant="h8" gutterBottom>
                        Sender: {message.sender}
                    </Typography>
                </Box>
                <Box mt={4}>
                    <Typography mt={4} variant="h8" gutterBottom>
                        Date:{message._str}
                    </Typography>
                </Box>
                <Box mt={4}>
                    <Typography mt={4} variant="h8" gutterBottom>
                        Block number: {message.block_number}
                    </Typography>
                </Box>
                <Box mt={4}
                >
                    <TextField id="outlined-basic" label="data" variant="outlined" fullWidth onChange={handleChange} value={data} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submit}>Subscribe</Button>
            </DialogActions>
        </Dialog>

    )

}


