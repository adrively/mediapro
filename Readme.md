Usado:
--------
- Materialize como framework gráfico puro
- Angularjs como framework front-end (MVC -> Modelo-Vista-Controlador)
- Bower para instalar paquetes js
- jQuery para transiciones, movimientos y efectos
- Peticiones http a localhost
- Xampp para utilizar Apache
- Apache como servidor web local
- Archivos .bat para levantar el server y BD de forma más rápida y cómoda
- Postman para el testeo rápido de peticiones a la API
- Studio 3T para la edición de la BD o inserción / eliminación de información
  de la misma

Resumen de la app:
---------------------

- SPA (Single Page Application)
- Lista de usuarios consumidos de la API, ordenados por defecto en órden alfabético con opción
  a reordenación por fecha de creación o fecha de actualización
- Paginación dinámica fijada en la parte inferior-izquierda
- Filtrado por 'keyword' situado en la parte superior-derecha
- Edición y borrado de usuarios en la misma tarjeta de usuario
- Registro de nuevos usuarios con formulario de campos validados y requeridos (al igual que en la edición)
- Reutilización del mismo formulario para la edición y el registro (eficiéncia de cógido)
- Código estructurado
- Cuando en el formulario de edición de usuario un campo se queda vacío, automáticamente se autocompleta con el valor que había antes aunque
  sea un campo required


Diseño:
-------------
- Intuitivo y sencillo
- Concordancia de colores de los diferentes elementos visuales
- Animaciones y efectos de feedback para el usuario
- Diseño tipo SPA fácilmente escalable


Problemas observados:
----------------------
1. A la hora de hacer peticiones http a un localhost, chrome, por seguridad, ejecuta un error llamado 'Allow-Control-Allow-Origin'
   por tal de que no se puedan hacer peticiones de cliente a servidor situados ambos en el mismo localhost
2. La función de edición de la API muestra un comportamiento extraño, de manera que al editar un usuario que no sea el primero de la tabla de la BD,
   se actualiza el primer usuario de forma automática
3. El método PATCH de petición http muestra un error de chrome del tipo 'Allow-Control-Allow-Origin'

- Todos estos problemas básicamente son originados al hacer peticiones de local a local, si la API estuviera en un servidor
  externo muchos de estos problemas no ocurrirían

Soluciones:
-------------
1. Instalación de la extensión CORS en Chrome que desactiva la seguridad del mismo para poder hacer peticiones a tu propio localhost y utilización de archivos .htaccess
2. Este problema reside en la API, he buscado el problema internamente pero no he visto la causa, una posible solución sería hacer
   que la id del usuario no fuera una clave primaria y así poder sobreescribirla por la misma y no por la del primer usuario
3. Cambio de la ruta de edición de usuario por el método POST ya que éste no da tal problema y para el ENDPOINT no es imprescindible usar PATCH

Otros:
-------
- No se ha utilizado Sass para el pre-procesado de CSS ya que hay css nativo escaso y materialize facilita mucho la edición CSS
  mediante sus clases, aunque he investigado y sabría defenderme de forma correcta utilizándolo
