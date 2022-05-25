import { useEffect, useState } from 'react';
// Import internal components
import Genres from './Genres';
import Alert from './Alert';

const FormUpdate = ({ auth, editProfile }) => {

    const [name, setName] = useState(auth.name);
    const [email, setEmail] = useState(auth.email);
    const [genre, setGenre] = useState(auth.genre);
    const [isDisabled, setIsDisabled] = useState(true);

    const [alert, setAlert] = useState({});
    const user = { id: auth._id, name, email, genre };

    const handleSubmit = async e => {
        // Just to update user data
        e.preventDefault();
        
        if([name, email, genre].includes('')){
            setAlert({
                msg: 'There are empty field. Please fill correctly!',
                error: true
            });
            return;
        }

        const result = await editProfile(user);

        if(!result.error) {
            setAlert({
                msg: 'Your changes were updated successfully',
                error: false
            });
            return;
        }

        setAlert({
            msg: result.msg,
            error: true
        });
    };

    useEffect(() => {

        if(
            user.name !== auth.name || 
            user.email !== auth.email || 
            user.genre !== auth.genre
        ){
            setIsDisabled(false);
            return;
        }

        setIsDisabled(true);
        
    }, [user]);

    return (
        <>
            <Alert alert={alert} />

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className="border-b-2 w-full outline-none hover:border-cream-600 transition-all focus:border-cream-600"
                        type="text"
                        placeholder={auth.name}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="flex gap-10 mt-8 ">
                    <div className="w-1/2">
                        <input
                            className="border-b-2 w-full outline-none hover:border-cream-600 transition-all focus:border-cream-600"
                            type="email"
                            placeholder={auth.email}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-1/2">
                        <select
                            className='p-0 border-b-2 w-full outline-none hover:border-cream-600 transition-all focus:border-cream-600 align-sub'
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        >
                            <Genres />
                        </select>
                    </div>
                </div>

                <button
                    className={isDisabled ? `bg-cream-500 text-white p-2 px-4 rounded-md hover:bg-cream-700 transition-all mt-10 float-right hover:cursor-not-allowed` : `bg-cream-500 text-white p-2 px-4 rounded-md hover:bg-cream-700 transition-all mt-10 float-right hover:cursor-pointer` }
                    type="submit"
                    disabled={isDisabled}
                >
                    Save changes
                </button>
            </form>
        </>

    )
}

export default FormUpdate;