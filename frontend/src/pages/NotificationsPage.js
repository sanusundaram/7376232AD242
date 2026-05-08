import { useEffect, useState } from "react";
import {
  Container,
  Typography
} from "@mui/material";
import API from "../services/api";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  useEffect(() => {

    fetchNotifications();
    
  }, [type]);

  const fetchNotifications = async () => {
  try {
    let url = "/notifications";
    if (type) {
      url += `?type=${type}`;
    }
    const response = await API.get(url);
    setNotifications(response.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3 }}
      >
        Notifications
      </Typography>
      <FilterBar
        type={type}
        setType={setType}
      />
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

export default NotificationsPage;