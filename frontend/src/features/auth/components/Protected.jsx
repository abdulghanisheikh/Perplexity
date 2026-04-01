import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if(loading) {
        return (
            <div className='h-screen w-screen bg-zinc-950 flex justify-center items-center'>
                <h1 className='text-3xl text-white'>Loading...</h1>
            </div>
        )
    }

    if(!user) {
        return <Navigate to="/login" />
    }

    return children;
}

export default Protected;