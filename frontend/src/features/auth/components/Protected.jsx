import {useSelector} from "react-redux";

const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if(loading) {
        return <div className='h-screen w-screen bg-zinc-950'>
            <h1 className='text-3xl text-white'>loading...</h1>
        </div>
    }

    if(user) return children;
}

export default Protected;