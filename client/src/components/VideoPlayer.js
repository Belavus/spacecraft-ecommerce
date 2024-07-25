import React from 'react';

const VideoPlayer = ({ src, width = '100%', height = 'auto' }) => {
    return (
        <video width={width} height={height} controls>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;
