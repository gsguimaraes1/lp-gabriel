import React, { useState, useEffect } from 'react';

const words = [
    "Indústria",
    "Concessionária",
    "Distribuidora",
    "Empresa B2B",
    "Operação Logística",
    "Revenda Agrícola"
];

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const DELAY_BETWEEN_WORDS = 2500;

const TypewriterHero: React.FC = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        if (isWaiting) return;
        const currentWord = words[wordIndex];
        const timeout = setTimeout(() => {
            if (isDeleting) {
                if (charIndex > 0) {
                    setCharIndex(prev => prev - 1);
                } else {
                    setIsDeleting(false);
                    setWordIndex(prev => (prev + 1) % words.length);
                }
            } else {
                if (charIndex < currentWord.length) {
                    setCharIndex(prev => prev + 1);
                } else {
                    setIsWaiting(true);
                    setTimeout(() => {
                        setIsWaiting(false);
                        setIsDeleting(true);
                    }, DELAY_BETWEEN_WORDS);
                }
            }
        }, isDeleting ? ERASING_SPEED : TYPING_SPEED);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex, isWaiting]);

    return (
        <div className="w-full text-left mb-6 max-w-[550px]"> {/* Limita a largura para não bater no gráfico */}
            <h1 className="font-['Montserrat',sans-serif] font-bold text-[28px] md:text-[42px] leading-[1.2] text-white tracking-tight">
                Escale com previsibilidade e <br />
                <span className="text-white/90">dados a performance da sua</span>
                <br />
                <span className="relative text-[#FCBE26] inline-block min-h-[1.2em]">
                    {words[wordIndex].substring(0, charIndex)}
                    <span className="ml-1 border-r-4 border-[#FCBE26] animate-pulse"></span>
                </span>
            </h1>
        </div>
    );
};

export default TypewriterHero;