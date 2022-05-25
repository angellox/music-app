import useSongs from '../hooks/useSongs';

const Song = ({ song, setSongToEdit, setModal }) => {

    const { _id, nameSong, description,  } = song;

    const { setDeleteSong } = useSongs();
    
    const handleEditSongs = () => {
        setSongToEdit(song);
        setModal(true);
    };

    const handleDeleteSongs = () => {

        const confirming = confirm('Do you really delete this song?');
        if(confirming) setDeleteSong(_id);
        
    };

    return (
        <tr className="border-b-2 border-cream-500 border-dotted">
            <td>{ _id.substring(15) }</td>

            <td>{nameSong}</td>

            <td className='w-1/2'>{description}</td>

            <td className='flex gap-4'>
                {/* Editing songs */}
                <button
                    onClick={handleEditSongs}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit hover:stroke-cream-700 transition-all" width="35" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                </button>
                {/* Deleting songs */}
                <button
                    onClick={handleDeleteSongs}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash hover:stroke-cream-700 transition-all" width="35" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default Song;