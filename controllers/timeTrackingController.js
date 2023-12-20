import db from "../db.js";

const { Category, TimeTracking } = db.models;
const { Op } = db.Sequelize;

export default class TimeTrackingController {
    // Create a new time tracking entry
    async createTimeTracking(req, res) {
        try {
            const newTimeTracking = await TimeTracking.create(req.body);
            res.status(201).json(newTimeTracking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all time tracking entries
    async getTimeTrackings(req, res) {
        try {
            const timeTrackings = await TimeTracking.findAll();
            res.json(timeTrackings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a specific time tracking entry by ID
    async getTimeTrackingById(req, res) {
        try {
            const timeTracking = await TimeTracking.findByPk(req.params.id);
            if (timeTracking) {
                res.json(timeTracking);
            } else {
                res.status(404).json({ error: 'Time tracking entry not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get time tracking data
    async getCategoryTimeData(req, res) {
        try {
            const timeTrackings = await TimeTracking.findAll({
                include: [Category],
                where: {
                    dateStop: { [Op.ne]: null }  // Only consider records where dateStop is not null
                }
            });
    
            console.log("Fetched Time Tracking Data:", timeTrackings);  // Log fetched data
    
            let totalDuration = 0;
            const totalTimePerCategory = {};
    
            // Aggregate and calculate time per category
            timeTrackings.forEach(tracking => {
                const duration = new Date(tracking.dateStop) - new Date(tracking.dateStart);
                console.log(`Duration for tracking ID ${tracking.id}:`, duration);  // Log each duration
    
                totalDuration += duration;
    
                const categoryName = tracking.Category.name;
                if (totalTimePerCategory[categoryName]) {
                    totalTimePerCategory[categoryName] += duration;
                } else {
                    totalTimePerCategory[categoryName] = duration;
                }
            });
    
            console.log("Total Time Per Category:", totalTimePerCategory);  // Log aggregated totals per category
            console.log("Total Duration:", totalDuration);  // Log total duration
    
            // Convert to array and calculate percentages
            const dataForChart = Object.entries(totalTimePerCategory).map(([categoryName, time]) => ({
                categoryName,
                time,
                percentage: ((time / totalDuration) * 100).toFixed(2)  // Rounded to two decimal places
            }));
    
            console.log("Data for Chart:", dataForChart);  // Log final data for chart
    
            res.json(dataForChart);
        } catch (error) {
            console.error("Error in getCategoryTimeData:", error);
            res.status(500).json({ error: error.message });
        }
    }
    
    
    

    // Update a time tracking entry
    async updateTimeTracking(req, res) {
        try {
            const updatedTimeTracking = await TimeTracking.update(req.body, {
                where: { id: req.params.id }
            });
            if (updatedTimeTracking) {
                res.json(updatedTimeTracking);
            } else {
                res.status(404).json({ error: 'Time tracking entry not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update a time tracking entry based on Task Id
    async updateTimeTrackingByTask(req, res) {
        try {
            // Update time tracking entry where taskId matches
            const updatedTimeTracking = await TimeTracking.update(req.body, {
                where: { taskId: req.params.taskId }
            });
    
            if (updatedTimeTracking[0] > 0) { // Sequelize update returns an array where the first element is the number of rows affected
                const updatedEntry = await TimeTracking.findOne({ where: { taskId: req.params.taskId } });
                res.json(updatedEntry);
            } else {
                res.status(404).json({ error: 'Time tracking entry not found for the provided taskId' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a time tracking entry
    async deleteTimeTracking(req, res) {
        try {
            const timeTrackingToDelete = await TimeTracking.destroy({
                where: { id: req.params.id }
            });
            if (timeTrackingToDelete) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Time tracking entry not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
