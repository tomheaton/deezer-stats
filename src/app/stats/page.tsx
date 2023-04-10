import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "stats | deezer-stats",
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
    `https://api.deezer.com/user/me/history?access_token=${token}`,
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
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-8">
      <h1 className="mb-2 text-5xl font-extrabold tracking-tighter">
        deezer-stats
      </h1>
      {history.data ? (
        <>
          <p className="leading-tight">history: {history.data.length}</p>
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
