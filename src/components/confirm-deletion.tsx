"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Updated to use the correct path
import { Button } from "@/components/ui/button";

export default function ConfirmDeletion({
  label,
  confirmation_string,
  onDelete,
}: {
  label: string;
  confirmation_string: string;
  onDelete: () => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    if (inputValue === confirmation_string) {
      onDelete(); // Call the onDelete function when input matches confirmation string
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="confirmation-input" className="font-semibold">
        Enter the exact {label} to confirm deletion: <span className="font-bold">{confirmation_string}</span>
      </Label>
      <Input
        type="text"
        id="confirmation-input"
        placeholder={`Type "${confirmation_string}"`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-gray-300 focus:ring-red-500 focus:border-red-500"
      />
      {inputValue === confirmation_string && (
        <Button
          onClick={handleDelete}
          disabled={inputValue !== confirmation_string}
          className={`${
            inputValue === confirmation_string
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Proceed to Delete
        </Button>
      )}
    </div>
  );
}
