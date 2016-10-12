Node.js Programming
---


```
$ git clone https://github.com/dobestan/nodejs-101.git
$ git pull origin master   # 원격 저장소의 파일 불러오기
```


# passport + passport-local, passport-facebook, passport-jwt

---

# passport

- 쿠키, 세션 + => 어떤 값을 session 에 저장할 것인가?
- 우리가 원하는 특정 값 ( serializer, deserializer )

---

# passport-local, passport-facebook







# OAuth2.0 ( Authentication O, Authorization O )
    - "친구 목록을 볼 수 있습니다.", "프로필 사진 정보를 가져갑니다." ( Yes / No )
    - OAuth2 Service Provider ~~~ Consumer


    Comsumer                                 Provider

   // 1. 페이스북 로그인 페이지로 이동하는 Router
    링크(페이스북 로그인 페이지) ----->   누가? ( Facebook application )
                                          권한(프로필 이미지 보기, 이메일 정보 가져가기)
                                            Authorize(친구목록)
     access_token, refresh_token, profile     <--------
     token => 아무런의미가 X ( 페이스북 입장에서 저장하고 있는 값 )
            
            1. API 를 사용하는 관점 ( API Client )
            2. API 를 만드는 관점 ( JWT Auth API Server )

     // 2. 정보가 들어왔을때 처리하는 Router
     URL(callback url) 
     profile => DB( )

     -------------------------------------------------------------------------------
     login --------------------------------> OK
           <--------------------------------



    POST /api/auth {username: "---", password: "---"}
        -> JWT Token

    GET /api/verify/  {token: JWT Token} => Verify O, Data O
    GET /api/secret/ 













