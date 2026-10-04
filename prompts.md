# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Nota sobre este fichero: los prompts 3 a 7, 9, 10, 26, 28, 33 y 35 no se escribieron a mano. Son las
respuestas que se eligieron en las preguntas con opciones que lanzó el agente (`AskUserQuestion`), y se
copian tal como quedaron registradas. El resto son los mensajes escritos a mano, con sus faltas.

---

## Prompt 1

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Lee el repo, y mapea todas las capabilities que hay y el modelo actual de datos (un ER de las entidades con sus relaciones). No hagas/propongas ningún cambio. Solo queremos un mapa con lo que tiene en este momento
```

**Qué salió:** funcionó a la primera. Antes de este prompt se cambió el modelo con `/model`.

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Actua como un PM y vamos a crear un PRD para este proyecto. Puedes basarte en el mapa que acabamos de contruir. La idea de FlowSync es que sea un sistema que permita mantener a los usuarios que trabajan en equipos remotos, alineados sabiendo en que esta trabajando cada uno de ellos y asi poder evitar la daily. La idea es un poco como Jira pero mas en tiempo real. No implementes nada. Basate en el actual repo y vamos a construir ese PRD siguiendo ronda de preguntas. No asumas nada. Pregunta siempre. Es un PRD asi que no entres en detalle tecnico.
```

**Qué salió:** el agente abrió varias rondas de preguntas, no una sola de cinco como pide el README.

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"¿Quién es el usuario principal de FlowSync?"="Tanto el manager como los miembros del equipo", "¿Qué tipo de equipos remotos tienen en mente?"="Varios equipos en una misma organización", "¿Cómo sabremos que FlowSync ha eliminado la daily con éxito?"="Se cancela/reduce la daily", "¿Qué significa 'más en tiempo real que Jira' para vosotros?"="Ver el estado del equipo actualizado al instante"
```

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"¿Cuál es la unidad básica de trabajo que un miembro comparte con su equipo?"="Tarea (estilo ticket de Jira)", "¿Cómo se organizan las personas en la organización?"="Aún por decidir", "¿Qué visibilidad debe haber entre equipos?"="Cada equipo solo ve lo suyo", "¿Qué es lo mínimo que tiene que existir en la primera versión (MVP)?"="Ver en vivo qué hace cada miembro de mi equipo, Resumen para el manager (qué pasó hoy/ayer)"
```

## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"El MVP no incluye crear equipos ni invitar miembros, pero para "ver a mi equipo" alguien tiene que formarlos. ¿Cómo entran las personas a un equipo en el MVP?"="Un equipo único por ahora", "¿Qué ciclo de vida tiene una tarea?"="Simple: Por hacer / En curso / Hecha", "¿Quién puede crear y asignar tareas?"="Cualquier miembro, a cualquiera del equipo", "¿Puede una persona estar trabajando en varias tareas a la vez?"="Varias, pero una marcada como foco actual"
```

## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"Con un equipo único en el MVP, ¿hay diferencia de rol entre manager y miembro?"="Aún por decidir", "¿Qué debe contener el resumen de "qué pasó hoy/ayer"?"="Tareas completadas por persona, Tareas en curso y foco actual", "¿Debe avisar el producto activamente de los cambios (notificaciones)?"="No, solo se ve al abrir la app", "¿En qué contexto se va a validar el MVP?"="Demo / uso interno del curso"
```

## Prompt 7

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"¿Qué información lleva una tarea en el MVP?"="Título, Descripción, Responsable, Prioridad o fecha límite", "¿Qué dejamos explícitamente fuera del MVP (no-objetivos)?"="Varios equipos y organizaciones, "Integraciones (Slack, Git, Jira)"", "¿Cómo se define "hoy/ayer" en el resumen, dado que son equipos remotos?"="Últimas 24 h móviles", "¿En qué formato y dónde quieres el PRD cuando lo cerremos?"="Fichero Markdown en el repo"
```

**Qué salió:** la opción "Prioridad o fecha límite" juntaba dos conceptos y la respuesta fue ambigua. Hizo falta repreguntar (prompts 8 y 9). Después se rechazó una pregunta del agente, porque el usuario quería aclararla.

## Prompt 8

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
no entiendo la pregunta que me acabas de formular respecto a Prioridad o fecha limite.
```

