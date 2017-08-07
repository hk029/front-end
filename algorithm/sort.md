
## 排序

|最差时间分析|	平均时间复杂度	|稳定度	|空间复杂度|
|---|---|---|---|
|冒泡排序|	O(n2)|	O(n2)|	稳定	|O(1)|
|快速排序|	O(n2)	|O(n*log2n)|	不稳定	|O(log2n)~O(n)|
|选择排序|	O(n2)|	O(n2)|	稳定|	O(1)|
|二叉树排序|	O(n2)|	O(n*log2n)	|不一顶	O(n)|
|插入排序| O(n2)|	O(n2)|	稳定|	O(1)|
|堆排序|	O(n\*log2n) |	O(n*log2n)|	不稳定|	O(1)|
|希尔排序	|O	O	不稳定	O(1)|

![](http://my.csdn.net/uploads/201207/19/1342700879_2982.jpg)
## 冒泡

```js
var arr = [1,2,4,2,1,5,7];

function swap(arr,i,j){
  var tmp = arr[j];
  arr[j] = arr[i];
  arr[i] = tmp;
}

for( let i = 0; i < arr.lenght-1; i++){
  for( let j = i+1; j < arr.lenght;j++){
    if(arr[i] > arr[j]){
      swap(arr,i,j);
    }
  }
}

```


### 快排

```js
var arr = [1,2,4,2,1,5,7];

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

```

