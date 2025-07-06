User {
id: UUID
first_name: text
last_name: text
email: text
role: ROLE
}

Room {
id: UUID
name: text
location: text
capacity: integer
features: text
}

Booking {
id: UUID
user_id: UUID (REF)
room_id: UUID (REF)
start_time: Date
end_time: Date
purpose: text
}
