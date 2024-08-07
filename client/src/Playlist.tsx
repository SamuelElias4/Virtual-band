import React, {useState, useReducer} from 'react';
import Popup from 'reactjs-popup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import {initializeSocket, send} from './Socket';



export function PlaylistPopup(){

    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [notes, setNotes] = useState('');

    const submit = (songName:string, artistName:string, albumName:string, notes:string) => {
      console.log("submit pressed");
  
  
      initializeSocket(
          async socket => {
            
            console.log("submit");
            await send(socket, 'add_song', [songName, artistName, albumName, notes]);

          },
          () => {
            console.log("done");
  
          },
        );
        setSongName('');
        setArtistName('');
        setAlbumName('');
        setNotes('');
        window.location.reload(); 
  }


    return (
        <div>
        <Popup trigger=
        {
            
            <Typography align='center'>
            <Button variant="contained">Add song</Button>
            </Typography>
            
        }
        position="right center">

        <Box sx={{
            
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white',
            borderRadius: '.2rem' ,
            padding: '.5rem',
            width: '25ch',
        }}>
        
        <TextField
          id="songName"
          label="Song"
          margin="dense"
          value={songName}
          onChange={(e) => {setSongName(e.target.value)}}
          sx={{ pt: 1.1}}
        />
        <TextField
          id="songArtist"
          label="Artist"
          margin="dense"
          value={artistName}
          onChange={(e) => {setArtistName(e.target.value)}}
          sx={{ pt: 1.1}}
        />
        <TextField
          id="albumName"
          label="Album"
          margin="dense"
          value={albumName}
          onChange={(e) => {setAlbumName(e.target.value)}}
          sx={{ pt: 1.1}}
        />
        <TextField
          id="notes"
          label="Notes"
          margin="dense"
          value={notes}
          onChange={(e) => {setNotes(e.target.value.toUpperCase())}}
          sx={{ pt: 1.1, pb: 1.1}}
          multiline
        />

        <Typography align='center'>
        <Button variant="contained" onClick={() => submit(songName, artistName, albumName, notes)}>Submit</Button>
        </Typography>
        </Box>
       


        </Popup>
        </div>
    );
}