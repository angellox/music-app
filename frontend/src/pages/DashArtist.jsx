import useAuth from '../hooks/useAuth';
// Import components
import FormUpdate from '../components/FormUpdate';
import FormSongs from '../components/FormSongs';
import ListSongs from '../components/ListSongs';

const DashArtist = () => {

  const { auth } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-between md:flex-row w-full md:w-3/4 gap-8">
        <div className="bg-white rounded-lg p-6 md:w-4/6 shadow-md">
          <div className="flex gap-6 items-center mb-10">
            <div className="bg-no-repeat bg-center bg-cover h-20 w-20 rounded-full" style={{ backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL + "/" + auth.photo})` }}></div>
            <div className=" text-gray-800 text-2xl">
              <h2>Welcome, {auth.name}!</h2>
              <p className="text-sm text-gray-400">Edit your profile here</p>
            </div>
          </div>

          <div>
            <FormUpdate auth={auth} />
          </div>
        </div>

        <div className="bg-white rounded-lg p-10 shadow-md lg:w-1/4 flex flex-col justify-center items-center">
          <div className=" text-gray-800 text-2xl mb-4">
            <h2>Statistics</h2>
            <p className="text-sm text-gray-400 font-normal">View how your tracks going</p>
          </div>

          <div className="">
            <div className="grid grid-cols-2 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-track-next" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 5v14l8 -7z" />
                <path d="M14 5v14l8 -7z" />
              </svg>

              <div>
                <p className="text-xl">1,543,241</p>
                <p className="text-sm text-gray-400">Total plays</p>
              </div>
            </div>

            <div className="grid grid-cols-2 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>

              <div>
                <p className="text-xl">2,555</p>
                <p className="text-sm text-gray-400">Total likes</p>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-playlist" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="14" cy="17" r="3" />
                <path d="M17 17v-13h4" />
                <path d="M13 5h-10" />
                <line x1="3" y1="9" x2="13" y2="9" />
                <path d="M9 13h-6" />
              </svg>

              <div>
                <p className="text-xl">543</p>
                <p className="text-sm text-gray-400">Total tracks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 w-full md:w-3/4 shadow-md">
          <div className=" text-gray-800 text-2xl">
            <h2>Upload tracks</h2>
            <p className="text-sm text-gray-400 mb-5">Upload your tracks here (Formats supported: .mp3 only)</p>
          </div>

          <FormSongs />
          <ListSongs />
      </div>

    </div>
  )
}

export default DashArtist;