export const calculateTotalDuration = (activities) => {
		let totalDurationInMs = 0;
	
		activities.forEach((activity) => {
			const startDate = new Date(activity.dateStart);
			const endDate = new Date(activity.dateEnd);
	
			const durationInMs = endDate.getTime() - startDate.getTime();
	
			totalDurationInMs += durationInMs;
		});
	
		const totalHours = Math.floor(totalDurationInMs / (60 * 60 * 1000));
		const totalMinutes = Math.floor(
			(totalDurationInMs % (60 * 60 * 1000)) / (60 * 1000)
		);
	
		return `${totalHours} jam ${totalMinutes} menit`;
	};
	