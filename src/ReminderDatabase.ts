export class Reminder {
  constructor(
      public id: string,
      public message: string,
      public dueDate: Date,
      public completed: boolean = false
  ) {}
}

export class ReminderDatabase {
  private reminders: Map<string, Reminder> = new Map();

  createReminder(id: string, message: string, dueDate: Date): void {
    
      const localDueDate = new Date(dueDate.getTime() - dueDate.getTimezoneOffset() * 60000);
      this.reminders.set(id, new Reminder(id, message, localDueDate));
  }

  exists(id: string): boolean {
      return this.reminders.has(id);
  }

  markReminderAsCompleted(id: string): void {
      if (this.exists(id)) this.reminders.get(id)!.completed = true;
  }

  unmarkReminderAsCompleted(id: string): void {
      if (this.exists(id)) this.reminders.get(id)!.completed = false;
  }

  getAllReminders(): Reminder[] {
      return Array.from(this.reminders.values());
  }

  getReminder(id: string): Reminder | null {
      return this.reminders.get(id) || null;
  }

  getAllRemindersMarkedAsCompleted(): Reminder[] {
      return this.getAllReminders().filter(r => r.completed);
  }

  getAllRemindersNotMarkedAsCompleted(): Reminder[] {
      return this.getAllReminders().filter(r => !r.completed);
  }

  getAllRemindersDueByToday(): Reminder[] {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return this.getAllReminders().filter(r => r.dueDate >= today && r.dueDate < tomorrow);
  }

  updateReminder(id: string, message: string, dueDate: Date): void {
      if (this.exists(id)) {
          const reminder = this.reminders.get(id)!;
          
          reminder.message = message;
          reminder.dueDate = new Date(dueDate.getTime() - dueDate.getTimezoneOffset() * 60000);
      }
  }

  removeReminder(id: string): void {
      this.reminders.delete(id);
  }
}