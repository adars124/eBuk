import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../lib";

const AdminCheck = ({ element }) => {
    const user = useSelector(state => state.user.value);

    const navigate = useNavigate();
    
    useEffect(() => {
        if(Object.keys(user).length !== 0 && user.userType === 'admin'){
            navigate('/cms/dashboard');
        } else {
            toast.error('Not a privileged user!');
            clearStorage('token');
            navigate('/cms/login');
        }
    }, [user]);

    return element;
};

export default AdminCheck;