import { Button } from "@/components/ui/button";
import Link from "next/link";

import { GearIcon, PersonIcon } from "@radix-ui/react-icons";

export default function Nav() {
  return (
    <div className="flex justify-between px-3">
      <div>
        <Button variant="link" className="ps-2 px-3" asChild>
          <Link href="/app/featured">
            <div className="text-xl font-bold text-center">
              <span className="drop-shadow-lg bg-gradient-to-r from-orange-500 to-red-800 inline-block text-transparent bg-clip-text">
                SpotHub
              </span>
            </div>
          </Link>
        </Button>
        <Button variant="link" className="px-2" asChild>
          <Link href="#">Explore</Link>
        </Button>
        <Button variant="link" className="px-2" asChild>
          <Link href="#">Social</Link>
        </Button>
      </div>
      <div>
        <Button variant="ghost" className="px-2 justify-self-end" asChild>
          <Link href="#">
            <GearIcon className="w-5 h-5" />
          </Link>
        </Button>
        <Button variant="ghost" className="px-2 justify-self-end" asChild>
          <Link href="#">
            <PersonIcon className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
