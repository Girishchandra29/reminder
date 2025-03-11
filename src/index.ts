import { ReminderDatabase } from "./ReminderDatabase";

const db = new ReminderDatabase();


db.createReminder("1", "Buy groceries", new Date("2025-03-12T23:59:59"));
db.createReminder("2", "Doctor's appointment", new Date("2025-03-11T23:59:59"));
db.createReminder("3", "Submit assignment", new Date("2025-03-10T23:59:59"));


db.markReminderAsCompleted("1");
db.unmarkReminderAsCompleted("1");

db.updateReminder("2", "Dentist appointment", new Date("2025-03-13T23:59:59"));


db.removeReminder("3");


const formatReminders = (reminders: any[]) => {
    return reminders.map(r => ({
        id: r.id,
        message: r.message,
        dueDate: r.dueDate.toLocaleString(), // Convert to local time
        completed: r.completed
    }));
};

console.log("All Reminders:", formatReminders(db.getAllReminders()));
console.log("Completed Reminders:", formatReminders(db.getAllRemindersMarkedAsCompleted()));
console.log("Not Completed Reminders:", formatReminders(db.getAllRemindersNotMarkedAsCompleted()));
console.log("Due Today:", formatReminders(db.getAllRemindersDueByToday()));
console.log("Reminder with ID 2:", db.getReminder("2") ? {
    ...db.getReminder("2"),
    dueDate: db.getReminder("2")!.dueDate.toLocaleString()
} : null);
console.log("Does reminder 3 exist?", db.exists("3"));