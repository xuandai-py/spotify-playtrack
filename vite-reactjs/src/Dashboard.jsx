import React from 'react'
import { useState, useEffect } from 'react'

import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import { Box, Container, Flex, FormControl, Input, Spacer, Text } from '@chakra-ui/react'
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
      setSearchResult(res.body.tracks.items.map(item => {
        const aritistAlbumImage = item.album.images.reduce(
          (smallest, image) => {
            if (smallest.height > image.height) return image;
            return smallest
          }, item.album.images[0])

        return {
          artist: item.artists[0].name,
          title: item.name,
          uri: item.uri,
          albumUrl: aritistAlbumImage.url

        }
      })
      )
      // if (wait) return
      // setSearchResult(
      //   res.body.tracks.items.map(track => {
      //     const smallestAlbumImage = track.album.images.reduce(
      //       (smallest, image) => {
      //         if (image.height < smallest.height) return image
      //         return smallest
      //       },
      //       track.album.images[0]
      //     )

      //     return {
      //       artist: track.artists[0].name,
      //       title: track.name,
      //       uri: track.uri,
      //       albumUrl: smallestAlbumImage.url,
      //     }
      //   })
      // )
    })

    //return () => wait = true
  }, [search, accessToken])

  const playTrack = (track) => {
    setPlayingTrack(track)
    setSearch('')
  }

  const dump = [
    {
      a: 'michel'
    },
    {
      a: 'migel'
    }
  ]

  console.log('Dashboard: ', accessToken);
  return (
    <Container maxW='container.sm' h='100vh' p='5' color='#262626' border='1px solid red'>
      <FormControl>
        <Input
          type='search'
          placeholder='Search songs/albums/artists'
          value={search}
          onChange={e => setSearch(e.target.value)} />

      </FormControl>
      <Flex flexDirection='column' marginTop='2' h='90%'  >

        <Box flexGrow='1' overflowY='auto' >
          {searchResult && searchResult.length > 0 && searchResult.map(track => (
            <TrackSearchResult track={track} key={track.uri} />
          ))
          }
        </Box>

        <Box >
          {accessToken &&
            <Player accessToken={accessToken} trackUri={playingTrack} />
          }
        </Box>
      </Flex>
    </Container>
  )
}

export default Dashboard
// rgb(24, 24, 24)
// rgb(29, 185, 84)
//rgb(255, 255, 255)
//rgb(4, 3, 6)