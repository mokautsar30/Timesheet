import React, { useEffect, useState } from "react";
import DropdownWithAdd from "../ui/Dropdown";
import {
  addActivities,
  getProjects,
  getActivities,
  addProject,
} from "../../services/api";
import Swal from 'sweetalert2';

const CreateActivity = ({ onClose, onActivityAdded }) => {
  const [formData, setFormData] = useState({
    dateStart: "",
    dateEnd: "",
    timeStart: "",
    timeEnd: "",
    activityName: "",
    projectId: "",
    totalPrice: 0,
  });

  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjectOptions(
          data.map((project) => ({
            value: project.id,
            label: project.projectName,
          }))
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = async (newProject) => {
    try {
      const { data } = await addProject({ projectName: newProject.label });
      const newOption = { value: data.id, label: data.projectName };
      setProjectOptions([...projectOptions, newOption]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectId: newOption.value,
      }));
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleProjectSelect = (projectId) => {
    setFormData({ ...formData, projectId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.projectId) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please select a project.',
      });
      return;
    }
    try {
      const { data } = await addActivities(formData);
      onActivityAdded(data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Activity added successfully!',
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error adding activity!',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Mulai
            </label>
            <input
              type="date"
              name="dateStart"
              value={formData.dateStart}
              onChange={handleChange}
              placeholder=""
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Berakhir
            </label>
            <input
              type="date"
              name="dateEnd"
              value={formData.dateEnd}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Waktu Mulai
            </label>
            <input
              type="time"
              name="timeStart"
              value={formData.timeStart}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Waktu Berakhir
            </label>
            <input
              type="time"
              name="timeEnd"
              value={formData.timeEnd}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Judul Kegiatan
          </label>
          <input
            type="text"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Proyek
          </label>
          <DropdownWithAdd
            options={projectOptions}
            onAdd={handleAddProject}
            onSelect={handleProjectSelect}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-3 bg-customRed text-white rounded-md hover:bg-red-600"
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateActivity;
