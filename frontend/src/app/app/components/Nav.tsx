import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HamburgerMenuIcon,
  PersonIcon,
  GearIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { logout } from "@/app/utils/auth";

type ProfileProps = {
  handleLogout: () => void;
};

function ProfilePopup({ handleLogout }: ProfileProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="px-2 justify-self-end" asChild>
          <Link href="#">
            <PersonIcon className="w-7 h-7" />
          </Link>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[40px] end-[100px] w-[400px]">
        <DialogHeader>
          <div className="text-lg font-light">Welcome,</div>
          <DialogTitle className="text-4xl">FIRST</DialogTitle>
          <DialogDescription>
            You have no new notifications!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
          <Button asChild>
            <Link href="/app/profile">View Profile</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function HamburgerMenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2 justify-self-end" asChild>
          <Link href="#">
            <HamburgerMenuIcon className="w-7 h-7" />
          </Link>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-md">
            <PlusCircledIcon className="w-5 h-5 mr-1.5" />
            Create Spot
          </DropdownMenuItem>
          <DropdownMenuItem className="text-md">
            <GearIcon className="w-5 h-5 mr-1.5" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Nav() {
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout();
      router.push("/sign-in");
    } catch (err) {
      console.log("Error logging out: " + err);
    }
  };

  return (
    <div className="flex container justify-between items-center px-2">
      <div className="flex items-center">
        <Button variant="link" className="pe-3 my-3" asChild>
          <Link href="/app/featured">
            <div className="text-3xl font-bold text-center">
              <span className="drop-shadow-lg bg-gradient-to-r from-orange-500 to-red-800 inline-block text-transparent bg-clip-text">
                SpotHub
              </span>
            </div>
          </Link>
        </Button>
        <Button variant="link" className="px-3 text-lg" asChild>
          <Link href="#">Explore</Link>
        </Button>
        <Button variant="link" className="px-3 text-lg" asChild>
          <Link href="#">Social</Link>
        </Button>
      </div>
      <div className="flex items-center">
        <HamburgerMenuDropdown />

        <div className="relative">
          <ProfilePopup handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}
