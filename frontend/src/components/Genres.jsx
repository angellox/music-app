// This component can be dynamic to add some new genres in the future or remove them
const Genres = () => {

    const options = [
        { value: 'rock', label: 'Rock & Heavy Metal' },
        { value: 'electronic', label: 'Electronic' },
        { value: 'pop', label: 'Pop/Funk' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'classic', label: 'Classic' }
    ]

  return (
      options.map((genre) => <option key={genre.label} value={genre.value}>{genre.label}</option>)
  )
}

export default Genres;