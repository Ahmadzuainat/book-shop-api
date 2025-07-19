function sumArray(array) {
  
  if (!Array.isArray(array) || array.length <= 2) return 0;

  if (array.length <= 2) return 0;
  
  let max = Math.max(...array);
  let min = Math.min(...array);

  let indexOfMax = array.indexOf(max);
  let indexOfMin = array.indexOf(min);

    array.splice(indexOfMax, 1);
    array.splice(indexOfMin, 1);

  let sum = array.reduce((acc, element) => acc + element, 0);
  return sum;
}
