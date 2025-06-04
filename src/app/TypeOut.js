// portfolio/src/app/TypeOut.js
"use client";
import { useEffect, useState } from 'react';

export default function TypeOut({
                                    text,
                                    style,
                                    render,
                                    byLetter = false,
                                    reverse = false,
                                    onReverseDone,
                                    speed = 10,
                                    reverseTimeout = 2000,
                                    redirectUrl = "/",
                                    skipWhitespace = false
                                }) {
    const [displayed, setDisplayed] = useState(reverse ? text : '');

    useEffect(() => {
        let cancelled = false;
        let timeoutId;

        if (reverse) {
            if (byLetter) {
                // Letter by letter reverse
                let i = text.length;
                function eraseLetter() {
                    if (cancelled) return;
                    if (i > 0) {
                        // Skip whitespace if enabled
                        if (skipWhitespace && text[i - 1] === ' ') {
                            i--;
                            eraseLetter();
                            return;
                        }

                        setDisplayed(text.slice(0, i));
                        i--;
                        setTimeout(eraseLetter, speed);
                    } else if (onReverseDone) {
                        onReverseDone();
                    }
                }
                eraseLetter();
            } else {
                // Word by word reverse
                const words = text.split(' ');
                let i = words.length;
                function eraseWord() {
                    if (cancelled) return;
                    if (i >= 0) {
                        // When i=0, set displayed to empty string to clear the last word
                        setDisplayed(i === 0 ? '' : words.slice(0, i).join(' '));
                        i--;

                        // Call onReverseDone after the last word is erased
                        if (i < 0 && onReverseDone) {
                            onReverseDone();
                        } else {
                            setTimeout(eraseWord, speed);
                        }
                    }
                }
                eraseWord();
            }

            // Time limit for reverse
            timeoutId = setTimeout(() => {
                if (!cancelled) {
                    setDisplayed('');
                    if (onReverseDone) {
                        onReverseDone();
                    }
                }
            }, reverseTimeout);
        } else {
            if (byLetter) {
                let i = 0;
                function typeLetter() {
                    if (cancelled) return;
                    if (i <= text.length) {
                        // Skip whitespace if enabled
                        if (skipWhitespace && text[i] === ' ' && i < text.length) {
                            i++;
                            typeLetter();
                            return;
                        }

                        setDisplayed(text.slice(0, i));
                        i++;
                        setTimeout(typeLetter, speed);
                    }
                }
                typeLetter();
            } else {
                const words = text.split(' ');
                let i = 0;
                function typeWord() {
                    if (cancelled) return;
                    if (i <= words.length) {
                        setDisplayed(words.slice(0, i).join(' ') + (i > 0 && i < words.length ? ' ' : ''));
                        i++;
                        setTimeout(typeWord, speed);
                    }
                }
                typeWord();
            }
        }
        return () => { cancelled = true; clearTimeout(timeoutId); };
    }, [text, byLetter, reverse, speed, onReverseDone, reverseTimeout, redirectUrl, skipWhitespace]);

    if (render) {
        return (
            <pre style={style}>
                {render(displayed)}
            </pre>
        );
    }

    return (
        <pre style={style}>{displayed}</pre>
    );
}