import { colors } from "@/lib/Colors";
import { Button, Dropdown } from "flowbite-react";
import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const HeaderNav = ({
  filterByColor,
}: {
  filterByColor: (color: string) => void;
}) => {
  const [showColors, setShowColors] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [datePicked, setDatePicked] = useState("");

  const filterByDate = (date: string) => {
    console.log(date);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            target="_blank"
            className="flex items-center"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 36 36"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              //   {...props}
              className="w-[36px] h-[36px] text-gray-800 dark:text-white"
            >
              <title>{"pencil-solid"}</title>
              <path
                className="clr-i-solid clr-i-solid-path-1"
                d="M4.22,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13,32,28.84,16.22,20,7.4Z"
              />
              <path
                className="clr-i-solid clr-i-solid-path-2"
                d="M33.82,8.32l-5.9-5.9a2.07,2.07,0,0,0-2.92,0L21.72,5.7l8.83,8.83,3.28-3.28A2.07,2.07,0,0,0,33.82,8.32Z"
              />
              <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
            </svg>
            <span className="ml-1 self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-black">
              Notes
            </span>
          </a>
          <div className="flex items-center gap-[0.375em] text-black dark:text-white text-sm">
            <a href="">Home</a>
            <span>|</span>

            {/* <span>Filter by Color</span> */}
            <Dropdown
              label="Filter by Color"
              dismissOnClick
              className="p-2"
              inline
            >
              <Dropdown.Item onClick={() => filterByColor("")}>
                all
              </Dropdown.Item>
              {colors.map((clr, index) => (
                <Dropdown.Item
                  key={index}
                  className="flex gap-2"
                  onClick={() => filterByColor(clr.hashcode.replace("#", ""))}
                >
                  <span
                    className="h-5 w-5 rounded font-semibold border border-gray-400"
                    style={{ color: clr.hashcode }}
                  >
                    {clr.name.charAt(0).toUpperCase()}
                  </span>
                  <span>{clr.name}</span>
                </Dropdown.Item>
              ))}
            </Dropdown>
            <span>|</span>
            {/* <span>Filter by Date</span> */}
            <Dropdown
              label="Filter by Date"
              dismissOnClick
              className="p-2"
              inline
            >
              {/* <PickerDate /> */}
              {/* <Datepicker show={showDatePicker} setShow={setShowDatePicker} /> */}
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                value={datePicked}
                onChange={(e) => {
                  setDatePicked(e.target.value);
                  filterByDate(e.target.value);
                }}
              />
            </Dropdown>
            <span>|</span>
            <span>Archive</span>
          </div>
          <div className=""></div>
        </div>
      </nav>
    </>
  );
};

export default HeaderNav;
