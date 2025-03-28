import React from "react";
import Image from "next/image";

type DashboardStatsProps = {
  value: string;
  iconPath: string;
  label: string;
};

const DashboardStats: React.FC<DashboardStatsProps>  = ({ value, iconPath, label }) => {
  return (
    <div className="bg-white rounded-xl min-w-[16rem] mx-7  dark:bg-sky-950 transition-colors duration-300">
      <div className="px-4 py-3">
        <div className="flex justify-between text-md">
          <p>{label}</p>
          <Image
            src="/assets/icons/lilmenu_icon.svg"
            alt="menu_icon"
            width={3}
            height={3}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between mt-5">
          <p className="font-bold text-xl">{value}</p>
          <div className="bg-[#28AD5E] bg-opacity-10 rounded-2xl p-4 flex items-center justify-center">
            <Image
              src={iconPath}
              alt={`${label}_icon`}
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