**Qué salió:** la pregunta anterior estaba mal planteada. El agente la separó en dos conceptos.

## Prompt 9

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"¿Qué campos extra debe tener una tarea en el MVP, además de título, descripción y responsable?"="Solo fecha límite"
```

## Prompt 10

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"Los comentarios/chat en las tareas y el concepto de "bloqueo" (marcar una tarea como bloqueada) no los marcaste como fuera del MVP, pero tampoco los pediste. ¿Qué hago con ellos en el PRD?"="Fuera del MVP, citados como futuro", "Para guardar el PRD como fichero en el repo, CLAUDE.md pide crear una rama, hacer commit y abrir un PR. ¿Cómo quieres que lo haga?"="Enséñamelo primero en el chat"
```

## Prompt 11

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Guárdalo en el repo con rama docs/prd/alcance-mvp-egv777.md, la rama llamada alcance-mvp pero no hagas commit aun
```

**Qué salió:** el mensaje mezclaba la ruta del fichero con la rama. El agente interpretó la ruta como el fichero y `alcance-mvp` como la rama. Más tarde hubo que renombrar ambas.

## Prompt 12

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
veo que has hecho cambios en schemas.ts, por que?
```

**Qué salió:** el cambio no lo hizo el agente: ya estaba en el árbol de trabajo al empezar la sesión.

## Prompt 13

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
haz commit solo del PRD
```

## Prompt 14

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
abre el PR con la descripción completa y vamos con la revision adversarial
```

## Prompt 15

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
sobre el PRD ajustalo a la ficha del README. de momento la parte 2 la postponemos, faltan cosas
```

## Prompt 16

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
porque dices que no has añadido una funcion de que cambió desde la ultima vez. ¿es que hay que añadirlo?
```

## Prompt 17

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
pdorias renombrar la rama mientrpodrías renombrar la rama mientras tanto a alcance-egv
```

## Prompt 18

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
haz la Opción 1
```

**Qué salió:** no funcionó. El sistema de permisos bloqueó el borrado de la rama remota por considerarlo destructivo.

## Prompt 19

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
I've deleted alcance-mvp. we only need to push alcance-egv
```

## Prompt 20

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
commit del PRD y abre el PR
```

## Prompt 21

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Pregunta 1. Estado "sin asignar". Solo un filtro por el momento, el de estado. Si va "el que cambio desde la ultima vez. De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros. Ningun campo es obligatorio. Si unifica el nombre del fichero
```

**Qué salió:** no cerró todo. La respuesta no nombraba los estados y el agente intentó preguntarlos, pero el usuario rechazó la pregunta para aclararla (siguiente prompt).

## Prompt 22

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Sin asignar es el unico estado definido. El resto de estados los escribe el responsable
```

## Prompt 23

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
commit y actualiza el PR
```

## Prompt 24

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
S
```

## Prompt 25

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
vamos a verla una a una
```

## Prompt 26

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"¿Puede un miembro cambiar el estado de una tarea cuyo responsable es otra persona?"="Solo si la tarea está 'Sin asignar'"
"¿Cómo reconcilio la promesa de que 'quien actualiza cobra en el momento' con tener un solo filtro por estado?"="Rebajar la promesa"
"¿Qué regla relaciona el estado 'Sin asignar' con el responsable?"="Son independientes"
"¿Cómo se reconcilia el estado de texto libre con 'dos clics' y con filtrar por estado?"="Quitar 'dos clics' del PRD"
```

**Qué salió:** la respuesta "Son independientes" se corrigió después, en el prompt 31: "Sin asignar" pasó a ser el valor del responsable y no un estado.

## Prompt 27

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
seguimos con las medias
```

## Prompt 28

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"¿Qué dice el PRD sobre quién puede entrar al espacio compartido?"="Asumido para el MVP, declarado como riesgo"
"¿Qué señal de información vieja incluye el MVP?"="Mostrar cuándo se actualizó cada tarea por última vez"
"¿Qué ve alguien en su primera visita, cuando aún no tiene 'última visita'?"="Nada aparece marcado", "¿Qué cuenta como 'visita' para que la marca se reinicie?"="Cada vez que abre la lista", "¿Se muestra a los demás cuándo vio alguien la lista por última vez?"="No, es un dato privado"
"¿Quién puede ser responsable de una tarea?"="Cualquier usuario registrado", "¿En qué estado nace una tarea nueva?"="'Sin asignar'"
```

