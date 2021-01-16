import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
  const { TWITCH_CLIENT_ID } = process.env;
  return {
    props: {}
  };
}

export default function Home() {
  const { NEXT_PUBLIC_TWITCH_CLIENT_ID } = process.env;
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState('');
  const [list, setList] = useState([]);

  const totalBits = list.reduce((acc, item) => acc += item.score, 0);

  async function listBits() {
    const response = await fetch('https://api.twitch.tv/helix/bits/leaderboard', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Client-Id': NEXT_PUBLIC_TWITCH_CLIENT_ID
      }
    });
    const json = await response.json();
    setLoaded(true);
    setList(json.data);
  }

  useEffect(() => {
    const haveToken = window.localStorage.getItem('_twitch_token');
    const {hash} = window.location;

    if (haveToken) setToken(haveToken);

    if (!haveToken && hash) {
      const accessToken = hash
        .replace('#', '')
        .split('&')
        .filter(string => string.indexOf('access_token') !== -1)[0]
        .split('=')[1];
      window.localStorage.setItem('_twitch_token', accessToken);
      setToken(accessToken);
    }

    if (token && !loaded) listBits();
  });
  
  return (
    <div className="app-test-bits">
      <Head>
        <title>Bits list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!token && <a href={`https://id.twitch.tv/oauth2/authorize?client_id=${NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000&response_type=token&scope=bits:read`}>Login with twitch</a>}
      
      {token &&
        <main id="app">
          <b>Total:</b> {totalBits} bits ({totalBits/100}$)
          <ul>
            {list.map(item =>
              <Link key={item.user_id} href={`/user/${item.user_name}-${item.user_id}`}><li><a><b>#{item.rank} {item.user_name}:</b> {item.score} bits</a></li></Link>
            )}
          </ul>
        </main>
      }
    </div>
  )
}


