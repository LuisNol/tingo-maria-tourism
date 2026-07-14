# Tingo María - Turismo

Aplicación web de turismo para Tingo María con Vue 3 + TypeScript + Vite.

## Características

- **10 pantallas implementadas**: Splash, Inicio, Lugares Turísticos, Detalle del Lugar, Hoteles, Restaurantes, Planificador, Clima, Cambio de idioma y Favoritos
- **Paleta de colores inspirada en Tingo María**: Verde selva, celeste río, amarillo sol, blanco
- **Estado global con Pinia**: Idioma, favoritos y datos de navegación
- **Navegación con Vue Router**: Transiciones suaves entre pantallas
- **Diseño responsive**: Adaptado para móviles y escritorio
- **Datos offline**: Información de lugares, hoteles y restaurantes disponible sin conexión

## Tecnologías

- Vue 3.5+
- TypeScript
- Vite 8
- Pinia 2
- Vue Router 4
- SCSS

## Scripts

```bash
npm install          # Instalar dependencias
npm run dev          # Iniciar servidor de desarrollo (http://localhost:5173)
npm run build        # Construir para producción
npm run preview      # Previsualizar build
npm run lint         # Ejecutar ESLint
npm run typecheck    # Verificar tipos TypeScript
```

## Estructura del proyecto

```
src/
├── assets/          # Imágenes y assets estáticos
├── components/      # Componentes reutilizables
│   ├── AppButton.vue
│   ├── AppCard.vue
│   ├── AppInput.vue
│   └── NavigationBar.vue
├── data/            # Datos estáticos
│   └── index.ts
├── router/          # Configuración de rutas
│   └── index.ts
├── stores/          # Stores de Pinia
│   └── appStore.ts
├── styles/          # Estilos globales
│   ├── main.scss
│   └── variables.scss
├── types/           # Tipos TypeScript
│   └── index.ts
└── views/           # Vistas/pantallas
    ├── SplashScreen.vue
    ├── HomeView.vue
    ├── PlacesView.vue
    ├── PlaceDetailView.vue
    ├── HotelsView.vue
    ├── RestaurantsView.vue
    ├── PlannerView.vue
    ├── WeatherView.vue
    ├── LanguageView.vue
    └── FavoritesView.vue
```

## Rutas

| Ruta | Nombre | Descripción |
|------|--------|-------------|
| `/` | Splash | Pantalla de bienvenida (3 segundos) |
| `/home` | Inicio | Dashboard principal |
| `/places` | Lugares | Lista de lugares turísticos |
| `/places/:id` | Detalle | Detalle de un lugar |
| `/hotels` | Hoteles | Lista de hoteles |
| `/restaurants` | Restaurantes | Lista de restaurantes |
| `/planner` | Planificador | Generador de itinerarios |
| `/weather` | Clima | Información del clima |
| `/language` | Idioma | Selector de idioma |
| `/favorites` | Favoritos | Items guardados |