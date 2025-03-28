import React from "react";

interface PostItToolbarProps {
  addPostIt: () => void;
}

const PostItToolbar: React.FC<PostItToolbarProps> = ({ addPostIt }) => {
  return (
    <div className="space-y-4">
      <button
        className="px-4 py-2 text-white bg-black rounded shadow hover:bg-[#28AD5E]"
        onClick={addPostIt}
      >
        Neue Notizen
      </button>
    </div>
  );
};

export default PostItToolbar;