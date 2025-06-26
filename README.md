# 🛍️ Gonésu E-commerce

![E-commerce Screenshot](https://iili.io/FAlhcF9.png)

E-commerce desarrollado para el trabajo práctico de la materia Laboratorio de Aplicaciones Web Cliente, consumiendo la API FakeStore.

## 🚀 Características principales

- **Catálogo de productos** con cards 
- **Filtrado por categorías**
- **Barra de búsqueda**
- **Carrito persistente**
- **Modales de detalle**
- **Gestión de cantidades**
- **Responsive design**

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox, custom properties)
- JavaScript ES6+
- [Bootstrap 5](https://getbootstrap.com/) (componentes y grid system)
- [Font Awesome](https://fontawesome.com/) (íconos)
- [FakeStore API](https://fakestoreapi.com/)

## 📦 Estructura del proyecto

```
gonesu-ecommerce/
├── index.html              # Página principal
├── css/
│      ├── styles.css          # Estilos generales
│      └── detail.css          # Estilos detalles
├── js/
│      ├── index.js                 # Lógica principal
│      ├── details.js               # Gestión de modales
│      ├── externalData.js          # Fetch externo
│      └── cart.js                  # Funcionalidad del carrito
└── README.md
```


## 👥 Contribuciones

### Gonzalo Folli
- Arquitectura inicial del proyecto (HTML base), uso de etiquetas como `header`, `main`, `aside` .
- Creación de componentes reutilizables (cards de producto, modales, navbar)
- Estilado general de la aplicación (CSS base)
- Utilización de diversas clases proporcionadas por Bootstrap
- Implementación del fetch a la API de FakeStore
- Diseño del sistema de renderizado dinámico de productos con template strings
- Sistema de modales (`details.js`)
- Guardado y Recuperacion de datos en LocalStorage
- Renderizado dinámico de:
  - Contador del carrito (icono)
  - Leyenda "Cantidad: X en carrito" en cards
- Funcionalidades:
  - Barra de búsqueda
  - Filtrado por categorías

### Jesús Spagnolo


## 🎨 Diseño UX

1. **Flujo principal**:
   - Selección → Detalle (modal) → Carrito → Checkout
2. **Patrones de interacción**:
   - Alertas al agregar/quitar/vaciar el carrito
   - Persistencia con localStorage
3. **Elementos clave**:
   - Filtros
   - Carrito
   - Diseño Responsive

## 🚧 Instalación local

```bash
git clone https://github.com/tu-usuario/gonesu-ecommerce.git
cd gonesu-ecommerce

```

## 📝 Licencia

ISTEA License © 2025 - Gonésu Team