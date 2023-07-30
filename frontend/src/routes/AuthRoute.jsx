import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearStorage, fromStorage } from "../lib";
import http from "../http";
import { addUser, removeUser } from "../state";
import { toast } from "react-hot-toast";

const AuthRoute = ({ element }) => {
    const user = useSelector(state => state.user.value);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(Object.keys(user).length == 0){
            const token = fromStorage('token');

            if(token) {
                http.get('/user/details')
                    .then(({ data }) => {
                        dispatch(addUser(data));
                    })
                    .catch(err => {
                        clearStorage('token');
                        navigate('/cms/login');
                        toast.error('Login required!!');
                    });
            } else {
                toast.error('Please login to continue!!');
                navigate('/cms/login');
            }
        }
    }, [user]);
    
    return element;
};

export default AuthRoute;