import React, { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { isSpotifyTokenValid } from 'is-spotify-token-valid';

// const Player = ({ accessToken, trackUri }) => {

//     // const [play, setPlay] = useState(false)
//     // useEffect(() => {
//     //     setPlay(true)
//     // }, [trackUri])

//     // if (!token) return null

//     // return (
//     //     <SpotifyPlayer
//     //         token={token}
//     //         showSaveIcon
//     //         uris={trackUri ? [trackUri] : []}
//     //         play={play}
//     //         callback={state => {
//     //             if(!state.isPlaying) setPlay(false)
//     //         }}
//     //     />
//     // )

//     if (!accessToken) return null

//     console.log('player: ', accessToken);
//     console.log('player track: ', trackUri);

//     return (
//         <SpotifyPlayer
//             token={accessToken}
//             uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
//         />
//     )
// }

// export default Player



export default function Player({ accessToken, trackUri }) {
    
    isSpotifyTokenValid(accessToken, proceedWithVerdict);

    function proceedWithVerdict(error, isValid) {
        if (error) {
            console.error('Error while checking token.', error);
            return;
        }

        if (isValid) {
            console.log('It is valid! Though not necessarily for all scopes.');
        } else {
            console.log('It is invalid.');
        }
    }
    if (!accessToken) return null
    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            uris={trackUri ? [trackUri] : []}
        />
    )
}