import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold underline">Wesly Samson the best!</h1>
      <Image src="/wesly.jpg" alt="Next.js logo" width={1200} height={1200} />
      <h2 className="text-4xl font-bold">Binary-64 Floating Point Converter</h2>
    </div>
  );
}
