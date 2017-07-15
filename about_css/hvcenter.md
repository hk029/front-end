
## 知道大小？

直接使用`top,left`:50%，然后margin偏移一下就行

```css
.child {
  width: 300px;
  height: 100px;
  padding: 20px;

  position: absolute;
  top: 50%;
  left: 50%;

  margin: -70px 0 0 -170px;
}
```

## 不知道大小

### css3-transform

设置 position:relative/absolute 和 left:50%：利用 相对定位 的方式，将元素向左偏移 50% （此时50%是自身长宽），即达到居中的目的，然后通过transform的位移translate**这个移动端用的比较多因为css3兼容好**

```css
div{
           position:absolute/relative;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            background:red; 
}
```

### 多套一层，相对+绝对定位

兼容性较好，基本都兼容

```html
<div class="outer">
    <div class="inner">
         
    </div>
</div>
```

```css3
.outer{
   position:absolute/relative;
   top:50%;
   left:50%;
}
.inner{
  position:absolute;
  margin-left:-50%;
  margin-top:-50%;
}
```

## 能用flex

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```


## 参考文章
[https://css-tricks.com/centering-css-complete-guide/](https://css-tricks.com/centering-css-complete-guide/)