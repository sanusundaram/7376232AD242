const notifications = require("../data/notifications");
const getNotifications = (req, res) => {
  try {
    const type = req.query.type;
    if (!type) {
      return res.json(notifications);
    }
    const filteredNotifications = notifications.filter(
      (notification) =>
        notification.type === type
    );
    res.json(filteredNotifications);
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};
const getPriorityNotifications = (req, res) => {
  try {
    const priorityMap = {
      Placement: 3,
      Result: 2,
      Event: 1
    };
    const sortedNotifications = [...notifications];
    sortedNotifications.sort((a, b) => {
      const priorityDifference =
        priorityMap[b.type] - priorityMap[a.type];
      if (priorityDifference === 0) {
        return (
          new Date(b.timestamp) -
          new Date(a.timestamp)
        );
      }
      return priorityDifference;
    });
    res.status(200).json(
      sortedNotifications.slice(0, 10)
    );
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};
module.exports = {
  getNotifications,
  getPriorityNotifications
};