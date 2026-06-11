export class RingBuffer<T> {
  private buffer: T[];
  private head = 0;
  private _size = 0;

  constructor(private capacity: number) {
    this.buffer = new Array(capacity);
  }

  push(item: T): void {
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.capacity;
    if (this._size < this.capacity) this._size++;
  }

  toArray(): T[] {
    if (this._size === 0) return [];
    const start = this._size < this.capacity ? 0 : this.head;
    const result: T[] = [];
    for (let i = 0; i < this._size; i++) {
            const item = this.buffer[(start + i) % this.capacity];
      if (item !== undefined) result.push(item);
    }
    return result;
  }

  get size(): number {
    return this._size;
  }

  replace(items: T[]): void {
    this.buffer = new Array(this.capacity);
    this.head = 0;
    this._size = 0;
    for (const item of items) {
      this.push(item);
    }
  }
}