import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    const navigate = useNavigate();

    if(loading) {
        return <div className='h-screen w-screen bg-zinc-950'>
            <h1 className='text-3xl text-white'>loading...</h1>
        </div>
    }

    if(!user) {
        navigate("/login");
    } else {
        return children;
    }
}

export default Protected;