import { useEffect, useState } from "react";

export async function getServerSideProps({ params }) {
  const { id } = params;
  const [,userId] = id.split('-');

  return {props: {id: userId}}
}

export default function User({ id }) {
  const { NEXT_PUBLIC_TWITCH_CLIENT_ID } = process.env;
  const [userId, setUserId] = useState(id);

  if (!userId) return <b>Error: Sin id</b>;

  async function fetchBits() {
    const token = window.localStorage.getItem('_twitch_token');
    console.info(`https://api.twitch.tv/helix/bits/leaderboard?user_id=${userId}`)
    const response = await fetch(`https://api.twitch.tv/helix/bits/leaderboard?user_id=${userId}&count=1`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Client-Id': NEXT_PUBLIC_TWITCH_CLIENT_ID
      }
    });
    const json = await response.json();

    console.info(json);
  }

  useEffect(() => {
    if (userId) fetchBits();
  })

  return userId;
}