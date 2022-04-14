import { useState, useEffect } from 'react'
import axios from 'axios'

const useAuth = (code) => {

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios.post('http://localhost:3333/login', {
            code
        })
            .then(res => {
                console.log(res);
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                // window.history.pushState({}, null, '/')
            }).catch((err) => {
                console.error(err);
                window.location = '/'
            })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {

            axios.post('http://localhost:3333/refreshToken', { refreshToken })
                .then(res => {
                    console.log(res.data);
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                }).catch(() => {
                    window.location = '/'
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [expiresIn, refreshToken])
    return accessToken;
}

export default useAuth