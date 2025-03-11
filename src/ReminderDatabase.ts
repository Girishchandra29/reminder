type Reminder = {
    id: string;
    title: string;
    description?: string;
    dueDate?: string; 
  };
  
  class ReminderDatabase {
    private reminders: Map<string, Reminder>;
  
    constructor() {
      this.reminders = new Map<string, Reminder>();
    }
  
    createReminder(id: string, title: string, description?: string, dueDate?: Date): void {
      if (this.reminders.has(id)) {
        throw new Error("Reminder with this ID already exists.");
      }
      this.reminders.set(id, { id, title, description, dueDate: dueDate ? dueDate.toISOString() : undefined });
    }
  
    exists(id: string): boolean {
      return this.reminders.has(id);
    }
  
    getAllReminders(): Reminder[] {
      return Array.from(this.reminders.values()).map(reminder => ({
        ...reminder,
        dueDate: reminder.dueDate ? new Date(reminder.dueDate).toLocaleString() : undefined
      }));
    }
  
    getReminder(id: string): Reminder | null {
      const reminder = this.reminders.get(id);
      if (!reminder) return null;
      return {
        ...reminder,
        dueDate: reminder.dueDate ? new Date(reminder.dueDate).toLocaleString() : undefined
      };
    }
  
    removeReminder(id: string): boolean {
      return this.reminders.delete(id);
    }
  
    updateReminder(id: string, title?: string, description?: string, dueDate?: Date): boolean {
      if (!this.reminders.has(id)) {
        return false;
      }
      const existingReminder = this.reminders.get(id)!;
      this.reminders.set(id, {
        id,
        title: title ?? existingReminder.title,
        description: description ?? existingReminder.description,
        dueDate: dueDate ? dueDate.toISOString() : existingReminder.dueDate,
      });
      return true;
    }
  }
  
  export default ReminderDatabase;
  