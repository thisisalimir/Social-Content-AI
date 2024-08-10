"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

function Editor({ value }: { value: string }) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      className="h-[350px] pb-10 bg-white whitespace-pre-wrap"
      value={value}
    ></ReactQuill>
  );
}
export default Editor;
