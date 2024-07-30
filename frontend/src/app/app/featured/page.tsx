"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";

import withAuth from "../../utils/withAuth";
import Nav from "../components/Nav";

import SampleImg from "./img.jpeg";
import Top3Icon from "../top3.svg";

import { StarFilledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

type DataEntry = {
  title: string;
  school: string;
  rating: number;
  top3: number;
  img: any;
};

const dummyData: Array<DataEntry> = [
  {
    title: "Science Library",
    school: "UC Irvine",
    rating: 4.8,
    top3: 294,
    img: SampleImg,
  },
  {
    title: "Student Center",
    school: "UC Irvine",
    rating: 4.6,
    top3: 104,
    img: SampleImg,
  },
  {
    title: "ISEB",
    school: "UC Irvine",
    rating: 4.9,
    top3: 294,
    img: SampleImg,
  },
  {
    title: "Gateway Study Center",
    school: "UC Irvine",
    rating: 4.4,
    top3: 219,
    img: SampleImg,
  },
  {
    title: "Langson Library",
    school: "UC Irvine",
    rating: 4.2,
    top3: 191,
    img: SampleImg,
  },
];

function Spot({ data }: { data: DataEntry }): React.ReactNode {
  return (
    <div className="border-[2px] border-slate-300 rounded-3xl bg-white overflow-hidden transition drop-shadow-md hover:drop-shadow-xl ease-in-out duration-300">
      <Image src={data.img} width={400} alt="Picture of study spot" />

      <div className="flex justify-between items-center py-3 px-4">
        <div className="">
          <div className="flex justify-start text-xl font-semibold">
            {data.title}
          </div>
          <div className="flex justify-start text-sm font-normal text-gray-500">
            {data.school}
          </div>
        </div>
        <div className="flex-column">
          <div className="flex items-center mb-.5">
            <StarFilledIcon className="text-yellow-400 w-7 h-7 mr-1" />
            <span className="font-bold text-slate-700">{data.rating}</span>
            <span className="font-light text-slate-700">/5</span>
          </div>
          <div className="flex justify-end items-center">
            <Image
              src={Top3Icon}
              alt="Top 3"
              width={20}
              height={20}
              className="mr-1.5"
            />
            <span className="font-semibold text-slate-700">{data.top3}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div>
      <Nav />
      <div className="container px-[50px]">
        <div className="relative mt-[25px] mb-[50px] mx-[50px]">
          <Input
            type="text"
            placeholder="Search for places, categories, or locations"
            className="text-xl p-7 rounded-3xl drop-shadow-lg bg-white"
          />
          <MagnifyingGlassIcon className="absolute inset-y-0 end-0 w-7 h-7 text-slate-400 translate-x-[-60%] translate-y-[50%]" />
        </div>

        <div className="text-3xl font-bold mb-7 text-slate-700">
          Featured Spots
        </div>
        <div className="flex flex-wrap gap-9 mb-9">
          {dummyData.map((e, key) => {
            return (
              <button>
                <Spot data={e} key={key} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
