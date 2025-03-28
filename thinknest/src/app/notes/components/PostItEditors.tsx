import { useState } from "react";

interface PostItData {
  id: number;
  title: string;
  color: string;
  topic: string;
  note: string;
}

interface EventCategory {
  name: string;
  color: string;
}

interface PostItEditorProps {
  postIt: PostItData;
  categories: EventCategory[];
  onSave: (postIt: PostItData) => void;
  onCancel: () => void;
  onStop: () => void;
  onDelete: (id: number) => void;
}

const PostItEditor: React.FC<PostItEditorProps> = ({
  postIt,
  categories,
  onSave,
  onCancel,
  onStop,
  onDelete
}) => {
  const [formData, setFormData] = useState<PostItData>({
    id: postIt.id,
    title: postIt.title || "",
    color: postIt.color || "yellow",
    topic: postIt.topic || "",
    note: postIt.note || ""
  });

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onStop} // Schließen, wenn außerhalb des Fensters geklickt wird
    >
      <div
        className="bg-white dark:bg-zinc-800 p-10 rounded-lg shadow-lg w-full max-w-5xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Verhindert das Schließen beim Klicken innerhalb des Fensters
      >
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Notiz bearbeiten</h2>
        <input
          type="text"
          className="w-full p-3 border rounded mb-4 text-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
          placeholder="Titel..."
          onChange={(e) => setFormData(prev => ({
            ...prev,
            title: e.target.value
          }))}
          value={formData.title}
        />
        
        <select
          className="w-full p-3 border rounded mb-4 text-lg dark:bg-sky-950 dark:text-white dark:gray-800"
          value={formData.topic}
          onChange={(e) => {
            const newTopic = e.target.value;
            const newColor = categories.find((c) => c.name === newTopic)?.color || "yellow";
            setFormData({ ...formData, topic: newTopic, color: newColor });
          }}
        >
          <option value="">Ohne Thema</option>
          {categories.map((topic) => (
            <option key={topic.name} value={topic.name}>
              {topic.name}
            </option>
          ))}
        </select>

        <textarea
          className="w-full p-3 border rounded mb-4 h-60 text-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder="Notiz..."
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />

        <div className="flex justify-between">
          <button className="px-6 py-2 bg-gray-500 text-white rounded text-lg hover:bg-gray-600" onClick={onCancel}>
            Abbrechen
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded text-lg hover:bg-red-700" onClick={() => postIt?.id && onDelete(postIt.id)}>
            Löschen
          </button>
          <button className="px-6 py-2 bg-black dark:bg-gray-700 text-white rounded text-lg hover:bg-[#28AD5E]" onClick={() => onSave(formData)}>
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItEditor;