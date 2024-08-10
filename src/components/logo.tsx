import { cn } from "@/lib/utils";
import { MuseoModerno } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const museo = MuseoModerno({
  weight: "700",
  subsets: ["latin"],
});

function Logo() {
  return (
    <Link href="/" className="flex flex-col items-center">
      <Image src="/logo.svg" width={64} height={64} alt="logo" />
      <h2 className={cn(museo.className, "text-xl")}>Social Content AI</h2>
    </Link>
  );
}
export default Logo;
