export const ChengHandler = (e,set) => {
  set((data) => ({
    ...data,
    [e.target.name]: e.target.value,
  }));
};
export const sp = (number) => {
  const seperatedNumber = number
    ?.toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join(",");
  return joinedNumber;
};