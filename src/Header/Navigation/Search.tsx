import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      searchedItem: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.searchedItem) return navigate("/");

    let currentQuery = {};

    if (params[0]) {
      currentQuery = queryString.parse(params[0].toString());
    }

    const updatedQuery = { ...currentQuery, searchedItem: data.searchedItem };

    const url = queryString.stringifyUrl(
      {
        url: "/Shop",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    navigate(url);
    reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)(); // Trigger form submission
      setIsFocused(false);
    }
  };

  return (
    <div
      className={`flex items-center transition-all duration-300 ${
        isFocused
          ? "sm:absolute sm:top-[30px] sm:left-1/2 sm:transform sm:-translate-x-1/2  sm:z-50 md:relative md:top-0 md:left-0 md:transform-none md:-translate-x-0 md:w-80"
          : "w-10 md:w-80"
      }  md:relative md:top-0`}
    >
      <input
        onKeyDown={handleKeyDown}
        {...register("searchedItem")}
        autoComplete="off"
        type="text"
        placeholder="Search items in shop"
        className={`p-1.5 md:p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[1px] focus:border-slate-500 
            ${
              isFocused
                ? "sm:absolute sm:top-[30px] sm:left-1/2 sm:transform sm:-translate-x-1/2  sm:z-50 md:relative md:top-0 md:left-0 md:transform-none md:translate-x-0 md:w-80"
                : "w-10 md:w-80"
            }
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="p-1.5 md:p-2 rounded-r-md bg-slate-700">
        <CiSearch size={24} color="white" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};

export default Search;
