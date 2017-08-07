
var arr = [1,2,4,2,1,5,7];

function swap(arr,i,j){
  var tmp = arr[j];
  arr[j] = arr[i];
  arr[i] = tmp;
}

// var quickSort = function (arr,from,end) {
//   if(end-from <= 1){
//     return;
//   }
//   let lo = from;
//   let i = from;
//   let j = end;
//   while(true){
//     while(arr[++i] < arr[lo] && i < end);
//     if(i === end) break;
//     while(arr[--j] > arr[lo]);
//     if(i>j){
//       break;
//     }
//     swap(arr,i,j);
//   }
//   swap(arr,j,lo);
//   quickSort(arr,from,lo);
//   quickSort(arr,lo,end);
// }

// quickSort(arr,0,arr.length-1);



function quickSort(arr) {
    if(arr.length<=1) {
        return arr;
    }
    let leftArr = [];
    let rightArr = [];
    let q = arr[0];
    for(let i = 1,l=arr.length; i<l; i++) {
        if(arr[i]>q) {
            rightArr.push(arr[i]);
        }else{
            leftArr.push(arr[i]);
        }
    }
    return [].concat(quickSort(leftArr),[q],quickSort(rightArr));
}


console.log(quickSort(arr));