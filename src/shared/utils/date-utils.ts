export const compareConferenceDates = (
  firstElement: number,
  secondElement: number
) => {
  const firstDateOverdue = new Date().getTime() > firstElement;
  const secondDateOverdue = new Date().getTime() > secondElement;

  if ((firstDateOverdue && !secondDateOverdue) || !firstElement) {
    return 1;
  } else if ((!firstDateOverdue && secondDateOverdue) || !secondElement) {
    return -1;
  } else {
    return firstElement - secondElement;
  }
};
