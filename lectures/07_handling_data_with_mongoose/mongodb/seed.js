// MongoDB Sample Data
//
// Usage:
// ```
// mongo> load("./seed.js");
// ```


var db = db.getSiblingDB('nodecamp');
db.dropDatabase();


var users = [
  {
    name: "Suchan An",
    email: "dobestan@gmail.com",
    phonenumber: "01022205736",
  },
  {
    name: "Suchan An #2",
    email: "dobestan@gmail.com",
    phonenumber: "01022205736",
  },
  {
    name: "Suchan An #3",
    email: "dobestan@gmail.com",
    phonenumber: "01022205736",
  },
];

db.users.insert(users);

var user = db.users.findOne({name: "Suchan An"});


var posts = [
  {
    author: user._id,
    title: "Jupyterhub를 이용하여 Jupyter Notebook 실습 환경 구축하기",
    content: "최근에 패스트캠퍼스와 함께 몇몇 강의들을 진행해오고 있습니다. 데이터 사이언스 스쿨 과 업무 자동화를 위한 파이썬 입문 CAMP 의 경우에는 주로 IPython Notebook 을 이용해서 실습을 진행하게 되는데, 수강생 모두 동일한 개발 환경을 갖추도록 하는 것이 큰 문제였습니다. 이러한 문제를 여러 유저가 함께 사용가능한 Jupyterhub를 이용하여 해결하였습니다. 본 프로젝트는 다음의 목표를 가지고 진행되었습니다"
  },
  {
    author: user._id,
    title: "효과적인 실험을 수행하기 위한 7가지 습관",
    content: "본 포스트는 #매일번역 시리즈 의 세번째 글입니다. #매일번역 이라는 이름으로 일주일간 번역을 하게 된 이유는 2015년의 정리 - #매일번역을 일주일간 시작합니다."
  }
];

db.posts.insert(posts);
