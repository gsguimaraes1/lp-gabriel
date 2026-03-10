import React from 'react';

const HeroAnimatedPattern: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2.3] origin-center"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 1084 322"
            >
                <defs>
                    <pattern id="pid-hero-pattern" x="0" y="0" width="153.6" height="153.6" patternUnits="userSpaceOnUse">
                        <g transform="scale(0.6)">
                            <defs>
                                <g id="pat-shape">
                                    <polyline
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        fill="none"
                                        stroke="#FCBE26"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        points=" -3,-2 16.5,15.5 31.5,0.5 63.5,32.5 48.5,47.5 31.5,32.5 -0.5,64.5 16.5,79.5 31.5,64.5 47.5,79.5 95.5,32.5 80.5,15.5 95.5,0.5 127.5,32.5 48.5,111.5 31.5,96.5 -0.5,128.5 16.5,143.5 31.5,127.5 63.5,160.5 80.5,143.5 63.5,128.5 159.5,32.5 144.5,15.5 159.5,0.5 175.5,16.5 192,0 208,16 224,0 256,32 240,48 224,32 207.501,48.501 223.5,64.5 207.5,80.5 176.5,47.5 144.5,80.5 159.5,96.5 175.5,80.5 191.5,96.5 159.5,128.5 127.5,96.5 95.5,127.5 111.5,143.5 127.5,127.5 175.5,176.5 159.5,192.5 127.5,160.5 111.5,176.5 95.5,160.5 63.5,192.5 31.5,160.5 16.5,175.5 31.999,191.483 0,224 16,240 32,225 64,256 80,240 64,224 79.667,208.333 95.5,192.5 111.5,207.5 95.5,224.5 111.5,239.5 127.5,256.5 143.5,240.5 127.5,224.5 143.5,208.5 175.5,240.5 191.5,224.5 175.5,208.5 207.5,176.5 224,160 208,144 191.998,160.998 175.5,144.5 207.5,112.5 240,80 256,96 223.5,128.5 256,160 239.5,176.5 256,192 240,208 224,192 207.5,208.5 223.5,224.5 207.5,240.5 223.5,256.5 240,240 259,259"
                                        strokeDasharray="140.81, 49.47"
                                    >
                                        <animate attributeName="stroke-dashoffset" keyTimes="0;1" values="0;190.29" repeatCount="indefinite" dur="1.88s"></animate>
                                    </polyline>
                                </g>
                            </defs>
                            <use href="#pat-shape" x="0" y="0"></use>
                            <use href="#pat-shape" x="-256" y="0"></use>
                            <use href="#pat-shape" x="256" y="0"></use>
                            <use href="#pat-shape" x="0" y="-256"></use>
                            <use href="#pat-shape" x="0" y="256"></use>
                        </g>
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pid-hero-pattern)"></rect>
            </svg>
        </div>
    );
};

export default HeroAnimatedPattern;
