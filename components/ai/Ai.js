"use client";
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { runAi } from "@/ai/ai";
import { Button, Box, Modal, TextField, CircularProgress, Typography } from '@mui/material';

// Modal inline styles with increased height and width, and scrollable content


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Increased width
  height: '80%', // Increased height
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  borderColor: " blue",
  p: 4,
  overflowY: 'auto', // Make modal content scrollable
};

export default function Page() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false); // State for controlling modal visibility

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const data = await runAi(query);
      setResponse(data);
      handleOpen(); // Open the modal once the response is received
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Stop loading after the response is fetched
    }
  };

  const copyToClipboard=()=>{

 navigator.clipboard.writeText(response)
 .then(()=>{
alert("response copied to  clipboard")

 })
 .catch((err)=>{
 console.log("could not copy text",err )

 })

  }



  return (
    <div className="container mt-5">
      {/* Form for user input */}
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <TextField
            fullWidth
            label="Write something"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}

            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'blue',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
            }}


          />
        </div>
        <Button
          type="submit"
          variant="contained"

          sx={{
            m: 1,
            p: 2,
            backgroundColor: 'blue',
            ':hover': {
              backgroundColor: 'blue',
            },
            height: '100%',
            width: "100%"
          }}
          disabled={loading} // Disable button while loading
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null} // Add loader icon to button
        >
          {loading ? 'Loading...' : 'Generate with AI'}
        </Button>
      </form>

      {/* AI Response Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            AI Response
          </Typography>
          <Box id="modal-description" sx={{ mt: 2 }}>
            {loading ? (
              <CircularProgress /> // Display a loading spinner if the response is still being generated
            ) : (
              <ReactMarkdown>{response}</ReactMarkdown> // Display the markdown response in the modal
            )}
          </Box>
          <Button
            onClick={copyToClipboard}

            color="primary"
            sx={{ mt: 2, mr: 2, backgroundColor: "blue", color: "white" }} // Margin to separate from close button
          >
            Copy to Clipboard
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}