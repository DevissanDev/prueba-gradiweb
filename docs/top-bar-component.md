# Top Bar Component - Documentación

## Descripción

Componente reutilizable de barra superior con texto en marquee (scroll horizontal) e ícono estrella. Ideal para mostrar promociones, anuncios o información importante.

## Ubicación

- **Sección original**: `sections/top-bar.liquid`
- **Snippet reutilizable**: `snippets/top-bar-reusable.liquid`

## Props/Parámetros Disponibles

| Parámetro          | Tipo   | Default                                     | Descripción                                |
| ------------------ | ------ | ------------------------------------------- | ------------------------------------------ |
| `height`           | String | `'32px'`                                    | Altura de la barra superior                |
| `marquee_text`     | String | `settings['top-bar'].settings.marquee_text` | Texto que se desplaza                      |
| `background_color` | String | `'var(--purpure-color)'`                    | Color de fondo                             |
| `text_color`       | String | `'white'`                                   | Color del texto                            |
| `icon_size`        | String | `'17'`                                      | Tamaño del ícono estrella (width y height) |
| `font_family`      | String | `'var(--font-aeonik)'`                      | Familia tipográfica del texto              |
| `font_size`        | String | `'12px'`                                    | Tamaño de fuente del texto                 |
| `font_weight`      | String | `'700'`                                     | Peso de fuente del texto                   |

## Formas de Uso

### 1. Uso Básico (valores por defecto)

```liquid
{% render 'top-bar-reusable' %}
```

### 2. Con altura personalizada

```liquid
{% render 'top-bar-reusable', height: '48px' %}
```

### 3. Con múltiples parámetros

```liquid
{% render 'top-bar-reusable',
   height: '50px',
   marquee_text: 'OFERTA ESPECIAL - 50% OFF',
   background_color: '#ff6b6b',
   text_color: '#ffffff',
   icon_size: '20' %}
```

### 4. Con tipografía personalizada

```liquid
{% render 'top-bar-reusable',
   height: '45px',
   marquee_text: 'COLECCIÓN PREMIUM',
   font_family: 'var(--font-countach)',
   font_size: '14px',
   font_weight: 'bold' %}
```

## Ejemplos de Casos de Uso

### Top Bar de Promociones

```liquid
{% render 'top-bar-reusable',
   height: '45px',
   marquee_text: 'BLACK FRIDAY - HASTA 70% DE DESCUENTO',
   background_color: '#e74c3c',
   text_color: '#ffffff',
   icon_size: '19' %}
```

### Top Bar con Fuente Personalizada

```liquid
{% render 'top-bar-reusable',
   height: '40px',
   marquee_text: 'NUEVA COLECCIÓN DISPONIBLE',
   font_family: 'var(--font-countach)',
   font_size: '13px',
   font_weight: 'bold',
   background_color: '#2c3e50',
   text_color: '#ecf0f1' %}
```

```liquid
{% render 'top-bar-reusable',
   height: '45px',
   marquee_text: 'BLACK FRIDAY - HASTA 70% DE DESCUENTO',
   background_color: '#e74c3c',
   text_color: '#ffffff',
   icon_size: '19' %}
```

### Top Bar de Información Delgada

```liquid
{% render 'top-bar-reusable',
   height: '28px',
   marquee_text: 'Envío gratis en pedidos mayores a $50',
   background_color: '#2ecc71',
   icon_size: '15' %}
```

### Top Bar de Evento Especial

```liquid
{% render 'top-bar-reusable',
   height: '60px',
   marquee_text: 'LANZAMIENTO NUEVO PRODUCTO - DISPONIBLE AHORA',
   background_color: '#9b59b6',
   text_color: '#ffffff',
   icon_size: '24' %}
```

## Notas Técnicas

### CSS

El componente utiliza el archivo CSS `sections/styles/top-bar.css`. Los estilos inline se aplican directamente al elemento `<section class="topbar">` para permitir personalización sin afectar otros usos del componente.

### Animación

- El texto tiene animación de scroll continuo (marquee)
- La animación se pausa al hacer hover
- Duración: 600 segundos para un scroll suave

### Estructura HTML Generada

```html
<section
  class="topbar"
  style="height: [height]; background-color: [background_color]; color: [text_color];"
>
  <div class="marquee-container">
    <p>
      <!-- Texto repetido con íconos -->
    </p>
  </div>
  <div class="gradient"></div>
</section>
```

## Compatibilidad

- Compatible con Shopify Liquid
- Requiere acceso a `asset_url` filter
- Requiere el archivo CSS `sections/styles/top-bar.css`
- Requiere el ícono `accessories/start.svg`

## Personalización Avanzada

Para personalizar más aspectos del componente, modifica el archivo CSS `sections/styles/top-bar.css` o añade más parámetros al snippet según tus necesidades.
