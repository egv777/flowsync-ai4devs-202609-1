# PRD: FlowSync (MVP)

## 1. Problema y objetivo

Los equipos remotos usan la daily para saber en qué está trabajando cada persona. FlowSync quiere que ese estado sea visible en cualquier momento y se actualice al instante, de modo que la daily deje de hacer falta. La idea es parecida a Jira, pero con el estado del equipo siempre al día.

**Métrica de éxito:** se cancela o se reduce la daily. Habrá que medirlo con el número de dailies por semana del equipo piloto. Falta definir el valor objetivo.

## 2. Usuarios

- **Miembros del equipo:** crean tareas, las actualizan y ven qué hacen los demás.
- **Manager:** consulta el estado del equipo y el resumen.

## 3. Alcance del MVP

- **Un único equipo.** Todos los usuarios registrados forman parte de él. No hay pantallas para crear equipos ni invitar gente.
- **Cada equipo solo ve lo suyo.** Con un equipo único esto aún no se aprecia, pero queda como principio.

### Tareas

- Campos: título, descripción, responsable y fecha límite.
- Estados: Por hacer, En curso y Hecha.
- Cualquier miembro puede crear tareas y asignarlas a cualquier persona del equipo.
- Una persona puede tener varias tareas en curso a la vez, pero marca una como su foco actual.

### Vista en vivo del equipo

- Se ve qué hace cada miembro: sus tareas en curso y su foco actual.
- Los cambios aparecen al instante, sin recargar la página.

### Resumen para el manager

- Cubre las últimas 24 horas móviles.
- Muestra las tareas completadas por persona y las tareas en curso con el foco actual de cada una.

### Avisos

No hay notificaciones. El usuario ve los cambios cuando abre la app.

## 4. Fuera del MVP

- Varios equipos y organizaciones.
- Integraciones con Slack, Git o Jira.
- Comentarios o chat en las tareas (futuro).
- Bloqueos como concepto propio (futuro).
- Prioridad de las tareas.
- Notificaciones fuera de la app.
- Resumen con tareas sin movimiento o con texto escrito por cada persona.

## 5. Contexto y validación

El MVP se valida como demo o uso interno del curso, sin usuarios reales. Hoy el producto solo ofrece registro, login y perfil. Todo lo anterior es nuevo.

## 6. Decisiones abiertas

1. **Estructura de la organización.** No está decidido si habrá capa de organización por encima de los equipos ni si una persona podrá estar en varios equipos.
2. **Rol del manager.** No está decidido si tiene permisos o vistas distintas a las de un miembro. Con el equipo único, hoy no hay diferencia.
3. **Valor objetivo de la métrica.** Falta fijar cuánto se tiene que reducir la daily para dar el MVP por exitoso.
