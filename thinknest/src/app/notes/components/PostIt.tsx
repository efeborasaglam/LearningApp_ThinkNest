interface PostItProps {
  data: {
    id: number;
    title: string;
    color: string;
    topic: string;
    note: string;
  };
  onClick: () => void;
}

const PostIt: React.FC<PostItProps> = ({ data, onClick }) => {
  return (
    <div
      className="p-4 shadow-md rounded-md cursor-pointer dark:shadow-zinc-800"
      style={{
        backgroundColor: data.color,
        width: "170px",
        height: "50px",
      }}
      onClick={onClick}
    >
      <h4 className="font-bold dark:text-zinc-900">{data.title || "Ohne Titel"}</h4>
    </div>
  );
};

export default PostIt;