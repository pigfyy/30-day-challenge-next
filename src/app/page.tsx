"use client";

import React from "react";
export default function Page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fileInput = e.target.elements[0] as HTMLInputElement;
    const file = fileInput.files?.[0];

    fetch("/api/upload-image", {
      method: "POST",
      body: JSON.stringify({
        base64: await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }),
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" />
      <button type="submit" className="bg-blue-500 text-white p-3 rounded-xl">
        Submit
      </button>
    </form>
  );
}
