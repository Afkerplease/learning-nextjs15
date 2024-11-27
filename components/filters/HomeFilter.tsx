"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filters = [
  { name: "React", value: "react" },
  { name: "javascript", value: "javascript" },
];
function HomeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");
  const handleClick = (filter: string) => {
    let newUrl = "";
    if (filter === active) {
      setActive("");
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
      setActive(filter);
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className=" mt-10 hidden flex-wrap gap-3 sm:flex">
      {" "}
      {filters.map((filter) => (
        <Button
          onClick={() => handleClick(filter.value)}
          className={cn(
            `   body-medium rounded-lg px-6 py-3 capitalize shadow-none `,
            active === filter.value
              ? " bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400 "
              : " bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          key={filter.name}
        >
          {filter.name}{" "}
        </Button>
      ))}{" "}
    </div>
  );
}

export default HomeFilter;
