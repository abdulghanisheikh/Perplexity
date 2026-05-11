import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {

    const loadingWords = ["Thinking", "Generating"];

    return (
        <div className='flex items-center'>
            <div className='h-10 w-10 rounded-full'>
                <DotLottieReact
                    src='https://lottie.host/1308d27b-d86a-4347-a8c3-9ede5ae7abc2/Nc0h748eRu.lottie'
                    loop
                    autoplay
                />
            </div>
            <p className='text-gray-400'>Thinking...</p>
        </div>
    )
}

export default Loading;