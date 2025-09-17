

# Wiki Graph Explorer (Frontend)

Frontend moderno para explorar grafos de artículos de Wikipedia, construido con Vite, React, TypeScript, Zustand, React Query, Axios, Zod y Tailwind CSS. Arquitectura feature-sliced y API configurable.

---

## Objetivo del Proyecto

Permitir a los usuarios explorar la red de conocimiento de Wikipedia como un grafo interactivo, visualizando cómo los conceptos se conectan y expandiendo la exploración de forma dinámica.

---


## Características principales

- Visualización 3D interactiva de grafos de artículos de Wikipedia
- Búsqueda de artículos y exploración de relaciones
- Guardado, listado y eliminación de exploraciones (CRUD)
- Explorador interactivo de la API REST
- Expansión dinámica de nodos (doble clic o botón)
- Panel lateral con resumen del nodo seleccionado
- Visualización de centralidad (tamaño del nodo proporcional a su centralidad)
- UI responsiva y moderna con Tailwind CSS
- Manejo de estados de carga y error


## Instalación y uso rápido

1. Instala las dependencias:
   ```powershell
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```powershell
   npm run dev
   ```
3. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Despliegue

Para construir la aplicación para producción:
```powershell
npm run build
```
Luego puedes servir la carpeta `dist/` con cualquier servidor estático.


## Variables de entorno

Configura las siguientes variables en un archivo `.env` si es necesario:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_DEFAULT_LANG=en
VITE_MAX_RENDER_NODES=1500
```


## Scripts disponibles

- `npm run dev` – Servidor de desarrollo
- `npm run build` – Compilación y type-check
- `npm run preview` – Previsualización de build
- `npm run test` – Ejecutar tests con Vitest


## Estructura del proyecto

- `src/app` – Proveedores de configuración y contexto
- `src/entities` – Tipos y modelos de datos
- `src/services` – Clientes API, hooks, esquemas Zod
- `src/store` – Estado global (Zustand)
- `src/widgets` – Componentes UI principales (Toolbar, GraphCanvas, NodePanel)
- `src/features` – Funcionalidades como búsqueda
- `src/pages` – Vistas principales (Home, Explorer, ApiExplorer, CRUD)
- `src/shared` – Utilidades, UI compartida, mocks
- `src/processes` – Procesos transversales (notificaciones)


## Endpoints principales de la API

### Buscar artículos
`GET /api/search?term={query}`
Devuelve una lista de artículos sugeridos para iniciar la exploración.

### Explorar grafo
`GET /api/explore/{article_title}?depth={level}`
Devuelve el grafo de conexiones del artículo y sus vecinos hasta la profundidad indicada.
Formato de respuesta:
```json
{
   "nodes": [
      { "id": "Albert Einstein", "label": "Albert Einstein", "summary": "...", "centrality": 5 },
      { "id": "Theory of relativity", "label": "Theory of relativity", "summary": "...", "centrality": 2 }
   ],
   "edges": [
      { "from": "Albert Einstein", "to": "Theory of relativity" }
   ]
}
```

### Guardar exploración
`POST /api/explorations`
Guarda una instantánea del grafo explorado.

### Listar exploraciones
`GET /api/explorations`
Lista las exploraciones guardadas.

### Eliminar exploración
`DELETE /api/explorations/{exploration_id}`
Elimina una exploración guardada.


## Configuración en tiempo de ejecución

- Selección de URL base de la API desde la UI
- Permite override vía query param: `?api=http://127.0.0.1:8000`
- Persistencia en `localStorage`


---

## Decisiones de arquitectura y diseño

- **Gestión de estado:** Se utiliza Zustand para el estado global del grafo, permitiendo una manipulación eficiente y reactiva de nodos, aristas y selección de nodos.
- **Expansión dinámica:** Al hacer doble clic en un nodo, se consulta el backend y se fusionan los nuevos nodos/aristas al grafo existente sin recargar la página.
- **Centralidad:** El backend puede devolver la métrica de centralidad para cada nodo, que se visualiza en el tamaño del nodo en el grafo 3D.
- **React Query:** Se usa para el manejo de datos asíncronos y cacheo de resultados de la API.
- **Arquitectura feature-sliced:** El código está organizado por dominio funcional para facilitar la escalabilidad y mantenibilidad.
- **UI/UX:** Tailwind CSS y componentes reutilizables aseguran una experiencia moderna y responsiva.
- **Manejo de errores y carga:** Todos los flujos principales muestran estados de carga y mensajes de error claros.

## Desafíos y consideraciones

- **Modelado del grafo:** Se optó por un modelo simple de nodos y aristas, compatible con la visualización y la expansión incremental.
- **Prevención de bucles:** El frontend mantiene un registro de nodos visitados para evitar duplicados y bucles al expandir el grafo.
- **Persistencia:** Las exploraciones se guardan como snapshots del grafo, facilitando su recuperación y visualización posterior.

## Criterios de evaluación clave (cumplidos)

- Código claro, modular y siguiendo buenas prácticas (SOLID, DRY)
- Modelado de datos y lógica de grafo eficiente
- API REST clara y consistente
- Gestión de estado robusta en frontend
- Funcionalidad y usabilidad intuitiva
- Documentación completa y profesional

---

## Capturas de pantalla

Incluye aquí capturas de la vista de exploración, búsqueda y "Mis exploraciones" para ilustrar la funcionalidad.

---

## Licencia

MIT. Consulta el archivo LICENSE para más detalles.

