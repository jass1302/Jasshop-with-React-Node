import React from 'react'
import { useSelector } from 'react-redux';

export default function TemporalScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin');
    } else if (!userInfo.isAdmin) {
        props.history.push('/');
    }
    return (
        <div>
            <h1>Solo administradores jaja</h1>
        </div>
    )
}
