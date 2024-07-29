import { Button } from "@/components/ui/button";
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
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { logout } from "@/app/utils/auth";

type ProfileProps = {
	handleLogout: () => void
}

function ProfilePopup({ handleLogout }: ProfileProps ) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="px-2 justify-self-end" asChild>
          <Link href="#">
            <PersonIcon className="w-7 h-7" />
          </Link>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] left-[89%] top-[18%]">
        <DialogHeader>
          <div className="text-lg font-light">Welcome,</div>
          <DialogTitle className="text-4xl">FIRST LAST</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Nav() {
  const router = useRouter();

	const handleLogout = () => {
		try {
			logout();
			router.push("/sign-in");
		} catch (err) {
			console.log("Error logging out: " + err)
		}
	}

  return (
    <div className="flex justify-between items-center ps-3 pe-4">
      <div className="flex items-center">
        <Button variant="link" className="ps-3 px-3 my-2" asChild>
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
        <Button variant="ghost" className="px-2 justify-self-end" asChild>
          <Link href="#">
            <GearIcon className="w-7 h-7" />
          </Link>
        </Button>

        <ProfilePopup handleLogout={handleLogout}/>
      </div>
    </div>
  );
}
