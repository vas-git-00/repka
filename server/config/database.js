import mysql from 'mysql2'

    export const db = mysql.createConnection({
        host: '194.87.214.60', //'nacaquiflu.beget.app',
        port: '3306',
        user: 'avasyukov',
        password: '1937825',
        database: 'chatshub_db'
})

 db.connect((err) => {
    if (err) {
      console.error('Ошибка подключения к базе данных:', err);
      return;
    }
    console.log('Подключено к базе данных');
  })
  