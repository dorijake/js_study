https://velopert.com/2597



###Packages
___________
**axios** : Ajax 기능을 위한 라이브러리
>yarn add axios
>src/services에서 Ajax API 구현

**semantic-ui-react** : CCS 프레임워크, Jquery를 사용하지 않는 CSS 프레임워크. 
>yarn add semantic-ui-react semantic-ui-css

**promise-polyfill** : Promise를 지원하지 않는 구브라우저에서 Promise를 사용할 수 있게 한다. axios에서 Promise를 사용하기 때문에 polyfill을 적용해야 한다.



###Tools
________
**Fake API**
>프론트엔드에 집중하기 위해서 JSONPlceholder라는 Fake API를 사용한다. https://jsonplaceholder.typicode.com/

>"/posts/:id", "/post/:id/comments" API 사용 ex) "https://jsonplaceholder.typicode.com/posts/3/comments"

**surge**
>무료로 프로젝트를 퍼블리시할 수 있다.
>/build 경로 내에서 surge명령어를 사용한 뒤, 간단한 입력만 하면 된다.

**anicollection**
>다양한 애니메이션 css를 가져다 쓸 수 있다. 
>http://anicollection.github.io/#/



###컴포넌트 구조
_______________
App

└Header
└PostContainer  
  └PostWrapper  
    └Navigator  
  └Post  
    └CommentList  
      └Comment  
  └Warning  



