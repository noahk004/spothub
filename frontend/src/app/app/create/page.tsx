"use client";

import Nav from "../components/Nav";


import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { InfoCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";

type Rating = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<Rating>(5);
  const [anonymous, setAnonymous] = useState<boolean>(false);

  console.log("title: " + title);
  console.log("school: " + school);
  console.log("address: " + address);
  console.log("files: " + files);
  console.log("description: " + description);
  console.log("rating: " + rating);
  console.log("anonymous: " + anonymous);

  return (
    <div>
      <Nav />
      <div className="container px-[300px]">
        <div className=" mt-[60px] mb-8">
          <h1 className="text-5xl font-semibold mb-4 text-slate-700">
            Create Spot
          </h1>
          <p className="text-slate-500">
            Share your favorite spot to study with the world!
          </p>
        </div>
        <div className="grid gap-5">
          <div className="flex gap-[60px]">
            <div className="w-full">
              <label
                htmlFor="title"
                className="flex gap-2 items-center font-bold text-slate-500"
              >
                <span>Title</span>
                <InfoCircledIcon className="w-5 h-5" />
              </label>
              <Input
                id="title"
                type="text"
                className="bg-white rounded-lg mt-2 text-slate-500 text-md"
                maxLength={50}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="school"
                className="flex gap-2 items-center font-bold text-slate-500"
              >
                <span>School</span>
                <InfoCircledIcon className="w-5 h-5" />
              </label>
              <Input
                id="school"
                type="text"
                className="bg-white rounded-lg mt-2 text-slate-500 text-md"
                maxLength={50}
                onChange={(e) => {
                  setSchool(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="flex gap-2 items-center font-bold text-slate-500"
            >
              <span>Address</span>
              <InfoCircledIcon className="w-5 h-5" />
            </label>
            <Input
              id="address"
              type="text"
              className="bg-white rounded-lg mt-2 text-slate-500 text-md"
              maxLength={100}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="flex gap-2 items-center font-bold text-slate-500">
              <span className="cursor-default">Pictures</span>
              <InfoCircledIcon className="w-5 h-5" />
            </div>
            <Input
              id="pictures"
              type="file"
              className="bg-white rounded-lg mt-2 text-slate-500 w-auto"
              multiple
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
          </div>
          <div>
            <div className="flex gap-2 items-center font-bold text-slate-500">
              <span className="cursor-default">Description</span>
              <InfoCircledIcon className="w-5 h-5" />
            </div>
            <Textarea
              id="description"
              className="bg-white rounded-lg mt-2 text-slate-500 text-md w-[600px]"
              maxLength={2000}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="flex gap-2 items-center font-bold text-slate-500 mb-4">
              <span className="cursor-default">Rating</span>
              <InfoCircledIcon className="w-5 h-5" />
            </div>
            <div className="flex items-center">
              <Slider
                defaultValue={[5]}
                min={1}
                max={5}
                step={0.5}
                className="w-[300px] mr-4"
                onValueChange={setRating as () => void}
              />
              <div className="flex items-center">
                <StarFilledIcon className="w-8 h-8 text-yellow-400 mr-2" />
                <span className="font-bold text-slate-700 text-xl">
                  {rating}
                </span>
                <span className="font-light text-slate-700 text-xl">/5</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Checkbox
              onCheckedChange={setAnonymous as () => void}
              className="bg-white rounded-sm border-slate-500 text-slate-500 text-md mr-2"
            />
            <div className="flex gap-2 items-center text-slate-500">
              <span>Keep my post anonymous</span>
              <InfoCircledIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex gap-3 mt-6 mb-8 justify-end">
            <Button variant="outline" className="bg-white" asChild>
              <Link href="/app/explore">Cancel</Link>
            </Button>
            <Button>Publish</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
