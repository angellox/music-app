import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/axios';

const SongsContext = createContext();

export const SongsProvider = ({ children }) => {

    const [songs, setSongs] = useState([]);
    const token = localStorage.getItem('MS_token_session');

    useEffect(() => {
        const token = localStorage.getItem('MS_token_session');
        
        const getSongsByArtist = async () => {
            
            try {
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/songs', config);
                setSongs(data);

            } catch (error) {
                console.log(error.response.data.msg);
            }
        };

        getSongsByArtist();

    }, []);

    const addSong = async (song) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        // Editing song
        if (song.id) {

            try {
                const { id, nameSong, description } = song;
                const { data } = await clientAxios.put(`/songs/${id}`, { nameSong, description }, config);  
                
                const songsUpdated = songs.map( songUpdated => songUpdated._id === data._id ? data : songUpdated);
                setSongs(songsUpdated);
            } catch (error) {
                console.log(error.response.data.msg);
            }

        // Adding new song
        } else {

            try {
                const formData = new FormData();
                const { songFile, nameSong, description } = song;

                formData.append('song', songFile);
                formData.append('nameSong', nameSong);
                formData.append('description', description);

                const { data } = await clientAxios.post('/songs', formData, config);
                const { createdAt, updatedAt, __v, ...storagedSong } = data;
                setSongs([storagedSong, ...songs]);
            } catch (error) {
                console.log(error.response.data.msg);
            }

        }

    };

    const setDeleteSong = async id => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clientAxios.delete(`/songs/${id}`, config);

            const songsUpdated = songs.filter( songUpdated => songUpdated._id !== id );
            setSongs(songsUpdated);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    };

    return (
        <SongsContext.Provider
            value={{
                songs,
                addSong,
                setDeleteSong
            }}
        >
            {children}
        </SongsContext.Provider>
    )
};

export default SongsContext;