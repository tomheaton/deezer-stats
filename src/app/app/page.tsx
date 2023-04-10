import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "app | deezer-stats",
};

type Props = {
  searchParams?: {
    token?: string;
  };
};

const getHistory = async (token?: string) => {
  if (!token) {
    return {
      success: false,
      error: "no token",
    };
  }

  const url = new URL("https://api.deezer.com/user/me/history");
  url.searchParams.set("access_token", token);

  const response = await fetch(
    `https://api.deezer.com/user/me/history?access_token=${token}`
  );

  const data = await response.json();

  if (data.error) {
    console.error("error", data.error);
    return {
      success: false,
      error: JSON.stringify(data.error),
    };
  }

  return {
    success: true,
    data: data.data,
  };
};

export default async function Page({ searchParams }: Props) {
  const { token } = searchParams || {};

  const history = await getHistory(token);

  return (
    <main className="mx-auto py-8 min-h-screen container flex flex-col items-center justify-center">
      <h1 className="font-extrabold tracking-tighter text-5xl mb-2">
        deezer-stats
      </h1>
      {history.data ? (
        <>
          <p>history: {history.data.length}</p>
          <ul>
            {history.data.map((item: any) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>error: {history.error}</p>
      )}
    </main>
  );
}
