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
            }

            const timer = setTimeout(() => {
                if (!hasScrolled) {
                    setPromptVisible(true);
                }
            }, PROMPT_TIME * 1000);
            return () => clearTimeout(timer);
        }
    }, [siteEntered, hasScrolled]);

    useTransform(() => {
        if (scrollYProgress.get() === 0 && hasScrolled) {
            setHasScrolled(false);
        } else if (scrollYProgress.get() > 0 && !hasScrolled) {
            setHasScrolled(true);
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
                <Prompt>Scroll to explore!</Prompt>
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
