import Image from "next/image";

export default function Footer() {
  return (
    <footer className="container mx-auto flex items-center justify-center space-x-2 p-4">
      <p className="text-center">
        Made with ❤️ by{" "}
        <a
          href="https://tomheaton.dev"
          target="_blank"
          rel="me external noreferrer"
          className="transition-colors hover:text-violet-500"
        >
          Tom Heaton
        </a>{" "}
        using
      </p>
      <a href="https://deezer.com" target="_blank" rel="external noreferrer">
        <Image
          src="/Colored_Full_Black@2x.png"
          alt="Deezer Logo"
          width={895}
          height={175}
          className="block h-4 w-auto dark:hidden"
        />
        <Image
          src="/Colored_Full_White@2x.png"
          alt="Deezer Logo"
          width={895}
          height={175}
          className="hidden h-4 w-auto dark:block"
        />
      </a>
    </footer>
  );
}
