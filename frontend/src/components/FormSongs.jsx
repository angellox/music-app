import { useState } from 'react';
import useSongs from '../hooks/useSongs';
import Alert from './Alert';

// Component for uploading songs
const FormSongs = () => {

    const [songFile, setSongFile] = useState();
    const [nameSong, setNameSong] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState({});

    const { addSong } = useSongs();

    const handleSubmit = e => {
        e.preventDefault();

        if([nameSong, description].includes('') || !songFile) {
            setAlert({
                msg: 'File song, song name and description name are required',
                error: true
            });
            return; 
        }

        // Adding a song to DB
        addSong({ songFile, nameSong, description });

        setAlert({
            msg: 'Song uploaded correctly!',
            error: false
        });

        setSongFile();
        setNameSong('')
        setDescription('');
    };

    return (
        <>
            <Alert alert={alert} />
            <form className="border-b-2 border-dotted" onSubmit={handleSubmit}>
                <div className="flex lg:justify-around lg:flex-row flex-col gap-6 lg:items-center mb-5">
                    <div>
                        <input
                            className="file:mr-4 file:px-4 file:py-2 file:rounded-full file:border-0 file:bg-cream-500 file:text-white hover:file:bg-cream-700 file:transition-all file:cursor-pointer"
                            type="file"
                            accept="audio/mpeg"
                            onChange={ e => setSongFile(e.target.files[0]) }
                        />
                    </div>

                    <div>
                        <input
                            className="border-b-2 w-full outline-none hover:border-cream-600 transition-all focus:border-cream-600"
                            placeholder="Add song's name"
                            type="text"
                            value={nameSong}
                            onChange={ e => setNameSong(e.target.value) }
                        />
                    </div>

                    <div>
                        <input
                            className="border-b-2 w-full outline-none hover:border-cream-600 transition-all focus:border-cream-600"
                            placeholder="Add song's brief description"
                            type="text"
                            value={description}
                            onChange={ e => setDescription(e.target.value) }
                        />
                    </div>

                    <input 
                        className="bg-cream-500 text-white p-2 px-8 rounded-md hover:bg-cream-700 transition-all hover:cursor-pointer float-right"
                        type="submit"
                        value="Upload song" 
                    />
                </div>

            </form>
        </>
    )
}

export default FormSongs;