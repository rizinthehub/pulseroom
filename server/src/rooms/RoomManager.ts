import { Room } from './Room';

export class RoomManager {
  private rooms = new Map<string, Room>();

  get(code: string): Room | undefined {
    return this.rooms.get(code);
  }

  getOrCreate(code: string): Room {
    let room = this.rooms.get(code);
    if (!room) {
      room = new Room(code);
      this.rooms.set(code, room);
    }
    return room;
  }

  delete(code: string): void {
    const room = this.rooms.get(code);
    if (room) {
      room.shutdown();
      this.rooms.delete(code);
    }
  }

  all(): IterableIterator<Room> {
    return this.rooms.values();
  }

  size(): number {
    return this.rooms.size;
  }
}