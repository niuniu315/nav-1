const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)   //字符串变成对象

const hashMap = xObject || [
    { logo:'A', url:'https://www.acfun.cn'},
    { logo:'B', url:'https://www.bilibili.com'}   
]
const removeX = (url) =>{
  return url.replace('https://','')
  .replace('http://','')
  .replace('www.','')
  .replace('.com','')
  .replace('.cn','') 
  .replace(/\/.*/,'')       //删除 /开头的内容
}
const render = () =>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
          <div class="site">
            <div class="logo">${node.logo}</div>         
            <div class="link">${removeX(node.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>   
      </li>`).insertBefore($lastLi)
      $li.on('click',()=>{
        window.open(node.url)
      })
      $li.on('click','.close',(e) =>{
        console.log('这里')
          e.stopPropagation()   //阻止冒泡
          hashMap.splice(index,1)  //删除一个此网站
          render()
      })
    })
}
render()

$(".addButton").on("click", () => {
 let url = window.prompt("请问你要添加的网址是啥？");
    if(url.indexOf('http')!== 0){
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: removeX(url)[0].toUpperCase(),   //toUpperCase将字母变成大写    
        url: url
    })
    render()
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap) //把对象变成字符串
    localStorage.setItem('x',string)
}
$(document).on('keypress', (e) => {
  const {key} = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {   //toLowerCase把字母变成小写
      window.open(hashMap[i].url)
    }
  }
})                           //鼠标监听事件： 如果我的key===hashMap的第一个字符，则打开相应的网址