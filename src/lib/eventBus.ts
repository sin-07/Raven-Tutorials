type EventCallback = (...args: unknown[]) => void;

class EventBus {
  private events = new Map<string, Set<EventCallback>>();

  on(event: string, callback: EventCallback): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(callback);
    return () => this.off(event, callback);
  }

  off(event: string, callback: EventCallback): void {
    this.events.get(event)?.delete(callback);
  }

  emit(event: string, ...args: unknown[]): void {
    this.events.get(event)?.forEach(cb => {
      try {
        cb(...args);
      } catch (err) {
        console.error('EventBus handler error:', err);
      }
    });
  }
}

export const eventBus = new EventBus();
