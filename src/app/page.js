"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import TypeOut from './TypeOut';
import './global.css';

const asciiArt = `  /$$$$$$            /$$        /$$$$$$
 /$$__  $$          | $$       /$$__  $$
| $$  \\__/  /$$$$$$ | $$$$$$$ | $$  \\__/  /$$$$$$   /$$$$$$   /$$$$$$  /$$   /$$
|  $$$$$$  /$$__  $$| $$__  $$|  $$$$$$  /$$__  $$ /$$__  $$ /$$__  $$| $$  | $$
 \\____  $$| $$  \\ $$| $$  \\ $$ \\____  $$| $$  \\ $$| $$  \\__/| $$  \\__/| $$  | $$
 /$$  \\ $$| $$  | $$| $$  | $$ /$$  \\ $$| $$  | $$| $$      | $$      | $$  | $$
|  $$$$$$/|  $$$$$$/| $$  | $$|  $$$$$$/|  $$$$$$/| $$      | $$      |  $$$$$$$
 \\______/  \\______/ |__/  |__/ \\______/  \\______/ |__/      |__/       \\____  $$
                                                                       /$$  | $$
                                                                      |  $$$$$$/
                                                                       \\______/`;

const flower = `
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠒⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠖⠋⠀⠀⠀⢻⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢴⠾⠑⢦⡞⠃⠀⠀⠀⠀⠀⣼⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣯⠌⠀⠀⠀⢳⠀⠀⠀⠀⠀⢠⠧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢇⠀⢀⡔⠋⠻⠚⣆⢀⣀⡠⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⡝⠆⠀⠀⠀⠁⡧⠆⠈⢣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡄⠉⠉⠉⠒⠢⢄⡀⠀⠀⠀⠀⠀⢹⣼⡀⢀⣀⠜⠃⠀⠀⢺⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢧⠀⠀⠀⠀⠀⠀⠙⢶⠀⠀⠀⠀⣾⠿⠛⠙⠢⠤⠤⠤⠒⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⢀⢾⠢⠴⠤⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⢠⡿⠄⠀⠀⠀⠀⢀⡷⡒⠒⠲⢤⡀⠀⢀⣠⢀⣀⣠⠀⠀⠀⠀
                ⠀⠀⠀⠀⢠⠋⠀⢠⠀⠀⠀⠙⣆⣀⡤⠤⠤⣄⡀⠀⠀⠈⢦⡀⡀⠀⠀⠀⢀⡏⢀⣴⠟⠁⠀⠀⠀⠀⢀⡜⠀⠀⡄⠀⠀⢙⡞⠁⠀⠀⢀⠈⢦⠀⠀⠀
                ⠀⠀⠀⠀⡇⠀⠀⠨⡄⠀⠀⢀⠜⠃⠀⠀⠀⠈⠉⣱⡆⠀⠀⠉⠓⠲⠶⠶⣮⣠⡾⠃⠀⠀⠀⠀⠀⠀⠈⣇⠀⠀⠰⡀⠀⢸⠀⢠⢀⠔⠁⠀⠈⣶⠀⠀
                ⠀⠀⠀⠀⢳⡀⠀⠀⣰⣤⣄⡌⣄⢀⢀⠠⠒⠁⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⡟⣿⠉⠀⠀⠀⠀⠀⠀⢀⡴⠼⠦⠄⡀⠡⣰⣼⠻⣾⠟⣀⠀⢀⡼⠈⠀⠀
                ⠀⠀⢀⡔⠋⠉⠓⢺⢽⡝⣦⣺⢁⣴⡊⠀⣀⠀⠀⣰⠛⠀⠀⠀⠀⠀⠀⢰⡿⠃⠀⠀⠀⠀⠀⠀⢰⡇⠀⠀⠀⠀⠀⠱⡯⡖⠛⡤⣺⡟⠋⠉⠙⠢⡀⠀
                ⠀⢠⠯⠀⠀⠀⠀⢈⡯⢮⣏⣸⣗⠛⠏⠉⠀⠉⠙⢦⡀⠀⠀⠀⠀⠀⢠⣻⠋⠀⠀⠀⠀⠀⠀⠀⣞⠁⠀⠉⠁⠀⣨⠽⠛⢿⢿⣽⠓⠟⢄⡀⠀⠀⢳⡀
                ⠠⣞⠒⠀⠈⠉⠉⠀⠷⡜⢱⠙⡴⣧⡒⠠⢀⠀⠀⠀⣧⠀⠀⠀⠀⢠⣷⠃⠀⠀⢀⣀⣤⣴⡶⠿⠛⠳⢤⣀⠀⡰⠁⠀⠀⠆⠀⠙⡆⠀⠀⠈⠁⢀⣘⡤
                ⠀⠀⠑⣅⡄⠀⠀⣀⡴⠁⠌⠛⠹⣀⠀⠀⠀⠀⠀⠀⣸⠀⠀⢀⡴⣣⣷⣶⡾⠽⠿⣫⠭⠤⢤⡀⠀⠀⠀⠈⠉⢳⠀⠀⠸⠀⠀⠀⣸⠦⠤⠤⠔⠊⠀⠀
                ⠀⠀⠀⠀⠉⠉⡏⠀⠀⣘⠀⠀⠀⠙⣦⢄⣠⣀⡴⠋⠁⢀⡴⣿⠟⠉⠁⠀⠀⠀⠀⡇⠀⠀⠀⠈⢢⡄⠀⠀⠀⠈⢮⡂⡀⠀⢀⡴⠃⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠳⡠⡀⠃⠀⠀⢀⡜⡞⣆⠀⠀⢀⣤⢞⡵⠟⠁⠀⠀⠀⠀⠀⠀⠀⠸⡄⠀⠀⠀⠀⢧⠀⠀⠀⠀⠀⠈⠗⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠈⢦⠦⠔⠒⠉⠀⡟⢸⠒⣋⡥⠞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢶⡀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠞⠁⣩⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠢⢼⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠖⢋⡠⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⣖⠋⣡⡔⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⢸⠃⣴⠗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⢠⠏⣸⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⣰⠃⢠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⢀⠞⠁⢀⠞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⢀⣴⣫⠤⠖⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            `

