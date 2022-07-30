import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from "../components/Layout/Layout";
import NextNProgress from "nextjs-progressbar";

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <NextNProgress
            color="black"
        />
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </QueryClientProvider>
);

export default MyApp
