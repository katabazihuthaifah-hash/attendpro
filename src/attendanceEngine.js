function calculateAttendance({
  clockIn,
  clockOut = null,
  scheduledStart,
  scheduledEnd,
  graceMinutes = 0
}) {
  const start = new Date(scheduledStart);
  const end = new Date(scheduledEnd);
  const inTime = new Date(clockIn);
  const outTime = clockOut ? new Date(clockOut) : null;

  if (Number.isNaN(start.getTime())) {
    throw new Error("Invalid scheduled start time");
  }

  if (Number.isNaN(end.getTime())) {
    throw new Error("Invalid scheduled end time");
  }

  if (Number.isNaN(inTime.getTime())) {
    throw new Error("Invalid clock-in time");
  }

  let lateMinutes = 0;

  const graceEnd = new Date(
    start.getTime() + Number(graceMinutes) * 60 * 1000
  );

  if (inTime > graceEnd) {
    lateMinutes = Math.floor(
      (inTime.getTime() - graceEnd.getTime()) / 60000
    );
  }

  let workedMinutes = 0;
  let overtimeMinutes = 0;

  if (outTime) {
    if (outTime < inTime) {
      throw new Error("Clock-out cannot be before clock-in");
    }

    workedMinutes = Math.floor(
      (outTime.getTime() - inTime.getTime()) / 60000
    );

    if (outTime > end) {
      overtimeMinutes = Math.floor(
        (outTime.getTime() - end.getTime()) / 60000
      );
    }
  }

  return {
    status: lateMinutes > 0 ? "late" : "present",
    late_minutes: lateMinutes,
    worked_minutes: workedMinutes,
    overtime_minutes: overtimeMinutes
  };
}

module.exports = {
  calculateAttendance
};
