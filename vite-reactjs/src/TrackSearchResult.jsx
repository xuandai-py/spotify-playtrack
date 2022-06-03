import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const TrackSearchResult = ({ track, playTrack }) => {

    const playTrackHandle = () => {
        playTrack(track)
    }

    return (

        <Flex alignItems='center' m='2' cursor='pointer' onClick={playTrackHandle}>
            <Image src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
            <Box marginLeft='3'>
                <Text>{track.title}</Text>
                <Text className="text-muted">{track.artist}</Text>
            </Box>
        </Flex>
    )
}

export default TrackSearchResult