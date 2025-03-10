
  import ReminderDatabase from "./ReminderDatabase";
  
  const db = new ReminderDatabase();
  
  console.log("Adding reminders...");
  db.createReminder("1", "Buy groceries", "Milk, eggs, and bread", new Date("2025-03-15"));
  db.createReminder("2", "Doctor appointment", "Routine check-up", new Date("2025-03-20"));
  
  console.log("\nAll Reminders:", db.getAllReminders());
  
  console.log("\nChecking if Reminder 1 exists:", db.exists("1"));
  
  console.log("\nFetching Reminder 1:", db.getReminder("1"));
  
  console.log("\nUpdating Reminder 1...");
  db.updateReminder("1", "Buy more groceries", "Milk, eggs, bread, and fruits");
  console.log("Updated Reminder 1:", db.getReminder("1"));
  
  console.log("\nDeleting Reminder 2...");
  db.removeReminder("2");
  console.log("All Reminders after deletion:", db.getAllReminders());