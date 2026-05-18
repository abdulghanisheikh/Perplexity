import { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingAIMessage = () => {
    const words = ["Thinking...", "Generating...", "Searching...", "Analyzing...", "Please wait..."];
    const [currentWord, setCurrentWord] = useState(words[0]);

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % words.length;
            setCurrentWord(words[index]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex items-center'>
            <div className='h-13 w-13 rounded-full'>
                <DotLottieReact
                    src='https://lottie.host/1308d27b-d86a-4347-a8c3-9ede5ae7abc2/Nc0h748eRu.lottie'
                    loop
                    autoplay
                />
            </div>
            <p className='text-gray-400 italic'>{currentWord}</p>
        </div>
    )
}

export default LoadingAIMessage;