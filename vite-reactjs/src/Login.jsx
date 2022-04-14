import React from 'react'
import { Container } from 'react-bootstrap'

const Login = () => {


  let AUTH_URL = `https://accounts.spotify.com/authorize?client_id=afbb629dd81d4958a65177e6bd0b69c3&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="text-uppercase">spotify Profile</h1>
      <a className="btn btn-success btn-lg" href={AUTH_URL} >Login with spotify</a>
    </Container>
  )
}

export default Login