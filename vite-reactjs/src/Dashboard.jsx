import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'

const spotifyApi = new SpotifyWebApi({
  clientId: "afbb629dd81d4958a65177e6bd0b69c3"
})

const Dashboard = ({ code }) => {
  
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [playingTrack, setPlayingTrack] = useState()


  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResult([])
    if (!accessToken) return
    let wait = false

    spotifyApi.searchTracks(search).then(res => {

      if (wait) return
      setSearchResult(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => wait = true
  }, [search, accessToken])

  const chooseTrack = (track) => {
    setPlayingTrack(track)
    setSearch('')
  }

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control type='search'
        placeholder='Search Songs/Artists' value={search} onChange={e => setSearch(e.target.value)} />
      
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResult.map(track => (
          <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
        ))}
      </div>
      <div>
        <Player token={accessToken} trackUri={playingTrack?.uri}/>
      </div>
    </Container>
  )
}

export default Dashboard