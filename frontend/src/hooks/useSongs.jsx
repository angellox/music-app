import { useContext } from 'react';
import SongsContext from '../context/SongsProvider';

const useSongs = () => {
    return useContext(SongsContext);
};

export default useSongs;