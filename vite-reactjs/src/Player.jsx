import React, {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({ token, trackUri }) => {

    const [play, setPlay] = useState(false)
    useEffect(() => {
        setPlay(true)
    }, [trackUri])

    if (!token) return null

    return (
        <SpotifyPlayer
            token={token}
            showSaveIcon
            uris={trackUri ? [trackUri] : []}
            play={play}
            callback={state => {
                if(!state.isPlaying) setPlay(false)
            }}
        />
    )
}

export default Player