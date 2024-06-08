export const transformData = (
  activities,
  projects,
  searchText,
  projectFilter
) => {
  const projectMap = projects.reduce((map, project) => {
    map[project.id] = project.projectName;
    return map;
  }, {});

  return activities
    .map((activity, index) => ({
      displayId: index + 1,
      id: activity.id,
      activity: activity.activityName || "",
      project: projectMap[activity.projectId] || "",
      startDate: new Date(activity.dateStart).toLocaleDateString(),
      endDate: new Date(activity.dateEnd).toLocaleDateString(),
      startTime: activity.timeStart,
      endTime: activity.timeEnd,
      duration: calculateDuration(
        activity.dateStart,
        activity.timeStart,
        activity.dateEnd,
        activity.timeEnd
      ),
    }))
    .filter(
      (row) =>
        (row.activity.toLowerCase().includes(searchText.toLowerCase()) ||
          row.project.toLowerCase().includes(searchText.toLowerCase())) &&
        (projectFilter === "" || row.project === projectFilter)
    );
};

const calculateDuration = (startDate, startTime, endDate, endTime) => {
  const [startHours, startMinutes, startSeconds] = startTime.split(":");
  const startDateTime = new Date(startDate);
  startDateTime.setHours(startHours, startMinutes, startSeconds || 0);

  const [endHours, endMinutes, endSeconds] = endTime.split(":");
  const endDateTime = new Date(endDate);
  endDateTime.setHours(endHours, endMinutes, endSeconds || 0);

  if (isNaN(startDateTime) || isNaN(endDateTime)) {
    return "Invalid Date";
  }

  const durationInMs = endDateTime - startDateTime;
  const durationInHours = durationInMs / (1000 * 60 * 60);

  const days = Math.floor(durationInHours / 24);
  const remainingHours = durationInHours % 24;
  const hours = Math.floor(remainingHours);
  const minutes = Math.round((remainingHours - hours) * 60);

  if (days > 0) {
    return `${days} hari ${hours} jam ${minutes} menit`;
  } else {
    return `${hours} jam ${minutes} menit`;
  }
};
