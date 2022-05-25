import { useEffect, useState } from 'react';
import useSongs from '../hooks/useSongs';

const Modal = ({ setModal, songToEdit, setAlert }) => {

    const [nameSong, setNameSong] = useState('');
    const [description, setDescription] = useState('');

    const { addSong } = useSongs();

    const hideModal = () => {
        setModal(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Editing song
        addSong({ id: songToEdit._id, nameSong, description});
        setModal(false);

        // Resetting values
        setNameSong('');
        setDescription('');

        setAlert({
            msg: 'Changes updated successfully!',
            error: false
        });
    };

    useEffect(() => {

        if(Object.keys(songToEdit).length > 0) {
            setNameSong(songToEdit.nameSong);
            setDescription(songToEdit.description);
        }

    }, [ songToEdit ]);

    return (
        <>
            <div className="overflow-hidden fixed z-50 inset-0 md:h-full bg-gray-700/50 transition-all">
                <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto top-1/3">
                    <div className="relative bg-white rounded-lg shadow-lg dark:bg-white">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-cream-700 dark:hover:text-white"
                            onClick={hideModal}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <div className="p-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-gray-700">Edit your song here</h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        className="border-b-2 w-full outline-none hover:border-cream-600 transition-all focus:border-cream-600"
                                        type="text"
                                        placeholder="Edit song's name here"
                                        value={nameSong}
                                        onChange={ e => setNameSong(e.target.value) }
                                    />
                                </div>
                                <div>
                                    <input
                                        className="border-b-2 w-full outline-none hover:border-cream-600 transition-all focus:border-cream-600"
                                        type="text"
                                        placeholder="Edit song's description here"
                                        value={description}
                                        onChange={ e => setDescription(e.target.value) }
                                    />
                                </div>
                                
                                <input 
                                    type="submit" 
                                    className="w-full bg-cream-500 text-white p-2 px-4 rounded-md hover:bg-cream-700 transition-all hover:cursor-pointer text-center hover:text-white" 
                                    value="Save changes" 
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;