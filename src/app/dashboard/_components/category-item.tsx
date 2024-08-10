"use client";

import { cn } from "@/lib/utils";
import { CategoryProps } from "./categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

function CategoryItem({ name, value }: CategoryProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const isSelected = currentCategory === value;

  // Filter by Category
  const handleOnClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          //With query we set: http://localhost:3000/dashboard?category=Tweet
          category: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={handleOnClick}
      className={cn(
        "py-2 px-4 text-sm border rounded-full flex items-center cursor-pointer"
      )}
    >
      {name}
    </button>
  );
}
export default CategoryItem;
