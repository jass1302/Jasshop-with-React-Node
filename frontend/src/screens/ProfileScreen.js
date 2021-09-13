import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    useEffect(() => {
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo._id]);
    const submitHandler = (e) => {
        e.preventDefault();
        //TODO: Update action
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1>Perfil de usuario</h1></div>
                {
                    loading ? <LoadingBox></LoadingBox> :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <>
                                <div>
                                    <label htmlFor='name'>Nombre</label>
                                    <input type="text" id="name" placeholder='Tu nombre' value={user.name} />
                                </div>
                                <div>
                                    <label htmlFor='email'>Correo</label>
                                    <input type="email" id="email" placeholder='Tu correo' value={user.email} />
                                </div>
                                <div>
                                    <label htmlFor='password'>Clave</label>
                                    <input type="password" id="password" placeholder='Tu clave' />
                                </div>
                                <div>
                                    <label htmlFor='confirmPassword'>Confirma tu clave</label>
                                    <input type="password" id="confirmPassword" placeholder='Tu clave de nuevo' />
                                </div>
                                <div>
                                    <button type="submit" className="primary">Actualizar</button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}