**Qué salió:** la respuesta "Cada vez que abre la lista" para reiniciar las marcas se cambió más tarde (prompt 33), porque recargar la página las borraba.

## Prompt 29

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
commit y actualiza el PR
```

## Prompt 30

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
pasalo si
```

## Prompt 31

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
La tarea se crea "Sin asignar" es decir, no tiene responsable, en el momento que se asigna uno, "Sin asignar" desparece. Es decir "Sin asignar" no es un campo, es el valor del campo responsable.Por otro lado, el desarrollador que coge la tarea, se la asignará, el campo resonsable pasará a tener su nombre. El desarrollador deberá en ese momento actualizar el estado.
```

## Prompt 32

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
   1. Cualquier desarrollador puede cambiar el tiutlo y la fecha de la tarea. 2. Si. 3. Una tarea sin asignar esta en el estado TODO por defecto.Sobre el tema de las marcas no entiendo bien cual es el problema
```

**Qué salió:** el agente había descrito el problema de las marcas sin un ejemplo, y no se entendió. Lo repitió con un ejemplo.

## Prompt 33

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"¿Cuándo se reinician las marcas de 'cambiado desde tu última visita'?"="Cuando la persona las da por vistas"
"Si alguien cambia una tarea mientras tienes la lista abierta, ¿se marca?"="Sí, se marca al instante", "Si tú cambias una tarea, ¿se te marca a ti?"="No, solo cambios de otras personas", "¿Qué cuenta como 'cambiado' para la marca?"="Cualquier cambio de la tarea, y tareas nuevas", "Cuando el responsable suelta una tarea, ¿qué estado queda?"="Vuelve a 'TODO'"
```

## Prompt 34

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
no continuemos con los putnos medios. Hazme las preguntas claras usando UserAskQuestions
```

## Prompt 35

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
"Con estados de texto libre, no existe el estado 'hecho'. ¿Cómo se define 'pendiente' (filtro) y 'pasado de plazo'?"="Añadir 'DONE' como segundo estado definido", "La Propuesta de valor dice 'quien actualiza su tarea cobra en el momento', pero ver qué está libre lo obtiene también quien no actualiza. ¿Qué hago con esa frase?"="Quitarla", "Cuatro exclusiones terminan en una restricción y no en una hipótesis (filtrar por responsable, roles avanzados, Slack, sprints). ¿Cómo las trato?"="Las reescribo yo con hipótesis y tú las revisas", "Como ningún campo es obligatorio, puede haber tareas sin título. ¿Qué muestra la lista en ese caso?"="Un texto como 'Sin título'"
```

## Prompt 36

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
commit y actualiza el PR
```

## Prompt 37

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
haz push
```

**Qué salió:** no hizo falta. El commit ya se había subido al actualizar el PR.

## Prompt 38

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
con mis respuestas, propon el alcance del MVP: problema, propuesta de valor, usuarios, alcance, y no alcance. Se agresivo recortando: es un MVP, no un producto final. Justifica cada exclusion
```

**Qué salió:** propuso 7 cosas dentro del alcance y 3 recortes nuevos, incluso algunos que contradecían decisiones anteriores (marcas, permisos).

## Prompt 39

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
entiendo que tengo que meter este alcance dentro del mvp, o al menos es lo que entiendo leyendo el README. esoty equivocado?
```

## Prompt 40

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
aplica la propuesta al PRD
```

## Prompt 41

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
falta poner debajo del alcance los puentos que se detallan en el README, Parte B. 1. Cuantas coas porpusiste y cuantas quedaron. 2. Tres cosas que deje fuera y por qué. el punto 3 lo voy a pensar, pero lo otro lo tienes, asi que lo puedes añadir
```

## Prompt 42

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
para el punto 3, vamos a poner que lo que de lo que menos seguro estoy es en el manejo de los estado. Solo hemos definido TODO y DONE como fijos, el resto es texto libre y para tema de filtrado y demas probablemente no valga y haya que definir mas estados fijos
```

## Prompt 43

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
commit y actualiza PR
```

## Prompt 44

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
nos falta el fichero prompts.md, crealo tal y como se indica en la raiz del proyecto y coge todos los prompts que te he dado en esta sesión y añadelos al fichero
```

## Prompt 45

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
commit y actualiza PR
```
