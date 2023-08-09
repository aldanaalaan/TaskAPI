# TaskAPI

---

Una API de práctica para aprender conceptos como enrutamiento, middlewares, control de acceso con JWT, bases de datos no relacionales con MongoDB y validación de datos, ademas de aprender a documentar una API.

- [TaskAPI](#taskapi)
  - [Instalación](#instalación)
    - [Requisitos de instalación](#requisitos-de-instalación)
    - [Instrucciones de instalación](#instrucciones-de-instalación)
  - [Stack](#stack)
  - [Estructura de directorios](#estructura-de-directorios)
  - [Endpoints](#endpoints)
    - [Usuario](#usuario)
      - [Registro de usuario](#registro-de-usuario)
      - [Inicio de sesión](#inicio-de-sesión)
      - [Me](#me)

## Instalación

### Requisitos de instalación

Para poder ejecutar TaskAPI de forma local se necesita:

- Node.js
- NPM
- MongoDB

### Instrucciones de instalación

1. Clonar este repositorio.
2. En una terminal ubicada en el directorio inicial del proyecto, ejecutar el siguiente comando:

   ```sh
   npm i
   ```

   Esto instalará todas las dependencias de Node.js necesarias para el funcionamiento del proyecto.

3. Crear un archivo "**.env**" en el directorio inicial del proyecto, con las siguientes variables:

   ```javascript
   SECRET_KEY = '[Clave secreta]';
   DB_URI = '[Enlace a BD de MongoDB]';
   ```

4. De tener la BD de manera local, iniciar el servidor con el siguiente comando en la terminal:

   ```sh
   mongod
   ```

5. En una terminal ubicada en el directorio inicial del proyecto, utilizar alguno de los siguientes comandos:

   - Iniciar el proyecto.

     ```sh
     npm start
     ```

   - Iniciar el proyecto para desarrollo (Se actualiza el servidor al guardar cambios en el proyecto)

     ```sh
     pnpm run dev
     ```

## Stack

- **Node.js**: es un entorno de ejecución de JavaScript que permite utilizar JavaScript del lado del servidor.

- **Express**: Express es un framework de Node.js para crear aplicaciones web y APIs.

- **MongoDB**: es una base de datos NoSQL de alto rendimiento que permite almacenar y recuperar datos de manera eficiente.

- **JWT**: son las siglas de JSON Web Tokens, un estándar abierto para la creación de tokens de acceso que pueden ser verificados y confiables.

## Estructura de directorios

<!-- TODO: Estructura de directorios -->

<!--
   TODO: Eliminar este comentarios
   * Usuarios
   - Registro de usuario: POST /taskapi/users/signup - para registrar un nuevo usuario.
   - Inicio de sesión: POST /taskapi/users/login - para iniciar sesión en la cuenta de un usuario registrado.
   - Obtener información del usuario: GET /taskapi/users/me - para obtener información del usuario autenticado actualmente.
   - Actualizar información del usuario: PUT /taskapi/users/me - para actualizar información del usuario autenticado actualmente.
   - Cambio de contraseña: PUT /taskapi/users/me/password - para permitir que un usuario cambie su contraseña actual.
   - Eliminar cuenta: DELETE /taskapi/users/me - para permitir que un usuario elimine su cuenta y toda su información asociada.

   * Tareas
   - GET /tasks: devuelve todas las tareas.
   - GET /tasks/:id: devuelve la tarea **con** el id especificado.
   - POST /tasks: crea una nueva tarea con los datos proporcionados.
   - PUT /tasks/:id: actualiza la tarea con el id especificado con los datos proporcionados.
   - PUT /tasks/:id/completed: actualiza el estado de la tarea
   - DELETE /tasks/:id: elimina la tarea con el id especificado.
 -->

## Endpoints

---

### Usuario

#### Registro de usuario

Permite registrar un nuevo usuario en la BD y devuelve un token para ese usuario.

- Método: POST

- Ruta: `/taskapi/users/signup/`

- **Parámetros**.

  Deben enviarse a traves del **_body_** de la petición como JSON.

  | Parámetro  |   Tipo   | Requerido | Descripción                                                                         |
  | ---------- | :------: | :-------: | ----------------------------------------------------------------------------------- |
  | `username` | `String` |    Si     | Un nombre para el usuario no único, requerido.                                      |
  | `email`    | `String` |    Si     | Un correo electrónico que identifica a un usuario dentro de la DB, único requerido. |
  | `password` | `String` |    Si     | Contraseña que le dará acceso al JWT al iniciar sesión.                             |

- **Respuesta**.

  - Estructura de la respuesta

    | Propiedad | Descripción                                                                                                                                                                                         |
    | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `success` | Indica si la operación fue exitosa (**true**) o no (**false**)                                                                                                                                      |
    | `message` | Un mensaje que proporciona información adicional sobre el resultado de la operación                                                                                                                 |
    | `token`   | JWT necesario para el acceso a otro endpoint de la API, este contiene el \_id , su username y su email. Solo se proporciona en caso de que la operación sea exitosa, y tiene expiración de una hora |

  - Respuestas

    | Código | Respuesta                                                           |
    | :----: | ------------------------------------------------------------------- |
    |  201   | El usuario se ha creado correctamente.                              |
    |  400   | Los datos son inválidos o falta información necesaria.              |
    |  409   | El correo electrónico proporcionado ya está vinculado a un usuario. |
    |  500   | Error interno del servidor                                          |

#### Inicio de sesión

Devuelve un nuevo token para un usuario ya registrado.

- Método: POST

- Ruta: `/taskapi/users/login/`

- **Parámetros**

  Deben enviarse a través del **body** de la petición como JSON.

  | Parámetro  |   Tipo   | Requerido | Descripción                                      |
  | ---------- | :------: | :-------: | ------------------------------------------------ |
  | `email`    | `String` |    Si     | El correo electrónico que identifica al usuario  |
  | `password` | `String` |    Si     | Contraseña del usuario qué te dará acceso al JWT |

- **Respuesta**.

  - Estructura de la respuesta

    | Propiedad | Descripción                                                                                                                                                                                        |
    | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `success` | Indica si la operación fue exitosa (**true**) o no (**false**)                                                                                                                                     |
    | `message` | Un mensaje que proporciona información adicional sobre el resultado de la operación                                                                                                                |
    | `token`   | JWT necesario para el acceso a otro endpoint de la API, este contiene el \_id , su username y su email. Solo se proporciona en caso de que la operación sea exitosa y tiene expiración de una hora |

  - Respuestas

    | Código | Respuesta                                                      |
    | :----: | -------------------------------------------------------------- |
    |  200   | Se ha iniciado sesión correctamente                            |
    |  401   | Uno o ninguno de los datos coinciden con un usuario registrado |
    |  500   | Error interno del servidor                                     |

#### Me

Un endpoint para obtener información de un usuario ya autenticado.

- Método: GET

- Ruta: `taskapi/users/me`

- **Parámetros**.

  Debe enviarse a traves de la cabecera `x-access-token`.

  | Cabecera           |      Tipo      | Requerido | Descripción                                                                            |
  | ------------------ | :------------: | :-------: | -------------------------------------------------------------------------------------- |
  | `'x-access-token'` | JSON Web Token |    Si     | Token obtenido a traves de [Signup](#registro-de-usuario) o [Login](#inicio-de-sesión) |

- **Respuesta**.

  - Estructura de la respuesta

    | Propiedad | Descripción                                                                                               |
    | --------- | --------------------------------------------------------------------------------------------------------- |
    | `success` | Indica si la operación fue exitosa (**true**) o no (**false**)                                            |
    | `message` | Un mensaje que proporciona información adicional sobre el resultado de la operación                       |
    | `user`    | Datos del usuario (username, email, password). Solo se proporciona en caso de que la operación se exitosa |

  - Respuestas.

    | Código | Respuesta                  |
    | ------ | -------------------------- |
    | 200    | La operación fue exitosa   |
    | 401    | Token expirado o invalido  |
    | 404    | Usuario no encontrado      |
    | 500    | Error interno del servidor |
