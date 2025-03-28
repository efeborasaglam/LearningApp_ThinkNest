"use client";

import HeaderTitle from "@/components/HeaderTitle";
import { useState, useEffect } from "react";
import PostIt from "./components/PostIt";
import PostItToolbar from "./components/PostItToolbar";
import PostItEditor from "./components/PostItEditors"; 
import PostItDetailView from "./components/PostItDetailView"; // Neue Detailansicht
import { useAuth } from "@/lib/AuthContext";

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

export default function Notes() {
  const [postIts, setPostIts] = useState<PostItData[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPostIt, setSelectedPostIt] = useState<PostItData | null>(null);

  useEffect(() => {
    const savedPostIts = localStorage.getItem("postIts");
    if (savedPostIts) {
      setPostIts(JSON.parse(savedPostIts));
    }

    const savedCategories = localStorage.getItem("eventCategories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const savePostItsToStorage = (newPostIts: PostItData[]) => {
    setPostIts(newPostIts);
    localStorage.setItem("postIts", JSON.stringify(newPostIts));
  };

  const handleNewPostIt = () => {
    setSelectedPostIt({
      id: Date.now(),
      title: "",
      color: "yellow",
      topic: "",
      note: ""
    });
    setIsEditing(true);
  };

  const savePostIt = (postIt: PostItData) => {
    const updatedPostIts = postIts.some((p) => p.id === postIt.id)
      ? postIts.map((p) => (p.id === postIt.id ? postIt : p))
      : [...postIts, postIt];

    savePostItsToStorage(updatedPostIts);
    setIsEditing(false);
    setSelectedPostIt(null);
  };

  const deletePostIt = (id: number) => {
    savePostItsToStorage(postIts.filter((postIt) => postIt.id !== id));
    setIsEditing(false);
    setSelectedPostIt(null);
  };

  const groupedPostIts = postIts.reduce((acc, postIt) => {
    const category = postIt.topic || "Ohne Thema";
    if (!acc[category]) acc[category] = [];
    acc[category].push(postIt);
    return acc;
  }, {} as Record<string, PostItData[]>);

  const { user } = useAuth();

  if(!user) return null;

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <HeaderTitle title="Notes" />
      <div className="flex h-screen">
        {isEditing ? (
          <PostItEditor
            postIt={selectedPostIt!}
            categories={categories}
            onSave={savePostIt}
            onCancel={() => setIsEditing(false)}
            onStop={() => setSelectedPostIt(null)}
            onDelete={deletePostIt} 
          />
        ) : selectedPostIt ? (
          <PostItDetailView 
            postIt={selectedPostIt} 
            onEdit={() => setIsEditing(true)} 
            onClose={() => setSelectedPostIt(null)} 
          />
        ) : (
          <>
            <div className="w-1/4 bg-gray-100 p-4 dark:bg-gray-800">
              <PostItToolbar addPostIt={handleNewPostIt} />
            </div>
            <div className="flex-1 bg-gray-100 p-4 overflow dark:bg-gray-800">
              {Object.keys(groupedPostIts).map((category) => (
                <div key={category} className="mb-6">
                  <h2 className="font-bold mb-2">{category}</h2>
                  <div className="flex flex-wrap gap-3">
                    {groupedPostIts[category].map((postIt) => (
                      <PostIt
                        key={postIt.id}
                        data={postIt}
                        onClick={() => setSelectedPostIt(postIt)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}