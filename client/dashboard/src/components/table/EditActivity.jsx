import React, { useEffect, useState } from "react";
import DropdownWithAdd from "../ui/Dropdown";
import {
  addActivities,
  getProjects,
  getActivities,
  addProject,
  updateActivity,
} from "../../services/api";

const EditActivity = ({ activity, onClose }) => {
  const [formData, setFormData] = useState({
    id: activity.id,
    dateStart: activity.startDate,
    dateEnd: activity.endDate,
    timeStart: activity.startTime,
    timeEnd: activity.endTime,
    activityName: activity.activity,
    projectId: activity.projectId,
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
    console.log("EditActivity component mounted");
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
    try {
      await updateActivity(formData.id, formData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating activity:", error);
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
            className="w-full p-3 bg-customRed text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
};

export default EditActivity;
