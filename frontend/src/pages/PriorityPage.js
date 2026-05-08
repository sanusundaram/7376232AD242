import { useEffect, useState } from "react";
import {
  Container,
  Typography
} from "@mui/material";
import API from "../services/api";
import NotificationCard from "../components/NotificationCard";

function PriorityPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchPriorityNotifications();
  }, []);

  const fetchPriorityNotifications = async () => {
    const response = await API.get(
      "/notifications/priority"
    );
    setNotifications(response.data);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3 }}
      >
        Priority Notifications
      </Typography>

      {
        notifications.map((notification) => (

          <NotificationCard
            key={notification.id}
            notification={notification}
          />

        ))
      }

    </Container>
  );
}

export default PriorityPage;