import { useState } from 'react';

interface SelectCategory {
  name: string;
  color: string;
}

interface CategorySelectProps {
  categories: SelectCategory[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full flex justify-between items-center"
      >
        {selectedCategory ? selectedCategory : 'Select Category'}
      </button>

      {isOpen && (
        <div className="absolute bg-white border border-gray-300 rounded-md w-full mt-1 shadow-lg z-10 ">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCategory(category.name);
                setIsOpen(false);
              }}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
            >
              <span
                style={{
                  backgroundColor: category.color,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
              ></span>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
