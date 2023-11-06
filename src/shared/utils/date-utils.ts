export const compareConferenceDates = (
  firstElement: Date,
  secondElement: Date
) => {
  const firstElementTime = firstElement.getTime();
  const secondElementTime = secondElement.getTime();
  const firstDateOverdue = new Date().getTime() > firstElementTime;
  const secondDateOverdue = new Date().getTime() > secondElementTime;

  if ((firstDateOverdue && !secondDateOverdue) || !firstElement) {
    return 1;
  } else if ((!firstDateOverdue && secondDateOverdue) || !secondElement) {
    return -1;
  } else {
    return firstElementTime - secondElementTime;
  }
};
