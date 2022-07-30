import {ReactNode, useEffect, useMemo, useState} from "react";
import Link from 'next/link';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router';
import Head from "next/head";

interface Props {
    children: ReactNode;
}

const navigation = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/random',
        label: 'Random beer',
    },
    {
        href: '/about',
        label: 'About',
    }
];

const Layout = ({ children }: Props) => {
    const [currentPath, setCurrentPath] = useState<string>('');
    const router = useRouter();
    const isHome = useMemo(() => currentPath === '/', [currentPath]);
    const currentPageTitle = useMemo(() => navigation.find(i => i.href === currentPath)?.label, [currentPath]);

    useEffect(() => {
        const handleComplete = (url: string) => {
            setCurrentPath(url);
        };
        router.events.on('routeChangeComplete', handleComplete);
        return () => {
            router.events.off('routeChangeComplete', handleComplete);
        }
    })

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    return (
        <>
            <Head>
                <title>{`Beer Browser${currentPageTitle ? ` - ${currentPageTitle}` : ''}`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.pageContainer}>
                <h1 className={styles.title}>Beer Browser</h1>
                <div className={styles.headerContainer}>
                    <ul className={styles.navigation}>
                        {navigation.map(item => (
                            <Link key={item.href} href={item.href}>
                                <li
                                    className={currentPath === item.href ? styles.active : ''}
                                >
                                    {item.label}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                {children}
                {!isHome && (
                    <div
                        className={styles.back}
                        onClick={isHome ? undefined : () => router.back()}
                    >
                        &#x21e6;
                    </div>
                )}

            </div>
        </>
    )
}

export default Layout;