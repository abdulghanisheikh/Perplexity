import {useRef, useEffect} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {

    const paraReference = useRef(null);

    const showWords = () => {
        const words = ["Thinking..", "Generating..", "Searching..", "Analyzing..", "Please wait.."];
        let para = paraReference.current;
        let index = 0;

        setInterval(() => {
            para.innerText = words[index];
            index = (index + 1) % words.length;
        }, 2000);
    }

    useEffect(() => {
        showWords();
    }, []);

    return (
        <div className='flex items-center'>
            <div className='h-10 w-10 rounded-full'>
                <DotLottieReact
                    src='https://lottie.host/1308d27b-d86a-4347-a8c3-9ede5ae7abc2/Nc0h748eRu.lottie'
                    loop
                    autoplay
                />
            </div>
            <p ref={paraReference} className='text-gray-400'></p>
        </div>
    )
}

export default Loading;