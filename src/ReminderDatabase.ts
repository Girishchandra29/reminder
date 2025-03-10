type Reminder = {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
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
      this.reminders.set(id, { id, title, description, dueDate });
    }
  
    exists(id: string): boolean {
      return this.reminders.has(id);
    }
  
    getAllReminders(): Reminder[] {
      return Array.from(this.reminders.values());
    }
  
    getReminder(id: string): Reminder | null {
      return this.reminders.get(id) || null;
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
        dueDate: dueDate ?? existingReminder.dueDate,
      });
      return true;
    }
  }
  
  export default ReminderDatabase;
