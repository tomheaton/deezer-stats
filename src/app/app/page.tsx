import type { Metadata } from "next";

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "app | deezer-stats",
};

type Props = {
  searchParams?: {
    token?: string;
  };
};

const getHistory = async (token?: string) => {
  if (!token) return [];

  const response = await fetch(
    `https://api.deezer.com/user/me/history?access_token=${token}`
  );
  const data = await response.json();
  console.log("data", data);
  return data.data;
};

export default async function Page({ searchParams }: Props) {
  const { token } = searchParams || {};

  const history = await getHistory(token);

  return (
    <main className="mx-auto min-h-screen container flex flex-col items-center justify-center">
      <h1 className="font-extrabold tracking-tighter text-5xl">deezer-stats</h1>
      <p>your stats here...</p>
      <p>token: {token ?? "no token"}</p>
      <br />
      <p>history: {history.length}</p>
      <ul>
        {history.map((item: any) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </main>
  );
}

// export default App;
