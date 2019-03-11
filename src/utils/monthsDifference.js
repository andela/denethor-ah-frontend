export const monthDifference = (createdAt) => {
  let numberOfMonths;
  let date1 = new Date(createdAt.split('T')[0]);
  let date2 = new Date()
  numberOfMonths= (date2.getFullYear() - date1.getFullYear()) * 12;
  numberOfMonths-= date1.getMonth() + 1;
  numberOfMonths+= date2.getMonth(); 
  return numberOfMonths <= 0 ? 0 : numberOfMonths;
}