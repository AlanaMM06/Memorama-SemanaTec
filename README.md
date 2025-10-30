# Memorama-SemanaTec — Manual técnico

Última actualización: 30-Oct-2025

## Resumen

Este repositorio contiene una implementación simple de un juego tipo "memorama" (juego de parejas) desarrollado como proyecto para SemanaTec. Es una aplicación estática (HTML/CSS/JavaScript) pensada para ejecutarse en el navegador sin dependencias del lado servidor.

## Objetivo del documento

Proveer un manual técnico conciso para desarrolladores: describir la arquitectura, la estructura del proyecto, cómo ejecutar y probar localmente, criterios de calidad y pasos para contribuir mediante pull requests (PR).

## Tecnologías y alcance

- Entorno: Navegador web moderno (Chrome, Edge, Firefox, Safari).
- Lenguajes: HTML, CSS y JavaScript (vanilla).
- Construcción: ninguna herramienta de build requerida — proyecto estático.

## Estructura de archivos

Listado principal de archivos en la raíz del repositorio:

- `index.html` — Página principal del juego (memorama).
- `memorama.js` — Lógica del juego (barajado, gestión de parejas, estado del juego).
- `game_style.css` — Estilos para la interfaz del juego.
- `login.html` — Página de inicio de sesión (simulada, front-end).
- `login_style.css` — Estilos de la página de login.
- `README.md` — Este manual técnico.

Si se agregan carpetas en el futuro (por ejemplo `assets/` o `src/`) deben documentarse aquí.

## Contrato mínimo (inputs/outputs)

- Inputs: acciones del usuario (clics en cartas, inicio de sesión simulado).
- Outputs: actualización visual del tablero, contadores de pares/errores, mensajes en pantalla.
- Estados de error: recursos faltantes (CSS/JS), navegador sin soporte para ES6 — el comportamiento esperado es degradar o mostrar errores en consola.

## Requisitos para desarrollo y ejecución local

Requisitos mínimos:

- Navegador moderno.
- (Opcional) Python 3 instalado para servir los archivos localmente si se desea.

Ejecución rápida (modo prueba):

1) Abrir `index.html` directamente en el navegador (doble clic o arrastrar al navegador).

2) Servir localmente con Python (recomendado para evitar restricciones de CORS/paths):

```powershell
# Desde la raíz del repositorio
python -m http.server 8000
# Luego abrir http://localhost:8000/index.html
```

En Windows PowerShell se puede usar `Start-Process` para abrir la URL automáticamente:

```powershell
Start-Process "http://localhost:8000/index.html"
```

## Flujo de desarrollo y pruebas rápidas

- Modificar `memorama.js` para cambiar la lógica del juego.
- Modificar `game_style.css` para ajustar presentación/estilos.
- Después de cambios, recargar la página en el navegador. Usar la consola del desarrollador (F12) para ver errores JavaScript.

Pruebas sugeridas (manuales):

- Verificar que las cartas se barajan en cada inicio.
- Comprobar que al abrir dos cartas iguales quedan visibles y cuentan como pareja.
- Verificar que al abrir dos cartas diferentes se oculten tras breve retardo.
- Confirmar que el conteo de pares necesarios y el contador de movimientos se actualizan correctamente.

## Calidad y buenas prácticas

- Mantener la lógica separada de la presentación: `memorama.js` contiene la lógica de juego; mantener selectores DOM claros.
- Escribir comentarios concisos en funciones complejas.
- Evitar variables globales innecesarias; encapsular en funciones o en un objeto módulo.

## Seguridad y privacidad

Este proyecto no maneja datos sensibles ni persistencia en servidor. Si se añade cualquier autenticación o almacenamiento (localStorage / servidor), documentar y asegurar los flujos de autenticación y manejo de datos.

## Cómo contribuir (directrices para Pull Request)

1) Crea una rama desde `Manual-Tecnico` (su rama base actual):

```powershell
git checkout -b feature/descripcion-corta
```

2) Haz commits pequeños y descriptivos. Sigue el formato: `feat:`, `fix:`, `docs:`, `chore:`.

3) Abre un Pull Request hacia la rama `Manual-Tecnico` con una descripción clara del cambio. En el PR incluya:

- Objetivo del cambio.
- Archivos modificados.
- Pasos para probar localmente.

4) No modifiques otros archivos en el PR si la intención es solo actualizar documentación (como en este caso). Si necesitas cambiar código, separa en otro PR si es posible.

## Mantenimiento y próximos pasos (sugerencias)

- Añadir un pequeño conjunto de pruebas (por ejemplo con Jest y jsdom) si se planean cambios frecuentes en la lógica.
- Añadir un `assets/` para imágenes y mantener rutas relativas.
- Considerar modularizar JS si la base de código crece (`src/`, bundler opcional).

## Licencia

El repositorio no incluye un archivo de licencia específico. Añade un `LICENSE` si el proyecto necesita una licencia explícita (por ejemplo MIT) antes de publicar.

---

Si necesitas que adapte este manual (por ejemplo: más detalles de la implementación de `memorama.js` o snippets de la API interna), dime qué sección quieres ampliar y la desarrollo con ejemplo de código y tests básicos.
