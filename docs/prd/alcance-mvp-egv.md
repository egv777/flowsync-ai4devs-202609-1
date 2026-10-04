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

Equipos remotos pequeños, de 3 a 10 personas. Los beneficiarios son los pares, no un lead: no hay reporte hacia arriba. Roles planos: todos ven lo mismo. Cada persona cambia el estado de sus propias tareas, y cualquiera puede coger una tarea sin responsable.

### Propuesta de valor

Saber de un vistazo quién está en qué, para no empezar algo que otra persona ya toca y para elegir lo siguiente sabiendo qué está libre.
### Alcance

Una vertical fina y usable de punta a punta, en un espacio único compartido:

- Crear una tarea con título, responsable, estado y fecha de vencimiento. Ningún campo es obligatorio. Una tarea sin título aparece en la lista como "Sin título".
- El responsable es cualquier usuario registrado en el espacio compartido.
- "Sin asignar" no es un estado: es el valor del responsable cuando está vacío. Una tarea nace "Sin asignar", y al asignarle un responsable "Sin asignar" desaparece. Una tarea "Sin asignar" está libre.
- El producto define dos estados: "TODO", que es el de una tarea "Sin asignar" por defecto, y "DONE", para las tareas terminadas. Salvo esos dos, los estados son texto libre y los escribe el responsable de la tarea.
- Cualquiera puede coger una tarea "Sin asignar": se la asigna a sí mismo y, en ese momento, actualiza su estado.
- Solo el responsable cambia el estado de su tarea.
- Cualquiera puede cambiar el título y la fecha de vencimiento de una tarea.
- El responsable puede soltar su tarea: vuelve a "Sin asignar" y su estado vuelve a "TODO".
- Cambiar el estado es rápido, en segundos, sobre la lista ya abierta.
- La lista se filtra por estado, para centrarse en lo pendiente, que es todo lo que no está en "DONE". Es el único filtro del MVP.
- La lista deja ver qué se ha pasado de plazo. Una tarea en "DONE" no cuenta.
- La lista marca qué tareas han cambiado desde que las diste por vistas. Sin historial ni informes.
  - Cuenta cualquier cambio de una tarea (estado, responsable, título, fecha de vencimiento) y las tareas nuevas.
  - Solo cuentan los cambios de otras personas, no los tuyos.
  - Los cambios que llegan con la lista abierta se marcan al instante.
  - La marca se queda hasta que la persona la da por vista. Recargar o mirar de pasada no la borra.
  - En la primera visita no aparece nada marcado.
  - Ese dato es privado: solo cada persona ve sus marcas, y nadie ve cuándo miró otra persona.
- Cada tarea muestra cuándo se actualizó por última vez, para que el equipo juzgue si está caducada. Sin alertas.
- Los cambios de estado aparecen sin refrescar ni preguntar.
- El estado es de la tarea, no de la persona.

### NO-alcance

Cada exclusión lleva la hipótesis del producto que no ayudaría a validar.

- **Varios equipos, o gente en más de un equipo:** no ayuda a validar si un espacio compartido evita la duplicación de trabajo. Se anota como supuesto y no se construye.
- **Quién está conectado e indicadores de actividad:** el producto trata de frescura, no de presencia. Medir conexión es vigilancia, y se rechaza a propósito.
- **Notificaciones push:** la señal es un resumen que espera, que se ve al llegar o volver de una reunión. Un aviso que interrumpe contradice el motivo de existir.
- **Vista o informe para un manager, y analítica:** el valor es para los pares. No ayuda a validar que el equipo cancele la ronda de "¿en qué estás?".
- **Filtrar por responsable ("mis tareas"):** no ayuda a validar que ver el estado de todos evite el trabajo duplicado, que se comprueba con la lista completa. Si el equipo pide "mis tareas" en el uso real, es la señal de que el beneficio propio no basta para que actualicen.
- **Roles y permisos avanzados:** no ayuda a validar que un estado compartido sustituya la ronda de "¿en qué estás?". La hipótesis es que, en un equipo de 3 a 10 personas de confianza, un estado visible para todos basta sin control de acceso fino. Las reglas mínimas son que cada persona cambia el estado de lo suyo y que cualquiera puede coger una tarea sin responsable.
- **Comentarios en tareas, chat, videollamada y edición simultánea:** el producto no es un canal de conversación. No ayuda a validar que el estado se vea de un vistazo.
- **Integración con Slack:** no ayuda a validar que una lista compartida sustituya el "¿en qué estás?" por chat. Llevar el estado al chat repetiría el canal que hoy genera la interrupción.
- **Derivar el estado de Git, CI o calendario:** contradice la hipótesis central. El estado lo teclea quien hace la tarea, y esa es la apuesta a validar, no automatizarla.
- **Convivir con otro gestor de tareas, o leer tareas de otro sitio:** exige doble actualización, que es como muere esta categoría. FlowSync sustituye al gestor, no convive con él.
- **Sprints, estimaciones, épicas y backlog priorizado:** no ayudan a validar que el equipo mantenga su estado al día si cuesta segundos. Añaden rituales de configuración que son justo el coste que se quiere evitar. Un equipo que los necesite no es el usuario.
- **Resolver bloqueos:** la parte de bloqueos de la daily sigue fuera de este MVP. Validar si la ronda de estado desaparece no los necesita.

## 4. Cómo sabremos si funciona

- **Éxito para el usuario:** deja de hacer la ronda de "¿en qué estás?" porque el estado se ve de un vistazo.
- **Criterio a una semana de uso real:** el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.
- **Riesgo nº 1:** que la información se quede vieja. La mitigación es que actualizar cueste segundos, sin obligar a nadie. Un compañero no puede corregir el estado caducado de la tarea de otra persona, y eso agrava el riesgo.

## 5. Supuestos

- Un espacio único compartido. Varios equipos separados quedan fuera del MVP.
- Quien se registra entra en ese espacio compartido y ve todo. Es un riesgo asumido para el MVP: es una demo con un caso de estudio, no un cliente real, así que no hay datos sensibles ni usuarios ajenos al equipo.
- Salvo "TODO" y "DONE", los estados son texto libre. El filtro por estado puede fragmentarse si cada persona escribe el mismo estado de forma distinta.
