import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

import Joi from 'joi';
import Schema from './Schemas';
/* async function addSongRequest(songName: string, albumName: string, artistName:string, notes: string): Promise<any> {
    const args = "INSERT INTO songs (song_title, artist, album, notes) VALUES (" +
    songName + "," +
    albumName + "," +
    artistName + "," +
    notes + ")";
  
    console.log('add songs message');
  
    return { args };
  }  */   

  async function onMessage(songInfo:string[]): Promise<any> {
    //const songs = await DB.insertSong('get_songs');
    console.log('add songs message');
    const songs = await DB.insertSong( songInfo );
    
  
    return { songs };
  }

  
/*
  const schema = (Joi.object({
    0: Joi.string().required(),
    1: Joi.string(),
    2: Joi.string(),
    3: Joi.string().pattern(new RegExp('[A-G](?=\d)(?:\s|^.)/g')),
    array.match(new RegExp('[A-G](?=\d)(?:\s|^.)/g')).join
    array.match(new RegExp('[A-G](?=\d)/g')).join('')
  }));
*/
  const schema = {};
  export const AddSongHandler = new MessageHandler(
    'add_song',
    schema,
    onMessage,
  );