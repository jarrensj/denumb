import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex flex-col items-center p-24 flex-grow">
        <h1 className="text-4xl font-bold mb-2">denumb</h1>
        <p className="text-lg text-center mb-6">
          easily compare different denominations of cryptocurrency
        </p>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}