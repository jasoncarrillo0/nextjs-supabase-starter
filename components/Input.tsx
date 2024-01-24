"use client";

import { generateRandomString } from "@/utils/helpers";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    type: "text" | "email" | "password"
    label: "first name" | "last name" | "email" | "password"
    text: string
    setText: Dispatch<SetStateAction<string>>
};
const Input = ({ type, label, text, setText }: Props) => {

    return (
        <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">{label}</label>
            <input
                type={type}
                id={generateRandomString()}
                name="email"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
        </div>
    );
};

export default Input;
