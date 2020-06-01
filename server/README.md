# Docker 실전 연습 예제입니다.
### Installation
<pre>
cd /home
git clone https://github.com/ehrmaks/Docker-Test/
cd Docker-Practice
</pre>
### Run
<pre>
# Login For Private Docker Repository
docker login
docker pull ehrmaks/docker-board
docker run -p 80:8080 ehrmaks/docker-board
</pre>
