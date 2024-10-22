import { BsHandIndexThumb } from "react-icons/bs";
import { useStore } from "../lib/store";
import {
    AnimatePresence,
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

export function Entry() {
    const { siteEntered, loadProgress } = useStore();
    const [promptVisible, setPromptVisible] = useState<boolean>(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

    const PROMPT_TIME = 4;

    useEffect(() => {
        if (siteEntered) {
            if (hasScrolled) {
                setPromptVisible(false);
                console.log("SCROLLED");
            }

            const timer = setTimeout(() => {
                if (!hasScrolled) {
                    setPromptVisible(true);
                    console.log("PROMPT");
                }
            }, PROMPT_TIME * 1000);
            return () => clearTimeout(timer);
        }
    }, [siteEntered, hasScrolled]);

    useTransform(() => {
        if (scrollYProgress.get() === 0 && hasScrolled) {
            setHasScrolled(false);
            console.log("AT THE TOP");
        } else if (scrollYProgress.get() > 0 && !hasScrolled) {
            setHasScrolled(true);
            console.log("NOT AT THE TOP");
        }
    });

    return (
        <AnimatePresence>
            {!siteEntered &&
                (loadProgress < 100 ? (
                    <Prompt>Loading...</Prompt>
                ) : (
                    <Prompt>
                        <BsHandIndexThumb /> me to enter!
                    </Prompt>
                ))}
            {siteEntered && promptVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed bottom-32 left-1/2 translate-x-[-50%] text-white z-40 text-[1.5rem] pointer-events-none select-none"
                >
                    Scroll to explore!
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface PromptProps {
    children: React.ReactNode;
}

function Prompt({ children }: PromptProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-32 left-1/2 translate-x-[-50%] text-white z-40 text-[1.5rem] pointer-events-none select-none"
        >
            <span className="flex gap-x-3 items-center">{children}</span>
        </motion.div>
    );
}

const ScrollPromptVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
