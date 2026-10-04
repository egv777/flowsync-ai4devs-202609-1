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

Saber de un vistazo quién está en qué y qué está libre, para no empezar algo que otra persona ya toca. Es una lista compartida, con cambios en vivo y sin rituales, que sustituye la ronda de "¿en qué estás?" sin aspirar a sustituir toda la daily.

### Alcance

Una vertical fina y usable de punta a punta, en un espacio único compartido:

- Crear una tarea con título, responsable, estado y fecha de vencimiento. Ningún campo es obligatorio.
- Una tarea sin responsable aparece como "Sin asignar" y está libre. "Sin asignar" no es un estado: es el valor del responsable cuando está vacío. El responsable es cualquier usuario registrado.
- El producto define dos estados: "TODO", que es el de una tarea "Sin asignar" por defecto, y "DONE". Salvo esos dos, los estados son texto libre.
- La lista es compartida y los cambios aparecen sin refrescar ni preguntar.
- La lista se filtra por estado, para centrarse en lo pendiente, que es todo lo que no está en "DONE". Es el único filtro del MVP.
- La fecha de vencimiento es visible, y se marca lo que se ha pasado de plazo. Una tarea en "DONE" no cuenta.
- Cada tarea muestra cuándo se actualizó por última vez, para que el equipo juzgue si está caducada. Sin alertas.

El estado es de la tarea, no de la persona.

### NO-alcance

Cada exclusión lleva la hipótesis del producto que no ayudaría a validar.

- **Marcas de "cambiado desde que lo diste por visto":** no ayudan a validar nada que la lista en vivo con la última actualización no valide ya. Exigen guardar por persona qué ha visto, y definir reglas (primera visita, cambios propios, privacidad). Si en el uso real alguien pide "¿qué cambió desde ayer?", entra.
- **Reglas de permisos por tarea y "soltar" una tarea:** todos editan lo mismo. Las reglas añaden casos (quién cambia qué, qué estado queda al soltar) que no ayudan a validar la hipótesis central. La confianza entre 3 y 10 personas se asume y se observa en el uso real.
- **Tratamiento especial de tareas sin título:** es un detalle de diseño que no cambia ninguna hipótesis del producto.
- **Varios equipos, o gente en más de un equipo:** no ayuda a validar si un espacio compartido evita la duplicación de trabajo. Se anota como supuesto y no se construye.
- **Quién está conectado e indicadores de actividad:** el producto trata de frescura, no de presencia. Medir conexión es vigilancia, y se rechaza a propósito.
- **Notificaciones push:** la señal es un resumen que espera, que se ve al llegar o volver de una reunión. Un aviso que interrumpe contradice el motivo de existir.
- **Vista o informe para un manager, y analítica:** el valor es para los pares. No ayuda a validar que el equipo cancele la ronda de "¿en qué estás?".
- **Filtrar por responsable ("mis tareas"):** no ayuda a validar que ver el estado de todos evite el trabajo duplicado, que se comprueba con la lista completa. Si el equipo pide "mis tareas" en el uso real, es la señal de que el beneficio propio no basta para que actualicen.
- **Roles y permisos avanzados:** no ayuda a validar que un estado compartido sustituya la ronda de "¿en qué estás?". La hipótesis es que, en un equipo de 3 a 10 personas de confianza, un estado visible para todos basta sin control de acceso fino.
- **Comentarios en tareas, chat, videollamada y edición simultánea:** el producto no es un canal de conversación. No ayuda a validar que el estado se vea de un vistazo.
- **Integración con Slack:** no ayuda a validar que una lista compartida sustituya el "¿en qué estás?" por chat. Llevar el estado al chat repetiría el canal que hoy genera la interrupción.
- **Derivar el estado de Git, CI o calendario:** contradice la hipótesis central. El estado lo teclea quien hace la tarea, y esa es la apuesta a validar, no automatizarla.
- **Convivir con otro gestor de tareas, o leer tareas de otro sitio:** exige doble actualización, que es como muere esta categoría. FlowSync sustituye al gestor, no convive con él.
- **Sprints, estimaciones, épicas y backlog priorizado:** no ayudan a validar que el equipo mantenga su estado al día si cuesta segundos. Añaden rituales de configuración que son justo el coste que se quiere evitar. Un equipo que los necesite no es el usuario.
- **Resolver bloqueos:** la parte de bloqueos de la daily sigue fuera de este MVP. Validar si la ronda de estado desaparece no los necesita.

## 4. Cómo sabremos si funciona

- **Éxito para el usuario:** deja de hacer la ronda de "¿en qué estás?" porque el estado se ve de un vistazo.
- **Criterio a una semana de uso real:** el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.
- **Riesgo nº 1:** que la información se quede vieja. La mitigación es que actualizar cueste segundos, sin obligar a nadie, y que la última actualización de cada tarea sea visible.

## 5. Supuestos

- Un espacio único compartido. Varios equipos separados quedan fuera del MVP.
- Quien se registra entra en ese espacio compartido y ve y edita todo. Es un riesgo asumido para el MVP: es una demo con un caso de estudio, no un cliente real, así que no hay datos sensibles ni usuarios ajenos al equipo.
- Salvo "TODO" y "DONE", los estados son texto libre. El filtro por estado puede fragmentarse si cada persona escribe el mismo estado de forma distinta.

## Parte B: las tres líneas

1. **Los dos números.** La IA propuso 7 cosas dentro del alcance. Quedaron 7 dentro después del recorte.
2. **Tres cosas que dejé fuera, y por qué.**
   - **Filtrar por responsable ("mis tareas"):** no ayuda a validar que ver el estado de todos evite el trabajo duplicado, que se comprueba con la lista completa.
   - **Permisos por tarea y "soltar" una tarea:** no ayudan a validar que un estado visible para todos sustituya la ronda de "¿en qué estás?". La hipótesis es que en un equipo de 3 a 10 personas de confianza no hace falta control fino.
   - **Varios equipos, o gente en más de uno:** no ayuda a validar si un espacio compartido evita el trabajo duplicado, que es la hipótesis central.
3. **La exclusión de la que menos seguro estoy: más estados fijos.** Solo definí "TODO" y "DONE" como estados fijos, y el resto es texto libre. Para filtrar y para ver el estado de un vistazo, probablemente no valga, y habrá que definir más estados fijos. Lo que se contradecía: lo barato (texto libre, sin configuración ni rituales, que es lo que prometo frente a Jira) contra lo que valida (un filtro y una lista que se leen de un vistazo necesitan valores consistentes). Entraría si, en el uso real, el filtro por estado se fragmenta ("en curso", "doing"...) o el equipo pide filtrar por un estado intermedio.
