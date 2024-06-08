import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdAdd } from "react-icons/md";

const DropdownWithAdd = ({ options, onAdd, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [newProject, setNewProject] = useState("");

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAddProject = () => {
    if (newProject.trim() !== "") {
      const newOption = { value: newProject, label: newProject };
      onAdd(newOption);
      setSelectedOption(newOption.label);
      onSelect(newOption.value);
      setNewProject("");
      setIsOpen(false);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option.label);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center p-2 border rounded-lg text-sm cursor-pointer"
        onClick={handleToggleDropdown}
      >
        <span className="flex-grow">{selectedOption || "Pilih Proyek"}</span>
        <RiArrowDropDownLine size={24} />
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          <div className="flex items-center p-4 border-b">
            <input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="Tambah Proyek"
              className="flex-grow px-2 py-2 border rounded-md text-sm"
            />
            <button
              onClick={handleAddProject}
              className="ml-2 p-2 bg-customRed text-white rounded-md hover:bg-blue-600"
            >
              <MdAdd size={20} />
            </button>
          </div>
          {options.map((option) => (
            <div
              key={option.value}
              className="p-4 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithAdd;
