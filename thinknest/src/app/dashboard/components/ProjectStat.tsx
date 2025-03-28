import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectStat = () => {
  return (
    <div className="bg-white rounded-xl min-w-[35rem] relative  dark:bg-sky-950 transition-colors duration-300">
      <div className="px-8 py-8">
        <div className="flex justify-between text-semibold mb-4 text-lg">
          <p>Projects</p>
          <Image
            src="/assets/icons/lilmenu_icon.svg"
            alt="menu_icon"
            width={4}
            height={4}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-[#9A9A9A] font-semibold">Project</p>

        {/* Task List */}
        <div className="space-y-4 pt-6">
          {/* Task 1 */}
          <div className="border-[0.5px] border-[#F1F1F1] rounded-xl">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
                  <Image
                    src="/assets/icons/project_icon_active.svg"
                    alt="todo_icon"
                    width={12}
                    height={12}
                  />
                </div>
                <p className="text-xs font-medium">category</p>
              </div>
              <div className="w-36">
                <div className="bg-gray-200 rounded-full">
                  <div className="h-1 bg-green-500 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-8 bottom-8">
          <Link href="/projects">
            <button className="py-3 px-4 bg-black text-white text-xs font-medium rounded-lg">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectStat;
