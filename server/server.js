const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
const bodyParser = require('body-parser');
const { json } = require('body-parser');

let port = 3333
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`server running at localhost:${port}/`);
});

// app.post('/refreshToken', (req, res) => {
//     const refreshToken = req.body.refreshToken
//     console.log('refreshToken');
//     const spotifyApi = new SpotifyWebApi({
//         clientId: 'afbb629dd81d4958a65177e6bd0b69c3',
//         clientSecret: '997848bc733d4238a7e880fffd0042c5',
//         redirectUri: 'http://localhost:3000',
//         refreshToken
//     })

//     spotifyApi.refreshAccessToken().then(
//         data => {
//             console.log(data);
//             res.json({
//                 accessToken: data.body.access_token,
//                 expiresIn: data.body.expires_in,
//             })
//         }
//     ).catch((error) => {
//         console.error(error);
//         res.sendStatus(400).json('refreshTokenFailed')
//     })

// })

app.post('/login', (req, res) => {

    const spotifyApi = new SpotifyWebApi({
        clientId: 'afbb629dd81d4958a65177e6bd0b69c3',
        clientSecret: '997848bc733d4238a7e880fffd0042c5',
        redirectUri: 'http://localhost:3000'
    })
    const code = req.body.code
    console.log(req.body);

    spotifyApi.authorizationCodeGrant(code).then((data) => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err) => {
        console.error(err);
        res.sendStatus(400)
    })
})

app.post('/refreshToken', (req, res) => {

    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        clientId: 'afbb629dd81d4958a65177e6bd0b69c3',
        clientSecret: '997848bc733d4238a7e880fffd0042c5',
        redirectUri: 'http://localhost:3000',
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(err => {
        console.error(err);
        res.sendStatus(400).json('refreshTokenFailed')
    })
})