import BinaryViz from "@/app/components/BinaryViz";

export default function Home() {
  return (
    <div className="flex flex-col space-y-5">
      <h1 className="flex justify-center text-center text-5xl mq1350:text-3xl font-semibold">
        IEEE 754 Double Precision Converter
      </h1>
      <BinaryViz />
    </div>
  );
}
