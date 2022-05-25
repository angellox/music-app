import { useState } from 'react';
import useSongs from '../hooks/useSongs';
// Internal componentes
import Song from './Song';
import Modal from './Modal';
import Alert from './Alert';

const ListSongs = () => {

    // Getting all songs from DB
    const { songs } = useSongs();
    // Setting modal with song to edit
    const [modal, setModal] = useState(false);
    const [songToEdit, setSongToEdit] = useState({});
    const [alert, setAlert] = useState({});
    
    return (
        <>
            <Alert alert={alert} />

            {songs.length ? (
                <div className='overflow-x-auto'>
                    <table className='table-auto text-left mt-8 lg:w-full w-max'>
                        <thead className='uppercase text-lg text-gray-800'>
                            <tr>
                                <th>Track ID</th>
                                <th>Track's name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody className='font-light'>
                            { 
                                songs.map( song => (
                                    <Song 
                                        key={song._id}
                                        song={song}
                                        setSongToEdit={setSongToEdit}
                                        setModal={setModal}
                                    />
                                )) 
                            }
                        </tbody>

                    </table>
                </div>
            ) : (
                <>
                    <h2 className='text-center text-xl mt-4 text-gray-600'>Ups! You do not have songs yet. Begin <span className='text-cream-700'>uploading</span> one!</h2>
                </>
            )}

            {modal && <Modal setModal={setModal} songToEdit={songToEdit} setAlert={setAlert} />} 

        </>
    )
}

export default ListSongs;