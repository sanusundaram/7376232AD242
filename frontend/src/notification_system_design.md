# Stage 1

## Notification System REST APIs
## 1. Get Notifications
### Endpoint
```http
GET /notifications
```

### Query Parameters

| Parameter | Description |
|---|---|
| page | Page number |
| limit | Number of notifications |
| notification_type | Filter by notification type |

### Headers

```json
{
  "Authorization": "Bearer token"
}
```

### Response

```json
{
  "notifications": [
    {
      "id": "1",
      "type": "Placement",
      "message": "AMD hiring drive",
      "timestamp": "2026-04-22 17:49:42",
      "isRead": false
    }
  ]
}
```

---

## 2. Get Priority Notifications

### Endpoint

```http
GET /notifications/priority
```

### Response

```json
{
  "notifications": []
}
```

---

## 3. Mark Notification As Read

### Endpoint

```http
PATCH /notifications/:id/read
```

### Response

```json
{
  "message": "Notification marked as read"
}
```

---

## 4. Create Notification

### Endpoint

```http
POST /notifications
```

### Request Body

```json
{
  "studentId": 101,
  "type": "Placement",
  "message": "Google hiring drive"
}
```

### Response

```json
{
  "message": "Notification created successfully"
}
```

---

## Real-Time Notification Mechanism

Socket.IO can be used for real-time notifications.  
Whenever a new notification is created, the backend pushes the notification instantly to connected users without refreshing the page.

# Stage 2

## Database Choice

I would use PostgreSQL database because:

- Structured data
- Easy filtering and sorting
- Supports indexing
- Good performance for large data

---

## Notifications Table

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    student_id INT,
    type VARCHAR(50),
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP
);
```

---

## Problems When Data Increases

As notifications grow:

- Queries become slow
- Filtering takes more time
- Sorting becomes slower
- Database load increases

---

## Solutions

To improve performance:

- Add indexes
- Use pagination
- Use caching
- Archive old notifications

---

## Example Queries

### Get Notifications

```sql
SELECT *
FROM notifications
WHERE student_id = 101
ORDER BY created_at DESC
LIMIT 10;
```

---

### Filter By Notification Type

```sql
SELECT *
FROM notifications
WHERE type = 'Placement';
```
# Stage 3

## Given Query

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

---

## Why Is It Slow?

The table contains millions of records.

Without indexes, the database checks all rows, which increases response time.

---

## Better Solution

Add a combined index:

```sql
CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt);
```

This improves filtering and sorting speed.

---

## Should We Add Indexes On Every Column?

No.

Too many indexes:

- Increase storage
- Slow down inserts and updates
- Increase maintenance cost

Indexes should only be added for frequently used queries.

---

## Query To Find Placement Notifications

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

# Stage 4

## Problem

Notifications are fetched every time the page loads.

This increases database load and slows the application.

---

## Solutions

### 1. Pagination

Load limited notifications per request.

Example:

```http
?page=1&limit=10
```

---

### 2. Caching

Store frequently used notifications in Redis cache.

This reduces database calls.

---

### 3. Lazy Loading

Load more notifications only when user scrolls.

---

### 4. Real-Time Notifications

Use Socket.IO to push new notifications instantly instead of repeatedly calling APIs.

---

## Tradeoff

Caching improves speed but cached data can become outdated for a short time.