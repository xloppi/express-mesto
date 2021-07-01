# Mesto (backend)

## О проекте:

Бэкенд для приложения Mesto.

**Что нового:**
Добавлена возможность авторизации и регистрации. Запросы на сервер проходят валидацию. Приложение запоминает залогиненного пользователя при помощи токена. Все руты, кроме '/signin' и '/signup', доступны только после авторизации.

**Стек технологий:**

![](https://img.shields.io/badge/-HTML-000000?style=for-the-badge&logo=HTML5)
![](https://img.shields.io/badge/-CSS-000000?style=for-the-badge&logo=CSS3)
![](https://img.shields.io/badge/-JS-000000?style=for-the-badge&logo=JavaScript)
![](https://img.shields.io/badge/-Node.JS-000000?style=for-the-badge&logo=NODE.JS)
 ![](https://img.shields.io/badge/-express-000000?style=for-the-badge&logo=EXPRESS)
 ![](https://img.shields.io/badge/-MongoDB-000000?style=for-the-badge&logo=MONGODB)

**Директории**

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки 
`/middlewares` — содержит мидлвару для проверки токена 
`/errors` — папка содержит классы ошибок
  
**Запуск проекта**

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

**Запросы**

GET users/  - Запрос списка пользователей из базы.

GET users/me  - Запрос информации об авторизованном пользователе.

PATCH users/me  - Обновление имени и информации о себе.

GET users/:userId  - Запрос информации о конкретном пользователе.

GET users/me/avatar  - Обновление аватарки.

GET cards/ - возвращает карточки из базы.

POST cards/ - Добавляет карточку в базу.

DELETE cards/:cardId - удаляет карточку с cardId из базы.

PUT cards/:cardId/likes  - Лайкнуть карточку с cardId.

DELETE cards/:cardId/likes  - Убрать лайк.


**Локальная установка:**
1. Для работы необходимо установить Node.js и MongoDB.

2. Скачать репозиторий.
3. Установить зависимости
```
npm install
```
4. Запустить приложение командой
```
npm run start
```
или для запуска с hot-reload
```
npm run dev
```
5. Если все сделано правильно, то приложение откроется в браузере по адресу: http://localhost:3000/. Запросы можно отправлять через Postman.
