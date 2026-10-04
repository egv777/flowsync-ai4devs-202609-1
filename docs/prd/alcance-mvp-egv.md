# Alcance del MVP de FlowSync

## 1. El terreno que ya existe

Hoy el producto solo tiene cuentas de usuario: registro, inicio y cierre de sesión, y una página de perfil. El modelo de datos son personas (nombre, email, contraseña) y sus sesiones. No existe ninguna tarea, ni la noción de equipo, ni nada en tiempo real. Todo lo que sigue es nuevo y se apoya en esas cuentas.

## 2. Decisiones de partida

Estas respuestas del producto ya están decididas y no se discuten aquí:

- La daily no desaparece entera. Desaparece la ronda de "¿en qué estás?". Los bloqueos siguen tratándose en la daily y este MVP no los resuelve.
- El estado lo teclea quien hace la tarea, en segundos. Derivarlo de señales externas (Git, PRs, CI, calendario) queda fuera del MVP: es otro producto, con integraciones y OAuth de terceros.
- El riesgo nº 1 a validar es que la información se quede vieja.
- Caso de estudio, no cliente real: un equipo de 6 personas de producto SaaS en 3 husos horarios.

## 3. Alcance en cinco bloques

### Problema

Nadie ve el estado del equipo sin interrumpir a alguien. La daily se come la mitad de sus 15 minutos en la ronda de "¿en qué estás?", y el "¿cómo vas?" por chat interrumpe sin parar. Episodio concreto: dos personas tocaron el mismo módulo la misma semana sin saberlo y perdieron dos días.

### Usuarios

Equipos remotos pequeños, de 3 a 10 personas. Los beneficiarios son los pares, no un lead: no hay reporte hacia arriba. Roles planos: todos ven y editan lo mismo.

### Propuesta de valor

Saber de un vistazo quién está en qué, para no empezar algo que otra persona ya toca y para elegir lo siguiente sabiendo qué está libre. Quien actualiza su tarea cobra en el momento: esa misma lista es lo que mira para decidir qué coger, y deja de recibir interrupciones.

### Alcance

Una vertical fina y usable de punta a punta, en un espacio único compartido:

- Crear una tarea con título, responsable, estado y fecha de vencimiento. Ningún campo es obligatorio.
- El único estado definido por el producto es "Sin asignar", que significa que la tarea está libre. El resto de estados los escribe el responsable de la tarea.
- Cambiar el estado es rápido, en dos clics sobre la lista ya abierta.
- La lista se filtra por estado, para centrarse en lo pendiente. Es el único filtro del MVP.
- La lista deja ver qué se ha pasado de plazo.
- Al volver, la lista marca qué tareas han cambiado desde tu última visita. Sin historial ni informes.
- Los cambios de estado aparecen sin refrescar ni preguntar.
- El estado es de la tarea, no de la persona.

### NO-alcance

Cada exclusión lleva la hipótesis del producto que no ayudaría a validar.

- **Varios equipos, o gente en más de un equipo:** no ayuda a validar si un espacio compartido evita la duplicación de trabajo. Se anota como supuesto y no se construye.
- **Quién está conectado e indicadores de actividad:** el producto trata de frescura, no de presencia. Medir conexión es vigilancia, y se rechaza a propósito.
- **Notificaciones push:** la señal es un resumen que espera, que se ve al llegar o volver de una reunión. Un aviso que interrumpe contradice el motivo de existir.
- **Vista o informe para un manager, y analítica:** el valor es para los pares. No ayuda a validar que el equipo cancele la ronda de "¿en qué estás?".
- **Filtrar por responsable ("mis tareas"):** el MVP se valida con un solo filtro. Queda sin validar si hace falta una cola personal, aparte de ver qué hay libre y qué se mueve.
- **Roles y permisos avanzados:** con roles planos, todos editan lo mismo. Queda sin validar si la confianza entre pares basta, y no se resuelve aquí.
- **Comentarios en tareas, chat, videollamada y edición simultánea:** el producto no es un canal de conversación. No ayuda a validar que el estado se vea de un vistazo.
- **Integración con Slack:** no ayuda a validar nada del problema. Exige integrar un tercero y el estado no depende de él.
- **Derivar el estado de Git, CI o calendario:** contradice la hipótesis central. El estado lo teclea quien hace la tarea, y esa es la apuesta a validar, no automatizarla.
- **Convivir con otro gestor de tareas, o leer tareas de otro sitio:** exige doble actualización, que es como muere esta categoría. FlowSync sustituye al gestor, no convive con él.
- **Sprints, estimaciones, épicas y backlog priorizado:** un equipo que los necesite no es el usuario. Además, contradicen "menos rollo que Jira".
- **Resolver bloqueos:** la parte de bloqueos de la daily sigue fuera de este MVP. Validar si la ronda de estado desaparece no los necesita.

## 4. Cómo sabremos si funciona

- **Éxito para el usuario:** deja de hacer la ronda de "¿en qué estás?" porque el estado se ve de un vistazo.
- **Criterio a una semana de uso real:** el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.
- **Riesgo nº 1:** que la información se quede vieja. La mitigación es que actualizar cueste dos clics, sin obligar a nadie.

## 5. Supuestos

- Un espacio único compartido. Varios equipos separados quedan fuera del MVP.
- Quien se registra entra en ese espacio compartido y ve y edita todo (por confirmar).
