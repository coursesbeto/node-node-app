Configuración de node con ts [aquí](https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b)


Conceptos:
* Entity: es básicamente una clase a partir de la cual se define la estructura de un registro ya sea en el log de FileSystem, base de datos, etc.
* Datasource: contiene los origenes de datos, como el FileSystem, base de datos mongo, postgresql, etc.
* Repository: es cómo vamos a mandar a llamar al origen de datos, es el medio por el cual llegamos al datasource


Tips:
* Siempre que tengamos un paquete de terceros, usar el patrón adaptador, tener la lógica en un solo archivo para tener flexibilidad de cambiar la funcionalidad esperada facilmente.