const partition = (arr, start, end) => {
  const pivotValue = end;
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < arr[pivotValue]) {
      const temp = arr[i];
      arr[i] = arr[pivotIndex];
      arr[pivotIndex] = temp;
      pivotIndex++;
    }
  }

  const temp = arr[pivotIndex];
  arr[pivotIndex] = arr[pivotValue];
  arr[pivotValue] = temp;
  return pivotIndex;
};

const quickSort = (arr, start, end) => {
  if (start >= end) return;

  const index = partition(arr, start, end);

  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
  return arr;
};

export default quickSort;
