# How to install 

### Pre Request 
- Php Version ^8.2
- Node Version 18 
- compoer v.2

### Make database 
- Recomended using `mysql` or `pgsql`

### How to install

1. clone repo `https://github.com/agitnaeta/event`
2. copy `.env.example` and make `.env`
3. makesure you fill the correct env 
 - DB_CONNECTION=musql
 - DB_HOST=YOUR_DB_HOST
 - DB_PORT=YOUR_DB_PORT `usually 3306`
 - DB_DATABASE=YOUR_DB_NAME 
 - DB_USERNAME=YOUR_DB_USERNAME
 - DB_PASSWORD=YOUR_PASSWORD


4. install composer `composer install`
5. install react `npm install`
6. compile assets & js `npm run build`
8. Run database migration `php artisan migrate` is there's some issue with error code `[2002]` usually that we need to check the connection on step number 3.
9. Run on local `php artisan serve`
10. *Aditional: if you want to modify style during server you can run `npm run dev`


### Advance Setup (EMAIL)
Email Notification on this system using background process.
so it non block process.
please follow the setup

1. Update `.env` change  makesure this key is follow 
- QUEUE_CONNECTION=database

2. check `MAIL_MAILER`, you can use `smtp` or you can use third party.
in my case im using MailTrap 
So you can create account on mailtrap and get this all credential 
- MAILTRAP_HOST="sandbox.api.mailtrap.io"
- MAILTRAP_API_KEY="YOUR_KEY"
- MAILTRAP_INBOX_ID=INBOX_ID

if you are using SMTP you can check this key on `.env`
- MAIL_HOST=127.0.0.1
- MAIL_PORT=2525 
- MAIL_USERNAME=null 
- MAIL_PASSWORD=null 
- MAIL_ENCRYPTION=null 
- MAIL_FROM_ADDRESS="hello@example.com"
- MAIL_FROM_NAME="${APP_NAME}"

3. After All setup you can run `php artisan queue:work`


## Demo app on vercel 
https://event-one-khaki.vercel.app/

