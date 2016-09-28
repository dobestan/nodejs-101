





node.js
    - http.createServer
    - router, renderer
    - zigbang, csv, ...

express
    - router + middleware
    - renderer - template engine ( `pug` ): Controller => View context
    - database ( models ): MongoDB + ODM(Object Data Mapping) mongoose => Model => 기능+++ ( 좋은 설계 )
    - RESTful API
        - Resource 의 위치 + 상태(행동)
        - API Endpoint (URL) + HTTP Method ( GET, POST, PATCH, DELETE )
        - STATUS CODE
            - 200 OK
            - 201 CREATED
            - 204 NO CONTENT

    - User
        - Authentication
            - 1. local authentication ( username, password )
                - password => hash(bcrypt)
            - 2. OAuth2 ( Authorization )
                - Facebook Login
                - AccessToken ===> User information ===> User
                    - Consumer
                    - Facebook: Service Provider
            HTTP is stateless. ( cookie, session => login )
            - 3. Header...
                - yogiyo ( 정해진 단일 값 ) => 편함, 위험함
                - JWT ( JSON Web Token )
                - 토큰 == 값 ( = Claim ); Claim Based Auth.

                - Token based auth. => 받는 값
                - Claim based auth. => 받는 값의 의미 ( 데이터 )
        - passport ( auth middleware )

        - 자동화 도구 ( grunt, gulp, / bower - bower.json / npm - package.json ) => update...
        - ajax, socketio ( 클라이언트 ~ 서버 )
            - ajax: Request 주체 ( Client )
            - websocket ( socket.io ) \
                - Request 주체 => Client, Server
                - emit..., on....




