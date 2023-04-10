import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "app | deezer-stats",
};

const App: NextPage = () => {
  return (
    <main className="mx-auto min-h-screen container flex flex-col items-center justify-center">
      <h1 className="font-extrabold tracking-tighter text-5xl">deezer-stats</h1>
      <p>your stats here...</p>
    </main>
  );
};

export default App;
