Configuración de node con ts [aquí](https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b)

Conceptos:

- Entity: es básicamente una clase a partir de la cual se define la estructura de un registro ya sea en el log de FileSystem, base de datos, etc.
- Datasource: contiene los origenes de datos, como el FileSystem, base de datos mongo, postgresql, etc.
- Repository: es cómo vamos a mandar a llamar al origen de datos, es el medio por el cual llegamos al datasource

Tips:

- Siempre que tengamos un paquete de terceros, usar el patrón adaptador, tener la lógica en un solo archivo para tener flexibilidad de cambiar la funcionalidad esperada facilmente.

Configuración de cuenta para correo

- Ingresar a la configuración de la cuenta de google [Contraseñas de aplicaciones](https://myaccount.google.com/u/0/apppasswords)
- Definimos un nombre para la app y copiamos el código obtenido en las variables de entorno 'MAILER_SECRET_KEY'
- También escribimos el correo electronico en las variables de entorno 'MAILER_EMAIL' de la misma cuenta
- instalamos la dependencia de [nodemailer](https://www.npmjs.com/package/nodemailer)
- hacemos la configuracion inicial, al enviar un correo y si imprimimos: let res this.transporter.sendMail({ to, subject, html }):

```

{
  accepted: [ 'example@gmail.com' ],
  rejected: [],
  ehlo: [
    'SIZE 35882577',
    '8BITMIME',
    'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
    'ENHANCEDSTATUSCODES',
    'PIPELINING',
    'CHUNKING',
    'SMTPUTF8'
  ],
  envelopeTime: 218,
  messageTime: 468,
  messageSize: 284,
  response: '250 2.0.0 OK  1750195724 46e09a7af769-73a284fe709sm1722339a34.31 - gsmtp',
  envelope: { from: '', to: [ 'example@gmail.com' ] },
  messageId: '<63d4d0fd-c231-72dc-e9ad-a5921f292e1c@localhost>'
}

```