export const text = {
    fontFamily: "'NK57 Monospace', monospace",
    fontSize: '1rem',
    color: '#cccccc',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxWidth: '100%',
    boxSizing: 'border-box',
};

export const heading = {
    fontFamily: "'NK57-Heading', normal",
    fontWeight: 600,
    color: '#cccccc',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxWidth: '100%',
    boxSizing: 'border-box',
};

const ascii = {
    fontFamily: "'NK57 Monospace', monospace",
    fontSize: '.75rem',
    color: '#cccccc',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxWidth: '100%',
    boxSizing: 'border-box',
    minHeight: '15em',
};

export default function Page() {
    const [reverse, setReverse] = useState(false);
    const [pendingHref, setPendingHref] = useState(null);
    const router = useRouter();

    // Intercept all <a> clicks
    const handleLinkClick = useCallback(e => {
        const a = e.target.closest("a");
        if (a && a.getAttribute("href")) {
            e.preventDefault();
            setPendingHref(a.getAttribute("href"));
            setReverse(true);
        }
    }, []);

    // After reverse animation, navigate
    const handleReverseDone = useCallback(() => {
        if (pendingHref) {
            router.push(pendingHref);
        }
    }, [pendingHref, router]);

    return (
        <div style={{
            display: 'flex',
            padding: '5rem',
            minHeight: '100vh'
        }}>
            <div
                className="text-center p-8"
                style={{
                    flex: 1,
                    maxWidth: '50%',
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                    position: 'relative', // Add position relative
                    height: '100%' // Fix height
                }}
                onClick={handleLinkClick}
            >
                <div style={{
                    position: 'relative',
                    minHeight: '220px' // Set minimum height for ASCII art container
                }}>
                    <TypeOut
                        text={asciiArt}
                        style={{
                            ...ascii,
                            position: 'absolute', // Position absolutely
                            top: 0,
                            left: 0
                        }}
                        reverse={reverse}
                        onReverseDone={handleReverseDone}
                        skipWhitespace={true}
                    />
                </div>

                <div style={{
                    marginTop: '0px', // Add fixed margin to avoid overlap
                    position: 'relative'
                }}>
                    <TypeOut
                        text={'Hi, I\'m Sohaib (or Soh, as my friends like to call me). I\'m an <span style="color:#ff5252;">undergraduate student</span> at <span style="color:#6250b3;"> NUST</span> with a passion for Machine Learning and Backend Development. I\'m always tinkering with new ideas and diving into unfamiliar territory, so you\'ll find a lot of variety in my projects. Feel free to explore my work and check out the blogs where I share my development process!\n\nYou can take a look at my projects <a href="/blog/PrepApp" style="color:#ff5252;text-decoration:underline;">here</a> \n\nEmail: <a href="mailto:sohaibmubashir6@gmail.com" style="color:#ff5252;text-decoration:underline;">sohaibmubashir6@gmail.com</a>\nGithub: <a href="https://www.github.com/SohSohh" target="_blank" style="color:#ff5252;text-decoration:underline;">SohSohh</a>\nLinkedIn: <a href="https://www.linkedin.com/in/sohaib-mubashir-1578b5248/" target="_blank" style="color:#ff5252;text-decoration:underline;">Sohaib Mubashir</a>\n\nThis website is intended to be viewed on desktop as it may not render properly on mobile devices :)'}
                        style={text}
                        render={displayed => (
                            <span dangerouslySetInnerHTML={{ __html: displayed }} />
                        )}
                        reverse={reverse}
                    />
                </div>
            </div>
            <div
                style={{
                    whiteSpace: "pre",
                    flex: 1,
                    color: "#cccccc",
                    textAlign: "right",
                    width: "50%", // Fix width
                    fontSize: '1rem',
                    display: "flex",
                    justifyContent: "flex-end",
                    position: 'relative', // Add position
                    overflow: 'hidden' // Prevent overflow
                }}
            >
                <TypeOut
                    text={flower}
                    style={{
                        position: 'absolute', // Position absolutely
                        right: 0,
                        top: 0,
                        maxHeight: '100vh'
                    }}
                    render={displayed => (
                        <span dangerouslySetInnerHTML={{ __html: displayed }} />
                    )}
                    reverse={reverse}
                    skipWhitespace={true}
                />
            </div>
        </div>
    );
}