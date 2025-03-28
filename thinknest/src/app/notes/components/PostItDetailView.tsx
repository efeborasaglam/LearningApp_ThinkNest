interface PostItDetailViewProps {
    postIt: {
      id: number;
      title: string;
      color: string;
      topic: string;
      note: string;
    };
    onEdit: () => void;
    onClose: () => void;
  }
  
  const PostItDetailView: React.FC<PostItDetailViewProps> = ({ postIt, onEdit, onClose }) => {
    return (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-zinc-800 p-10 rounded-lg shadow-lg w-full max-w-5xl h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-4xl font-bold mb-4 text-center dark:text-white">
            {postIt.title || "Ohne Titel"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-4">
            {postIt.topic ? `Thema: ${postIt.topic}` : "Ohne Thema"}
          </p>
          
          <div className="flex-1 overflow-auto p-4 border rounded bg-gray-100 dark:bg-zinc-700 dark:border-zinc-600 text-lg dark:text-white">
            {postIt.note || "Keine Notiz vorhanden."}
          </div>
  
          <div className="flex justify-between mt-6">
            <button 
              className="px-6 py-3 bg-gray-500 text-white rounded-lg text-lg hover:bg-gray-600" 
              onClick={onClose}
            >
              Schließen
            </button>
            <button 
              className="px-6 py-3 bg-black dark:bg-zinc-700 text-white rounded-lg text-lg hover:bg-[#28AD5E]" 
              onClick={onEdit}
            >
              Bearbeiten
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PostItDetailView;