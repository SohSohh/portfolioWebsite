// portfolio/src/app/components/TypeOutContainer.js
"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function TypeOutContainer({ children, style = {}, reverseTimeout = 3000 }) {
    const [reverse, setReverse] = useState(false);
    const [pendingHref, setPendingHref] = useState(null);
    const [imagesFaded, setImagesFaded] = useState(false);
    const router = useRouter();
    const containerRef = useRef(null);


    // src/app/components/TypeOutContainer.js
    const getBasePath = () =>
        process.env.NODE_ENV === "production" ? "/portfolioWebsite" : "";

    const handleReverseDone = useCallback(() => {
        if (pendingHref) {
            let href = pendingHref;
            if (
                process.env.NODE_ENV === "production" &&
                href.startsWith("/") &&
                !href.startsWith(getBasePath()) &&
                !href.startsWith("https://") &&
                !href.startsWith("http://")
            ) {
                href = getBasePath() + href;
            }
            router.push(href);
            setReverse(false);
        }
    }, [pendingHref, router]);

    const handleLinkClick = useCallback(e => {
        const a = e.target.closest("a");
        if (a && a.getAttribute("href")) {
            e.preventDefault();
            setPendingHref(a.getAttribute("href"));
            setReverse(true);
            setImagesFaded(true);
        }
    }, []);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        node.addEventListener("click", handleLinkClick);
        return () => node.removeEventListener("click", handleLinkClick);
    }, [handleLinkClick]);

    // Duplicate handleReverseDone removed

    useEffect(() => {
        if (!reverse || !pendingHref) return;
        const timeoutId = setTimeout(() => {
            let href = pendingHref;
            if (
                process.env.NODE_ENV === "production" &&
                href.startsWith("/") &&
                !href.startsWith(getBasePath()) &&
                !href.startsWith("https://") &&
                !href.startsWith("http://")
            ) {
                href = getBasePath() + href;
            }
            router.push(href);
            setReverse(false);
        }, reverseTimeout);
        return () => clearTimeout(timeoutId);
    }, [reverse, pendingHref, reverseTimeout, router]);

    // Recursively find all TypeOut elements
    function findAllTypeOuts(nodes, acc = []) {
        React.Children.forEach(nodes, child => {
            if (React.isValidElement(child)) {
                if (child.type?.name === "TypeOut") {
                    acc.push(child);
                } else if (child.props?.children) {
                    findAllTypeOuts(child.props.children, acc);
                }
            }
        });
        return acc;
    }
    const allTypeOuts = findAllTypeOuts(children);
    const lastTypeOut = allTypeOuts[allTypeOuts.length - 1];

    // Recursively clone children and inject props
    function injectProps(node) {
        if (!React.isValidElement(node)) return node;
        if (node.type === "img") {
            if (reverse) {
                const { width, height, alt = "" } = node.props;
                return (
                    <div
                        style={{
                            width,
                            height: height === "auto" ? "200px" : height,
                            background: imagesFaded ? "#1e90ff" : "transparent",
                            border: "2px solid #1e90ff",
                            boxSizing: "border-box",
                            transition: "all 0.5s ease-in-out",
                            opacity: imagesFaded ? 0 : 1,
                            margin: "10px 0",
                        }}
                        aria-label={alt}
                    />
                );
            }
            return node;
        }
        if (node.type?.name === "TypeOut") {
            return React.cloneElement(node, {
                reverse: reverse,
                onReverseDone: node === lastTypeOut ? handleReverseDone : undefined,
            });
        }
        if (node.props?.children) {
            return React.cloneElement(node, {
                children: React.Children.map(node.props.children, injectProps),
            });
        }
        return node;
    }

    return (
        <div ref={containerRef} style={{ ...style }}>
            {React.Children.map(children, injectProps)}
        </div>
    );
}