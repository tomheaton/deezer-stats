import Image from "next/image";

export function Footer() {
  return (
    <footer className="container mx-auto flex items-center justify-center space-x-2 p-4">
      <p className="text-center">
        Made with ❤️ by{" "}
        <a
          href="https://tomheaton.dev"
          target="_blank"
          rel="me external noreferrer"
          className="transition-colors hover:text-deezer-purple"
        >
          Tom Heaton
        </a>{" "}
        using
      </p>
      <a href="https://deezer.com" target="_blank" rel="external noreferrer">
        <Image
          src="/deezer-logo-black.png"
          alt="Deezer Logo"
          width={2866}
          height={793}
          className="block h-6 w-auto dark:hidden"
        />
        <Image
          src="/deezer-logo-white.png"
          alt="Deezer Logo"
          width={2866}
          height={793}
          className="hidden h-6 w-auto dark:block"
        />
      </a>
    </footer>
  );
}
