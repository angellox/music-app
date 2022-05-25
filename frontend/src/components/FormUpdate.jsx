import { useState } from 'react';
// Import internal components
import Genres from './Genres';
import Alert from './Alert';

const Form = ({ auth }) => {

    const [name, setName] = useState(auth.name);
    const [email, setEmail] = useState(auth.email);
    const [genre, setGenre] = useState(auth.genre);

    const [alert, setAlert] = useState({});

    const handleSubmit = (e) => {
        // Just to update user data
        e.preventDefault();

        if ( auth.name === name && auth.email === email && auth.genre === genre ) {
            setAlert({
                msg: 'All seem to be updated',
                error: true
            })
            return;
        }

        //console.log('Actualizando...');
    };

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

                <input 
                    className="bg-cream-500 text-white p-2 px-4 rounded-md hover:bg-cream-700 transition-all hover:cursor-pointer mt-10 float-right"
                    type="submit"
                    value="Save changes"
                />
            </form>
        </>

    )
}

export default Form;