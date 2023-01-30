import Head from 'next/head';
import Agent1 from '@/components/Event1';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='text-center'>
        <div>
          <p className='font-3xl'>
            stuff goes here
          </p>
          <Agent1 />
        </div> 
      </main>
    </>
  )
}
