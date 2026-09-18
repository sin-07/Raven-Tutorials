export interface BatchSlot {
  batchId: string;
  courseTitle: string;
  facultyName: string;
  startTime: string;
  endTime: string;
  room: string;
}

export function isSlotConflicting(slotA: BatchSlot, slotB: BatchSlot): boolean {
  if (slotA.room !== slotB.room) return false;
  return slotA.startTime < slotB.endTime && slotB.startTime < slotA.endTime;
}
