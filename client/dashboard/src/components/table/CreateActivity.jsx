import React, { useState } from "react";
import Dropdown from "../ui/Dropdown";
import DropdownWithAdd from "../ui/Dropdown";

const CreateActivity = () => {
  const [projectOptions, setProjectOptions] = useState([
    { value: "1", label: "ui ux" },
    { value: "2", label: "dev" },
    { value: "3", label: "qa" },
    { value: "4", label: "design" },
  ]);

  const handleAddProject = (newProject) => {
    setProjectOptions([
      ...projectOptions,
      { value: newProject, label: newProject },
    ]);
  };

  return (
    <>
      <form>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Mulai
            </label>
            <input
              type="date"
              placeholder=""
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Berakhir
            </label>
            <input type="date" className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Waktu Mulai
            </label>
            <input type="time" className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Waktu Berakhir
            </label>
            <input type="time" className="mt-1 p-2 w-full border rounded-md" />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Judul Kegiatan
          </label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Proyek
          </label>
          <DropdownWithAdd options={projectOptions} onAdd={handleAddProject} />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-3 bg-customRed text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateActivity;
