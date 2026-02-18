import { Category, LeagueTier, Mission } from './types';

// URL de la imagen del cómic por defecto (fallback).
const COMIC_IMAGE_URL = "https://img.freepik.com/free-vector/pixel-art-detective-investigation-scene_23-2148064371.jpg?w=1380&t=st=1708960000~exp=1708960600~hmac=e7c8e7b8e7b8e7b8";

export const LEAGUES: Record<LeagueTier, { color: string; icon: string; minXP: number }> = {
  Bronze: { color: 'text-amber-700 bg-amber-100 border-amber-200', icon: 'Shield', minXP: 0 },
  Silver: { color: 'text-slate-600 bg-slate-100 border-slate-200', icon: 'Shield', minXP: 500 },
  Gold: { color: 'text-yellow-600 bg-yellow-100 border-yellow-200', icon: 'Shield', minXP: 1500 },
  Platinum: { color: 'text-cyan-600 bg-cyan-100 border-cyan-200', icon: 'Shield', minXP: 3000 },
  Diamond: { color: 'text-indigo-600 bg-indigo-100 border-indigo-200', icon: 'Crown', minXP: 5000 },
};

export const INITIAL_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Daily Grinder', description: 'Complete 3 practice exercises today.', xpReward: 50, type: 'daily', goal: 3, progress: 0, completed: false, icon: 'Zap' },
  { id: 'm2', title: 'Perfect Score', description: 'Get 100% in any Exam mode.', xpReward: 100, type: 'weekly', goal: 1, progress: 0, completed: false, icon: 'Target' },
  { id: 'm3', title: 'Consistency King', description: 'Login 5 days in a row.', xpReward: 200, type: 'weekly', goal: 5, progress: 0, completed: false, icon: 'Calendar' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'verb-tenses',
    title: 'Verb Tenses',
    description: 'Aprende y domina los tiempos verbales con teoría resumida y práctica estilo selectividad.',
    color: 'bg-red-500',
    topics: [
      {
        id: 'tense-structure',
        title: 'Verb Tenses - Overview',
        description: 'Resumen rápido de la formación y uso de los tiempos.',
        icon: 'BookOpen',
        manualTheory: `# Verb Tenses: Overview
        
Una guía rápida para no perderte con la estructura de los verbos.
        
## 1. Simple Tenses (Hechos, hábitos, completado)
* **Present Simple:** Sujeto + Verbo (+s/es). *Habits, truths.*
* **Past Simple:** Sujeto + Verbo-ed/2ª col. *Finished actions.*
* **Future Simple:** Will + Verbo. *Decisions, predictions.*

## 2. Continuous Tenses (En progreso)
Siempre llevan el verbo **TO BE** + Verbo-**ING**.
* **Present Cont:** am/is/are + doing. *Now.*
* **Past Cont:** was/were + doing. *Specific moment in past.*

## 3. Perfect Tenses (Conexión, antes de)
Siempre llevan el verbo **HAVE** + **Participio (3ª col)**.
* **Present Perf:** have/has + done. *Past connecting to now.*
* **Past Perf:** had + done. *Past before another past.*

> **Pildora Clave:**
> Si ves "Continuous", busca el **-ING**.
> Si ves "Perfect", busca el **HAVE + Participio**.
        `,
        manualQuestions: [
          { id: 'vt1', text: "By the time she arrived, I ___ (wait) for hours.", options: ["had been waiting", "have waited", "am waiting", "wait"], correctAnswer: "had been waiting", explanation: "Past Perfect Continuous: Acción duradera anterior a otra acción pasada." },
          { id: 'vt2', text: "Look at the clouds! It ___ (rain) soon.", options: ["is going to rain", "rains", "rained", "has rained"], correctAnswer: "is going to rain", explanation: "Futuro con evidencia visual (Going to)." },
          { id: 'vt3', text: "While I ___ (cook), the lights went out.", options: ["was cooking", "cooked", "am cooking", "have cooked"], correctAnswer: "was cooking", explanation: "Past Continuous: Acción larga interrumpida por una corta." },
          { id: 'vt4', text: "I ___ (know) him since we were children.", options: ["have known", "know", "am knowing", "knew"], correctAnswer: "have known", explanation: "Present Perfect: Acción que empieza en el pasado y continúa (Since). 'Know' es stative verb." },
          { id: 'vt5', text: "Next year, we ___ (live) in this house for 20 years.", options: ["will have been living", "are living", "will live", "have lived"], correctAnswer: "will have been living", explanation: "Future Perfect Continuous: Duración proyectada hacia el futuro." },
          { id: 'vt6', text: "She usually ___ (go) to the gym, but today she is resting.", options: ["goes", "is going", "went", "has gone"], correctAnswer: "goes", explanation: "Hábito/Rutina = Present Simple." },
          { id: 'vt7', text: "The train ___ (leave) at 9:00 PM tonight.", options: ["leaves", "will leave", "is leaving", "has left"], correctAnswer: "leaves", explanation: "Horarios oficiales (Timetables) = Present Simple con valor de futuro." },
          { id: 'vt8', text: "I promise I ___ (call) you later.", options: ["will call", "am calling", "call", "going to call"], correctAnswer: "will call", explanation: "Promesas = Will." },
          { id: 'vt9', text: "When we got to the station, the train ___ (already/leave).", options: ["had already left", "has already left", "already left", "was leaving"], correctAnswer: "had already left", explanation: "Past Perfect: Pasado del pasado." },
          { id: 'vt10', text: "They ___ (play) football when it started to snow.", options: ["were playing", "played", "have played", "had played"], correctAnswer: "were playing", explanation: "Past Continuous: Contexto de fondo interrumpido." }
        ]
      },
      {
        id: 'present-tenses',
        title: 'Present Simple vs Continuous',
        description: 'Hábitos vs Acciones en curso. Stative Verbs.',
        icon: 'Repeat',
        manualTheory: `# Present Simple vs Continuous 🔄

## 1. Present Simple (Rutinas y Verdades)
Se usa para cosas que son **siempre verdad** o **rutinas**.
*   **Keywords:** Always, usually, often, every day, on Mondays.
*   *Example:* "I **play** tennis every Sunday." (Es mi rutina).

## 2. Present Continuous (Ahora mismo)
Se usa para cosas que están pasando **en este momento** o **temporalmente**.
*   **Keywords:** Now, at the moment, currently, this week.
*   *Example:* "I **am playing** tennis right now." (Me estás viendo hacerlo).

## 3. Stative Verbs (¡OJO! ⚠️)
Hay verbos que **NO** se suelen usar en continuo porque describen estados, no acciones.
*   *Verbos de mente:* Know, understand, believe, think (opinión).
*   *Verbos de sentimiento:* Like, love, hate, want, need.
*   *Verbos de sentido:* See, hear, smell, taste.
*   *Posesión:* Have (tener), own, belong.

> **Incorrecto:** I am knowing the answer. ❌
> **Correcto:** I **know** the answer. ✅

---

## 4. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Simple):** A postman delivering letters. "He **delivers** letters every day." (Su trabajo).
*   **Panel 2 (Continuous):** The postman eating a burger. "But today, he **is eating** lunch." (Lo que hace ahora).`,
        manualQuestions: [
          { id: 'ps1', text: "Listen! Somebody ___ (play) the guitar.", options: ["is playing", "plays", "played", "has played"], correctAnswer: "is playing", explanation: "'Listen!' indica que está ocurriendo ahora mismo." },
          { id: 'ps2', text: "She usually ___ (drink) coffee, but today she ___ (drink) tea.", options: ["drinks / is drinking", "is drinking / drinks", "drank / drinks", "drinks / drinks"], correctAnswer: "drinks / is drinking", explanation: "Rutina (Simple) vs Excepción hoy (Continuous)." },
          { id: 'ps3', text: "I ___ (not/understand) this question.", options: ["don't understand", "am not understanding", "didn't understand", "not understand"], correctAnswer: "don't understand", explanation: "Understand es un 'Stative Verb', no suele ir en continuo." },
          { id: 'ps4', text: "Water ___ (boil) at 100 degrees Celsius.", options: ["boils", "is boiling", "boiled", "has boiled"], correctAnswer: "boils", explanation: "Hecho científico (Verdad universal) = Present Simple." },
          { id: 'ps5', text: "Look! The bus ___ (come).", options: ["is coming", "comes", "came", "will come"], correctAnswer: "is coming", explanation: "'Look!' indica acción en progreso visual." },
          { id: 'ps6', text: "We ___ (stay) at a hotel this week because our house is being painted.", options: ["are staying", "stay", "stayed", "have stayed"], correctAnswer: "are staying", explanation: "Situación temporal ('this week') = Present Continuous." },
          { id: 'ps7', text: "What ___ (you/do)? You look serious.", options: ["are you thinking", "do you think", "think you", "are you think"], correctAnswer: "are you thinking", explanation: "Actividad mental activa en el momento ('en qué estás pensando'). Si fuera opinión sería 'What do you think of...'." },
          { id: 'ps8', text: "He ___ (have) a shower right now.", options: ["is having", "has", "had", "having"], correctAnswer: "is having", explanation: "'Have' como acción (ducharse) SÍ admite continuo. Como posesión no." },
          { id: 'ps9', text: "They ___ (not/believe) in ghosts.", options: ["don't believe", "aren't believing", "not believe", "didn't believe"], correctAnswer: "don't believe", explanation: "Believe es Stative Verb." },
          { id: 'ps10', text: "Every summer we ___ (visit) our grandparents.", options: ["visit", "are visiting", "visited", "have visited"], correctAnswer: "visit", explanation: "Rutina periódica." }
        ]
      },
      {
        id: 'past-tenses',
        title: 'Past Simple vs Continuous',
        description: 'Acciones terminadas vs Acciones en desarrollo e interrupciones.',
        icon: 'History',
        manualTheory: `# Past Simple vs Continuous 🔙

## 1. Past Simple (La acción completa)
Se usa para acciones que **empezaron y terminaron** en un momento específico del pasado.
*   **Estructura:** Verbo-ed (regulares) o 2ª columna (irregulares).
*   *Example:* "I **watched** a film yesterday." (La vi entera).

## 2. Past Continuous (El escenario)
Se usa para describir una acción que estaba **en progreso** en un momento del pasado. Establece la escena.
*   **Estructura:** Was/Were + Verbo-ing.
*   *Example:* "At 8pm, I **was watching** TV." (Estaba en medio de hacerlo).

## 3. La Interrupción (When & While) ⚡
Es muy común combinar ambos. Una acción larga (Continuous) es interrumpida por una corta (Simple).
*   **While** + Past Continuous (La acción larga).
*   **When** + Past Simple (La interrupción).

*   *Example:* "I **was sleeping** (larga) when the phone **rang** (corta)."

---

## 4. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Continuous):** A person sleeping peacefully. "He **was sleeping**..."
*   **Panel 2 (Interruption):** An alarm clock ringing loudly and the person jumping. "...when the alarm **rang**."`,
        manualQuestions: [
          { id: 'pst1', text: "I ___ (walk) down the street when I met Dave.", options: ["was walking", "walked", "am walking", "have walked"], correctAnswer: "was walking", explanation: "Acción en progreso interrumpida." },
          { id: 'pst2', text: "She ___ (break) her leg while she was skiing.", options: ["broke", "was breaking", "break", "broken"], correctAnswer: "broke", explanation: "Acción puntual (romperse) que interrumpe." },
          { id: 'pst3', text: "When I arrived, they ___ (have) dinner.", options: ["were having", "had", "have", "are having"], correctAnswer: "were having", explanation: "Ya estaban cenando cuando llegué (acción en progreso)." },
          { id: 'pst4', text: "It ___ (not/rain) when we went out.", options: ["wasn't raining", "didn't rain", "not rained", "hasn't rained"], correctAnswer: "wasn't raining", explanation: "Descripción del ambiente/tiempo en un momento pasado." },
          { id: 'pst5', text: "What ___ (you/do) at 10pm last night?", options: ["were you doing", "did you do", "do you do", "have you done"], correctAnswer: "were you doing", explanation: "Pregunta por una actividad en un momento específico." },
          { id: 'pst6', text: "He ___ (wear) a blue suit at the party.", options: ["was wearing", "wore", "wears", "has worn"], correctAnswer: "was wearing", explanation: "Descripción de vestimenta en el pasado." },
          { id: 'pst7', text: "I ___ (see) an accident while I was waiting for the bus.", options: ["saw", "was seeing", "seen", "see"], correctAnswer: "saw", explanation: "See (ver) es percepción puntual. Was seeing sería 'estaba visitando/saliendo con'." },
          { id: 'pst8', text: "While Mom was cooking, Dad ___ (read) the paper.", options: ["was reading", "read", "reads", "is reading"], correctAnswer: "was reading", explanation: "Dos acciones largas paralelas (Simultáneas)." },
          { id: 'pst9', text: "The music was loud, so I ___ (not/hear) the phone.", options: ["didn't hear", "wasn't hearing", "not hear", "haven't heard"], correctAnswer: "didn't hear", explanation: "Hear es stative (percepción), no suele ir en continuo. Acción negativa puntual." },
          { id: 'pst10', text: "She ___ (stand) up, took her bag and left.", options: ["stood", "was standing", "stands", "has stood"], correctAnswer: "stood", explanation: "Secuencia de acciones cortas consecutivas (Lista de hechos) = Past Simple." }
        ]
      },
      {
        id: 'perfect-vs-past',
        title: 'Present Perfect vs Past Simple',
        description: '¿Tiempo terminado o no terminado? Experiencias vs Fechas.',
        icon: 'GitBranch',
        manualTheory: `# Present Perfect vs Past Simple ⏳

La eterna duda. La clave está en **CUÁNDO** ocurrió la acción.

## 1. Past Simple (Tiempo Terminado) 🏁
Sabemos exactamente cuándo pasó y ese tiempo ya se acabó.
*   **Keywords:** Yesterday, last week, in 1999, 2 days ago, when I was young.
*   *Example:* "I **lived** in Paris in 2010." (Ya no vivo allí, 2010 acabó).

## 2. Present Perfect (Tiempo No Terminado / Conexión) 🔗
No importa cuándo pasó, o el tiempo aún no ha terminado.
*   **Keywords:** Just, already, yet, ever, never, for, since, recently, today (si aún es hoy).
*   *Example:* "I **have lived** in Paris for 5 years." (Sigo viviendo allí).
*   *Example:* "I **have lost** my keys." (No importa cuándo, lo que importa es que AHORA no las tengo).

## 3. Been vs Gone 🚶‍♂️
*   **He has gone:** Se ha ido (y no ha vuelto, no está aquí).
*   **He has been:** Ha estado (fue y volvió, ya está aquí).

> **Truco:** Si puedes preguntar "¿Cuándo?" y la respuesta es una fecha concreta pasada -> **Past Simple**.

---

## 4. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Past Simple):** *Gravestone RIP 1990.* "Shakespeare **wrote** Hamlet." (Está muerto, no puede escribir más).
*   **Panel 2 (Present Perfect):** *JK Rowling alive.* "JK Rowling **has written** Harry Potter." (Está viva, su carrera continúa/impacto presente).`,
        manualQuestions: [
          { id: 'pp1', text: "I ___ (lose) my keys. Can you help me look for them?", options: ["have lost", "lost", "lose", "am losing"], correctAnswer: "have lost", explanation: "Consecuencia presente: no las tengo ahora." },
          { id: 'pp2', text: "She ___ (visit) Paris in 2015.", options: ["visited", "has visited", "visits", "was visiting"], correctAnswer: "visited", explanation: "Fecha concreta terminada (in 2015)." },
          { id: 'pp3', text: "___ (you/ever/eat) sushi?", options: ["Have you ever eaten", "Did you ever eat", "Do you ever eat", "Were you eating"], correctAnswer: "Have you ever eaten", explanation: "Experiencia de vida (tiempo no específico)." },
          { id: 'pp4', text: "I ___ (not/finish) my homework yet.", options: ["haven't finished", "didn't finish", "not finished", "don't finish"], correctAnswer: "haven't finished", explanation: "Yet = Present Perfect." },
          { id: 'pp5', text: "Shakespeare ___ (write) many plays.", options: ["wrote", "has written", "writes", "was writing"], correctAnswer: "wrote", explanation: "Sujeto histórico fallecido = Past Simple." },
          { id: 'pp6', text: "We ___ (live) here since 2010.", options: ["have lived", "lived", "live", "are living"], correctAnswer: "have lived", explanation: "Since = Empezó en pasado y continúa." },
          { id: 'pp7', text: "My parents ___ (get) married 20 years ago.", options: ["got", "have got", "get", "were getting"], correctAnswer: "got", explanation: "Ago = Past Simple." },
          { id: 'pp8', text: "Ow! I ___ (cut) my finger.", options: ["have cut", "cut", "cutted", "was cutting"], correctAnswer: "have cut", explanation: "Acción reciente con resultado visible/doloroso ahora." },
          { id: 'pp9', text: "___ (you/see) Mary yesterday?", options: ["Did you see", "Have you seen", "Do you see", "Were you seeing"], correctAnswer: "Did you see", explanation: "Yesterday = Past Simple." },
          { id: 'pp10', text: "She is not here. She ___ (go) to the bank.", options: ["has gone", "has been", "went", "goes"], correctAnswer: "has gone", explanation: "Has gone = Se fue y no ha vuelto." }
        ]
      },
      {
        id: 'pres-perf-cont',
        title: 'Present Perfect Continuous vs Simple',
        description: 'Actividad vs Resultado. Duración (How long) vs Cantidad (How many).',
        icon: 'Flame',
        manualTheory: `# Present Perfect Continuous 🔥

Este tiempo se centra en la **ACTIVIDAD** y el **TIEMPO** que has pasado haciéndola.

## 1. La Estructura 🏗️
*   **Sujeto + HAVE/HAS BEEN + Verbo-ING**
*   *Example:* "I **have been running**."

## 2. Uso: Actividad vs Resultado 🆚

### Continuous (La Actividad/Duración) 🏃‍♂️
Se usa cuando nos interesa el proceso o cuánto tiempo ha durado.
*   **Pregunta:** *How long?*
*   **Énfasis:** Estaba ocupado haciendo esto (puede que haya terminado o no).
*   **Efecto visible:** "You are sweating." -> "Yes, I **have been running**." (Explica el estado actual).
*   *Example:* "I **have been cleaning** the house all day." (¡Estoy cansado!).

### Simple (El Resultado/Cantidad) ✅
Se usa cuando la acción está **completada** y nos interesa el resultado.
*   **Pregunta:** *How many/much?* *What have you done?*
*   **Énfasis:** La tarea está acabada.
*   *Example:* "I **have cleaned** the kitchen." (Está limpia ahora).
*   *Example:* "He **has eaten** 3 apples." (Cantidad = Simple).

> **OJO:** Los *Stative Verbs* (know, like, believe) **NO** suelen ir en continuo.
> *   ✅ "I have known him for years."
> *   ❌ "I have been knowing him."

---

## 3. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Continuous):** *Person covered in paint.* "I **have been painting** the room." (Proceso sucio, quizás no acabó).
*   **Panel 2 (Simple):** *A beautifully painted room, clean person.* "I **have painted** the room." (Trabajo terminado).`,
        manualQuestions: [
          { id: 'ppc1', text: "You are covered in mud! What ___ (you/do)?", options: ["have you been doing", "have you done", "did you do", "do you do"], correctAnswer: "have you been doing", explanation: "Efecto visible inmediato (barro) -> Continuous." },
          { id: 'ppc2', text: "I ___ (write) 5 emails this morning.", options: ["have written", "have been writing", "wrote", "write"], correctAnswer: "have written", explanation: "Cantidad (5 emails) = Resultado -> Simple." },
          { id: 'ppc3', text: "How long ___ (you/learn) English?", options: ["have you been learning", "have you learned", "do you learn", "are you learning"], correctAnswer: "have you been learning", explanation: "How long + Acción que continúa -> Continuous." },
          { id: 'ppc4', text: "I ___ (know) her since 2010.", options: ["have known", "have been knowing", "know", "knew"], correctAnswer: "have known", explanation: "Know es un Stative Verb, no admite continuo." },
          { id: 'ppc5', text: "Sorry I'm late. ___ (you/wait) long?", options: ["Have you been waiting", "Have you waited", "Did you wait", "Do you wait"], correctAnswer: "Have you been waiting", explanation: "Énfasis en la duración de la espera." },
          { id: 'ppc6', text: "Look! He ___ (repair) the car. It works now.", options: ["has repaired", "has been repairing", "repaired", "repairs"], correctAnswer: "has repaired", explanation: "Resultado completado (It works now)." },
          { id: 'ppc7', text: "It ___ (rain) all day. The streets are wet.", options: ["has been raining", "has rained", "rained", "rains"], correctAnswer: "has been raining", explanation: "All day + Efecto presente -> Continuous." },
          { id: 'ppc8', text: "She ___ (play) tennis three times this week.", options: ["has played", "has been playing", "played", "plays"], correctAnswer: "has played", explanation: "Frecuencia/Cantidad (3 times) -> Simple." },
          { id: 'ppc9', text: "The kitchen is a mess because I ___ (cook).", options: ["have been cooking", "have cooked", "cooked", "cook"], correctAnswer: "have been cooking", explanation: "Actividad causante del desorden (proceso)." },
          { id: 'ppc10', text: "I ___ (read) this book, but I haven't finished it yet.", options: ["have been reading", "have read", "read", "am reading"], correctAnswer: "have been reading", explanation: "Incompleto -> Continuous." }
        ],
        examQuestions: [
          { id: 'e_ppc1', text: "Make a question using 'How long': (they / play / football)", options: [], correctAnswer: "How long have they been playing football?", explanation: "How long implies continuous." },
          { id: 'e_ppc2', text: "Rewrite: He started working here 5 years ago and he still works here. (Use Present Perfect Continuous)", options: [], correctAnswer: "He has been working here for 5 years.", explanation: "Action continuing from past to present." },
          { id: 'e_ppc3', text: "Explain the difference: 'I've read the book' vs 'I've been reading the book'.", options: [], correctAnswer: "I've read implies finished. I've been reading implies incomplete or ongoing.", explanation: "Completion vs Duration." },
          { id: 'e_ppc4', text: "Correct the mistake: I have been knowing him for a long time.", options: [], correctAnswer: "I have known him for a long time.", explanation: "Stative verb 'know'." },
          { id: 'e_ppc5', text: "Combine: It started raining an hour ago. It is still raining. (Use 'for')", options: [], correctAnswer: "It has been raining for an hour.", explanation: "Continuous duration." }
        ]
      },
      {
        id: 'past-perfect-simple',
        title: 'Past Perfect vs Past Simple',
        description: 'La secuencia de eventos. El pasado del pasado.',
        icon: 'History',
        manualTheory: `# Past Perfect vs Past Simple ⏪

Usamos el **Past Perfect** para dejar claro que una acción ocurrió **antes** que otra acción en el pasado.

## 1. La Línea del Tiempo 📏
Imagina dos acciones en el pasado:
1.  **Acción 1 (Más antigua):** Past Perfect (*had + participle*).
2.  **Acción 2 (Más reciente):** Past Simple (*regular/irregular verb*).
3.  **AHORA**

*   *Example:* "When I **arrived** (2) at the party, Paul **had left** (1)."
    *   (Paul se fue *antes* de que yo llegara. No le vi).

*   *Compare with:* "When I **arrived** (2), Paul **left** (2b)."
    *   (Llegué y entonces él se fue. Sí le vi).

## 2. Keywords 🔑
*   **By the time:** Para cuando...
*   **After / Before:** Después / Antes.
*   **Already:** Ya.
*   **Because:** Porque (explica la causa anterior).

> **Estructura:** Subject + **HAD** + **Participio** (3ª columna).

---

## 4. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Past Simple sequence):** *Man opens door -> Cat runs out.* "When he **opened** the door, the cat **ran** out." (Secuencia).
*   **Panel 2 (Past Perfect):** *Man opens door -> Room is empty.* "When he **opened** the door, the cat **had run** out." (Ya había ocurrido).`,
        manualQuestions: [
          { id: 'pps1', text: "When we got to the cinema, the film ___ (start).", options: ["had started", "started", "has started", "was starting"], correctAnswer: "had started", explanation: "La película empezó antes de llegar (Pasado del Pasado)." },
          { id: 'pps2', text: "I couldn't get on the flight because I ___ (forget) my passport.", options: ["had forgotten", "forgot", "have forgotten", "was forgetting"], correctAnswer: "had forgotten", explanation: "La causa (olvidar) ocurrió antes de la consecuencia (no subir)." },
          { id: 'pps3', text: "She told me she ___ (visit) Germany before.", options: ["had visited", "visited", "visits", "has visited"], correctAnswer: "had visited", explanation: "Reported speech / Acción previa al momento de hablar en pasado." },
          { id: 'pps4', text: "The grass was yellow because it ___ (not/rain) for months.", options: ["hadn't rained", "didn't rain", "hasn't rained", "wasn't raining"], correctAnswer: "hadn't rained", explanation: "Causa anterior a un estado pasado." },
          { id: 'pps5', text: "By the time the police arrived, the thief ___ (escape).", options: ["had escaped", "escaped", "has escaped", "was escaping"], correctAnswer: "had escaped", explanation: "'By the time' suele introducir la acción 2, requiriendo Past Perfect para la acción 1." },
          { id: 'pps6', text: "I ___ (never/see) such a beautiful beach before I went to Thailand.", options: ["had never seen", "never saw", "have never seen", "didn't see"], correctAnswer: "had never seen", explanation: "Experiencia hasta un punto del pasado." },
          { id: 'pps7', text: "He was hungry because he ___ (not/eat) anything all day.", options: ["hadn't eaten", "didn't eat", "hasn't eaten", "wasn't eating"], correctAnswer: "hadn't eaten", explanation: "Causa anterior." },
          { id: 'pps8', text: "After I ___ (finish) my homework, I watched TV.", options: ["had finished", "finished", "have finished", "was finishing"], correctAnswer: "had finished", explanation: "Primero acabé, luego vi la tele. 'Finished' (Simple) también es aceptable con 'After', pero 'Had finished' enfatiza la compleción." },
          { id: 'pps9', text: "The waiter took my plate, but I ___ (not/finish).", options: ["hadn't finished", "didn't finish", "haven't finished", "not finished"], correctAnswer: "hadn't finished", explanation: "Acción no completada anterior a la acción del camarero." },
          { id: 'pps10', text: "When I turned on the radio, the news ___ (already/finish).", options: ["had already finished", "already finished", "has already finished", "was finishing"], correctAnswer: "had already finished", explanation: "Ya había acabado antes de encenderla." }
        ],
        examQuestions: [
          { id: 'e_pps1', text: "The train left. Then I arrived at the station. (Join using Past Perfect)", options: [], correctAnswer: "When I arrived at the station, the train had left.", explanation: "Sequence: Train leaves -> I arrive." },
          { id: 'e_pps2', text: "I didn't have any money because I lost my wallet. (Rewrite with Past Perfect)", options: [], correctAnswer: "I didn't have any money because I had lost my wallet.", explanation: "Cause (lost) happened before Effect (no money)." },
          { id: 'e_pps3', text: "She was hungry. She didn't eat all day. (Combine sentences)", options: [], correctAnswer: "She was hungry because she hadn't eaten all day.", explanation: "Past Perfect for the cause." },
          { id: 'e_pps4', text: "I watched the film. Then I read the book. (Use 'After')", options: [], correctAnswer: "After I had watched the film, I read the book.", explanation: "First action uses Past Perfect with After." },
          { id: 'e_pps5', text: "He didn't recognize her. She changed her hair. (Combine sentences)", options: [], correctAnswer: "He didn't recognize her because she had changed her hair.", explanation: "Change happened before the meeting." }
        ]
      },
      {
        id: 'past-perf-cont',
        title: 'Past Perfect Continuous',
        description: 'La causa de un estado pasado. Duración antes de otro momento pasado.',
        icon: 'Clock',
        manualTheory: `# Past Perfect Continuous 🕰️

Es el "pasado del pasado"... pero en proceso.

## 1. La Estructura 🏗️
*   **Sujeto + HAD BEEN + Verbo-ING**
*   *Example:* "I **had been waiting** for 20 minutes when the bus arrived."

## 2. ¿Para qué sirve?

### Duración antes de algo en el pasado
Para decir cuánto tiempo llevaba ocurriendo algo antes de que otra cosa pasara.
*   *Example:* "They **had been playing** soccer for an hour **when** it started to rain." (Jugaron 1 hora -> Lluvia).

### Causa de un estado pasado
Para explicar por qué alguien estaba cansado, sucio, etc., en el pasado.
*   *Example:* "He was tired because he **had been working** all day." (La causa era la duración del trabajo).

> **Diferencia con Past Continuous:**
> *   *Past Cont:* "When I arrived, he **was sleeping**." (Estaba durmiendo en ese momento).
> *   *Past Perf Cont:* "When I arrived, he **had been sleeping**." (Quizás acababa de despertarse, pero enfatizamos el tiempo que pasó durmiendo antes de que yo llegara).

---

## 4. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Past Cont):** *Man sleeping in bed.* "He **was sleeping** when I arrived." (Acción en curso).
*   **Panel 2 (Past Perf Cont):** *Man with messy hair rubbing eyes.* "He looked tired because he **had been sleeping** badly." (Causa/Efecto).`,
        manualQuestions: [
          { id: 'ppct1', text: "Her eyes were red because she ___ (cry).", options: ["had been crying", "was crying", "cried", "has been crying"], correctAnswer: "had been crying", explanation: "Causa prolongada de un estado pasado." },
          { id: 'ppct2', text: "I was tired because I ___ (work) all day.", options: ["had been working", "was working", "worked", "have been working"], correctAnswer: "had been working", explanation: "Duración anterior que causa fatiga en el pasado." },
          { id: 'ppct3', text: "They ___ (play) for 30 minutes when the match was stopped.", options: ["had been playing", "were playing", "played", "have been playing"], correctAnswer: "had been playing", explanation: "Duración hasta un punto de interrupción pasado." },
          { id: 'ppct4', text: "The road was wet. It ___ (rain).", options: ["had been raining", "was raining", "rained", "has been raining"], correctAnswer: "had been raining", explanation: "Evidencia pasada de una acción reciente." },
          { id: 'ppct5', text: "She ___ (wait) for two hours before he finally arrived.", options: ["had been waiting", "waited", "was waiting", "has been waiting"], correctAnswer: "had been waiting", explanation: "Énfasis en la duración (two hours) antes de otro evento." },
          { id: 'ppct6', text: "I ___ (drive) for hours so I needed a break.", options: ["had been driving", "drove", "was driving", "have been driving"], correctAnswer: "had been driving", explanation: "Actividad continuada causante de necesidad." },
          { id: 'ppct7', text: "He gained weight because he ___ (eat) too much.", options: ["had been eating", "ate", "was eating", "has eaten"], correctAnswer: "had been eating", explanation: "Hábito/Acción repetida anterior." },
          { id: 'ppct8', text: "When I quit my job, I ___ (work) there for 10 years.", options: ["had been working", "worked", "was working", "have worked"], correctAnswer: "had been working", explanation: "Duración acumulada hasta un punto final en el pasado." },
          { id: 'ppct9', text: "The smell was delicious. She ___ (bake).", options: ["had been baking", "baked", "was baking", "has baked"], correctAnswer: "had been baking", explanation: "Efecto sensorial de una acción reciente." },
          { id: 'ppct10', text: "I didn't know he ___ (write) a book.", options: ["had been writing", "wrote", "was writing", "writes"], correctAnswer: "had been writing", explanation: "Proceso desconocido anterior." }
        ],
        examQuestions: [
          { id: 'e_ppct1', text: "Combine: I was tired. I was running for an hour. (Use 'because')", options: [], correctAnswer: "I was tired because I had been running for an hour.", explanation: "Cause (running) -> Effect (tired)." },
          { id: 'e_ppct2', text: "Rewrite: He started waiting at 2pm. You arrived at 4pm. (He had...)", options: [], correctAnswer: "He had been waiting for two hours when you arrived.", explanation: "Duration calculation." },
          { id: 'e_ppct3', text: "Explain why the ground was wet using 'rain'.", options: [], correctAnswer: "It had been raining.", explanation: "Past evidence." },
          { id: 'e_ppct4', text: "Fill in: She ___ (study) all day, so she passed the test.", options: [], correctAnswer: "She had been studying all day, so she passed the test.", explanation: "Past perfect continuous for duration." },
          { id: 'e_ppct5', text: "Correct: I was working there for 5 years when I got promoted.", options: [], correctAnswer: "I had been working there for 5 years when I got promoted.", explanation: "Past Perfect Continuous needed for duration before a past event." }
        ]
      },
      {
        id: 'future-forms',
        title: 'Future Forms: Will / Going to / Pres. Cont.',
        description: 'Predicciones, planes, decisiones espontáneas y arreglos fijos.',
        icon: 'Plane',
        manualTheory: `# Future Forms 🚀

En inglés no existe un solo "futuro". Usamos diferentes formas según la **intención** o la **certeza**.

## 1. Will (El futuro incierto o espontáneo) 🎲
Se usa para cosas que **no** estaban planeadas antes de hablar.
*   **Decisiones espontáneas:** "The phone is ringing. I **will answer** it." (Decidido ahora mismo).
*   **Predicciones (opinión):** "I think Brazil **will win**." (Sin evidencia física).
*   **Promesas:** "I **will love** you forever."

## 2. Going To (La intención) 🎯
Se usa para cosas que ya habías pensado o decidido **antes** de hablar.
*   **Planes:** "I **am going to buy** a new car next month." (Ya lo tengo pensado).
*   **Predicciones (evidencia):** "Look at those black clouds! It **is going to rain**." (Veo la evidencia).

## 3. Present Continuous (La agenda) 📅
Se usa para **futuro confirmado** (Arrangements). Implica que ya has quedado con alguien o has comprado tickets. Es el futuro más seguro.
*   **Keywords:** Tonight, tomorrow at 8, next Friday.
*   *Example:* "I **am meeting** Sarah at 8:00 tonight." (Está en mi agenda, ella lo sabe).

> **Resumen Rápido:**
> *   **Will:** ¡Decisión ahora! / Creo que...
> *   **Going to:** Tengo la intención / ¡Mira, va a pasar!
> *   **Present Cont:** Tengo cita / Está cerrado.

---

## 4. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Will - Spontaneous):** *Person A:* "It's hot." *Person B:* "I **will open** the window." (Reacción inmediata).
*   **Panel 2 (Going to - Plan):** *Person looking at a brochure:* "I **am going to travel** to Japan next year." (Intención previa).
`,
        manualQuestions: [
          // 🔹 PRÁCTICA 1 – Uso básico (decisión, intención, evidencia)
          { id: 'ff1_1', text: "I’m tired. I think I ___ go to bed now.", options: ["am going to", "will", "am going", "go"], correctAnswer: "will", explanation: "Decisión espontánea tomada en el momento ('now') + opinión ('think')." },
          { id: 'ff1_2', text: "Look at those clouds! It ___.", options: ["will rain", "rains", "is raining", "is going to rain"], correctAnswer: "is going to rain", explanation: "Predicción basada en evidencia visual presente." },
          { id: 'ff1_3', text: "Don’t worry, I ___ help you with your homework.", options: ["am going to", "am helping", "will", "help"], correctAnswer: "will", explanation: "Ofrecimiento espontáneo / Promesa." },
          { id: 'ff1_4', text: "She ___ study medicine. She has already decided.", options: ["will", "is studying", "is going to", "studies"], correctAnswer: "is going to", explanation: "Intención previa decidida con antelación." },
          { id: 'ff1_5', text: "I didn’t know about the exam. I ___ fail it.", options: ["am going to", "will", "am failing", "fail"], correctAnswer: "will", explanation: "Predicción basada en opinión/miedo, sin evidencia física inmediata." },
          { id: 'ff1_6', text: "They ___ a party next Saturday. Everything is organised.", options: ["will have", "have", "are having", "are going to have"], correctAnswer: "are having", explanation: "Evento organizado (Arrangement) -> Present Continuous." },
          { id: 'ff1_7', text: "Be careful! You ___ fall.", options: ["will", "are falling", "are going to", "fall"], correctAnswer: "are going to", explanation: "Predicción inmediata por evidencia (situación peligrosa)." },
          { id: 'ff1_8', text: "I promise I ___ tell anyone.", options: ["am going to", "will", "am telling", "tell"], correctAnswer: "will", explanation: "Las promesas siempre van con 'will'." },
          { id: 'ff1_9', text: "He thinks Barça ___ win the match.", options: ["is going to", "wins", "will", "is winning"], correctAnswer: "will", explanation: "Predicción basada en opinión ('thinks')." },
          { id: 'ff1_10', text: "We ___ visit our grandparents this weekend. We decided yesterday.", options: ["will", "visit", "are visiting", "are going to"], correctAnswer: "are going to", explanation: "Plan decidido previamente (Intención)." },

          // 🔹 PRÁCTICA 2 – Contraste semántico intermedio (planes vs arreglos)
          { id: 'ff2_1', text: "I ___ meet Laura at 6 p.m. We’ve already agreed.", options: ["will meet", "am going to meet", "meet", "am meeting"], correctAnswer: "am meeting", explanation: "Cita concertada con otra persona (Arrangement) -> Present Continuous." },
          { id: 'ff2_2', text: "She hasn’t studied. She ___ fail the exam.", options: ["will", "is failing", "is going to", "fails"], correctAnswer: "is going to", explanation: "Predicción con evidencia clara (no haber estudiado)." },
          { id: 'ff2_3', text: "This suitcase is too heavy. I ___ help you.", options: ["am going to", "am helping", "will", "help"], correctAnswer: "will", explanation: "Decisión espontánea al ver el problema." },
          { id: 'ff2_4', text: "My parents ___ travel to Italy next summer. They’re saving money.", options: ["will", "are travelling", "travel", "are going to"], correctAnswer: "are going to", explanation: "Intención/Plan, pero quizás aún no hay billetes comprados (Arrangement sería posible, pero Going to es la intención base)." },
          { id: 'ff2_5', text: "According to the forecast, temperatures ___ rise tomorrow.", options: ["are going to", "are rising", "will", "rise"], correctAnswer: "will", explanation: "Predicciones del tiempo formales o lejanas suelen usar Will (o to be going to, pero will es muy común en forecast)." },
          { id: 'ff2_6', text: "We ___ dinner with friends tonight at 9.", options: ["will have", "have", "are having", "are going to have"], correctAnswer: "are having", explanation: "Cita con hora y personas confirmadas (Arrangement)." },
          { id: 'ff2_7', text: "I think people ___ live longer in the future.", options: ["are going to", "are living", "will", "live"], correctAnswer: "will", explanation: "Predicción general sobre el futuro lejano." },
          { id: 'ff2_8', text: "She ___ buy a new phone. She’s already chosen one.", options: ["will", "buys", "is buying", "is going to"], correctAnswer: "is going to", explanation: "Intención clara y planificada." },
          { id: 'ff2_9', text: "Hurry up! The film ___.", options: ["will start", "starts", "is starting", "is going to start"], correctAnswer: "starts", explanation: "Horarios fijos (Timetables) usan Present Simple." },
          { id: 'ff2_10', text: "Don’t call him now. He ___ an exam.", options: ["will take", "takes", "is taking", "is going to take"], correctAnswer: "is taking", explanation: "Futuro inmediato o acción en progreso (Present Continuous)." },

          // 🔹 PRÁCTICA 3 – Nivel examen / errores típicos
          { id: 'ff3_1', text: "I didn’t plan it, but I ___ stay at home tonight.", options: ["am going to", "will", "am staying", "stay"], correctAnswer: "will", explanation: "Decisión espontánea ('didn't plan it')." },
          { id: 'ff3_2', text: "She ___ visit her cousins this weekend. It’s already arranged.", options: ["will", "is going to", "visits", "is visiting"], correctAnswer: "is visiting", explanation: "'Already arranged' pide Present Continuous." },
          { id: 'ff3_3', text: "Look at the score! We ___ lose.", options: ["will", "are losing", "are going to", "lose"], correctAnswer: "are going to", explanation: "Evidencia visual irrefutable en el presente." },
          { id: 'ff3_4', text: "I think robots ___ replace many jobs.", options: ["are going to", "are replacing", "will", "replace"], correctAnswer: "will", explanation: "Opinión sobre el futuro." },
          { id: 'ff3_5', text: "He ___ call you later. He promised.", options: ["is going to", "is calling", "will", "calls"], correctAnswer: "will", explanation: "Promesa." },
          { id: 'ff3_6', text: "We ___ a test tomorrow morning at 8.", options: ["will have", "have", "are having", "are going to have"], correctAnswer: "are having", explanation: "Plan fijo/Agenda académica." },
          { id: 'ff3_7', text: "She ___ study tonight. She hasn’t decided yet.", options: ["will", "is studying", "studies", "is going to"], correctAnswer: "will", explanation: "Falta de plan firme, probablemente una decisión en el aire." },
          { id: 'ff3_8', text: "According to these results, sales ___.", options: ["will increase", "are increasing", "are going to increase", "increase"], correctAnswer: "are going to increase", explanation: "Predicción basada en evidencia actual (los resultados)." },
          { id: 'ff3_9', text: "Sorry, I forgot. I ___ do it now.", options: ["am going to", "am doing", "will", "do"], correctAnswer: "will", explanation: "Reacción y decisión inmediata al olvido." },
          { id: 'ff3_10', text: "They ___ get married in June. The invitations are ready.", options: ["will", "get", "are getting", "are going to"], correctAnswer: "are going to", explanation: "Gran intención planificada. Nota: 'Are getting married' (Present Cont) también sería correcto, pero 'going to' marca la intención fuerte del plan." }
        ],
        examQuestions: [
          // EXAMEN – BLOQUE A (will vs going to)
          { id: 'e_ff1', text: "I decided a moment ago. I’ll help you. (Rewrite using will)", options: [], correctAnswer: "I will help you.", explanation: "Spontaneous decision." },
          { id: 'e_ff2', text: "She decided yesterday to study medicine. (Rewrite using going to)", options: [], correctAnswer: "She is going to study medicine.", explanation: "Planned intention." },
          { id: 'e_ff3', text: "Look at those clouds. It will rain. (Rewrite using going to)", options: [], correctAnswer: "Look at those clouds. It is going to rain.", explanation: "Prediction with evidence." },
          { id: 'e_ff4', text: "I promise I tell you the truth. (Rewrite correctly)", options: [], correctAnswer: "I promise I will tell you the truth.", explanation: "Promises use 'will'." },
          { id: 'e_ff5', text: "He hasn’t studied. He will fail the exam. (Rewrite using going to)", options: [], correctAnswer: "He hasn't studied. He is going to fail the exam.", explanation: "Prediction based on present evidence (not studying)." },
          { id: 'e_ff6', text: "I think this problem is difficult. (Make a prediction using will)", options: [], correctAnswer: "I think this problem will be difficult.", explanation: "Opinion prediction." },

          // EXAMEN – BLOQUE B (Present Continuous for future arrangements)
          { id: 'e_ff7', text: "We arranged to meet at 6 p.m. (Rewrite using Present Continuous)", options: [], correctAnswer: "We are meeting at 6 p.m.", explanation: "Arrangement." },
          { id: 'e_ff8', text: "She plans to travel to London next Friday. (Rewrite using Present Continuous)", options: [], correctAnswer: "She is travelling to London next Friday.", explanation: "Fixed plan." },
          { id: 'e_ff9', text: "I have an appointment with the dentist tomorrow. (Rewrite using Present Continuous)", options: [], correctAnswer: "I am seeing the dentist tomorrow.", explanation: "Or 'I am going to the dentist'. Appointment." },
          { id: 'e_ff10', text: "They have organised a party for Saturday night. (Rewrite using Present Continuous)", options: [], correctAnswer: "They are having a party Saturday night.", explanation: "Organised event." },
          { id: 'e_ff11', text: "I see my grandparents this afternoon. (Correct the sentence using Present Continuous)", options: [], correctAnswer: "I am seeing my grandparents this afternoon.", explanation: "Future arrangement requires continuous." },
          { id: 'e_ff12', text: "He has planned a meeting at 10 a.m. (Rewrite using Present Continuous)", options: [], correctAnswer: "He is having a meeting at 10 a.m.", explanation: "Scheduled event." },

          // EXAMEN – BLOQUE C (Rephrasing tipo Selectividad CLM)
          { id: 'e_ff13', text: "Rewrite using going to: She has already decided to buy a new phone.", options: [], correctAnswer: "She is going to buy a new phone.", explanation: "Intention." },
          { id: 'e_ff14', text: "Rewrite using will (decision at the moment): I didn’t plan to stay, but now I’ll stay.", options: [], correctAnswer: "I will stay.", explanation: "Spontaneous decision." },
          { id: 'e_ff15', text: "Rewrite without changing the meaning: We have arranged dinner with friends tonight.", options: [], correctAnswer: "We are having dinner with friends tonight.", explanation: "Arrangement -> Present Continuous." },
          { id: 'e_ff16', text: "Rewrite using because and future meaning: She hasn’t studied. She will fail the exam.", options: [], correctAnswer: "She is going to fail the exam because she hasn't studied.", explanation: "Prediction from evidence." },
          { id: 'e_ff17', text: "Correct the sentence: I will going to call you later.", options: [], correctAnswer: "I will call you later.", explanation: "Or 'I am going to call'. Cannot mix will + going to." },
          { id: 'e_ff18', text: "Correct the sentence: Look! It will going to rain.", options: [], correctAnswer: "Look! It is going to rain.", explanation: "Evidence requires 'be going to', grammar correction." },
          { id: 'e_ff19', text: "Correct the sentence: We are going to meet them yesterday.", options: [], correctAnswer: "We were going to meet them yesterday.", explanation: "Past intention (was/were going to) or change 'yesterday' to 'tomorrow'." },
          { id: 'e_ff20', text: "Rewrite to show a fixed arrangement: They will get married in June.", options: [], correctAnswer: "They are getting married in June.", explanation: "Fixed arrangement uses Present Continuous." }
        ]
      }
    ]
  },
  {
    id: 'grammar-structures',
    title: 'Grammar Structures',
    description: 'Domina la construcción de oraciones complejas: Relativas, Pasivas, Reported Speech y Condicionales.',
    color: 'bg-violet-500',
    topics: [
      {
        id: 'relative-clauses',
        title: 'Relative Clauses',
        description: 'Defining vs Non-defining. Who, which, that, whose & omission.',
        icon: 'Link',
        manualTheory: `# Relative Clauses: The Connection 🔗

Las oraciones de relativo sirven para dar información sobre una persona o cosa sin empezar una frase nueva.

## 1. Defining Relative Clauses (Esenciales) 🎯
Dan información **necesaria** para saber de quién o qué estamos hablando. Sin ella, la frase no se entiende bien.
*   **No llevan comas.**
*   Puedes usar **THAT** en lugar de Who/Which.
*   Puedes **omitir** el pronombre si NO es el sujeto (si hay otro sujeto después: *The book (that) **I** bought*).

*   *Example:* "The book **(that)** I bought is good." (Define qué libro).

## 2. Non-Defining Relative Clauses (Extra) ➕
Dan información **extra** o curiosa. Si la quitas, la frase sigue teniendo sentido completo.
*   **Siempre entre comas** (como un paréntesis).
*   ❌ NUNCA uses **THAT**.
*   ❌ NUNCA omitas el pronombre.

*   *Example:* "My brother, **who** lives in London, is visiting." (Ya sabes quién es mi hermano, lo de Londres es extra).

## 3. The Pronouns 🔑
*   **Who:** Personas.
*   **Which:** Cosas/Animales.
*   **That:** Personas/Cosas (Solo en Defining).
*   **Whose:** Posesión (Cuyo/a). *The man **whose** car is red.*
*   **Where / When / Why:** Lugares, tiempos, razones.

> **Pildora Clave:**
> Si ves **comas**, PROHIBIDO poner **THAT**.
> Si el pronombre va seguido de un verbo (*who is...*), NO se puede omitir.

---

## 4. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Defining):** "The runner **who is winning** is fast." (Especificamos cuál de los corredores).
*   **Panel 2 (Non-defining):** "Usain Bolt, **who is winning**, is fast." (Ya sabemos quién es, es info extra).
`,
        manualQuestions: [
          // 🔹 PRÁCTICA 1 – Defining Relative Clauses (uso básico)
          { id: 'rc_p1_1', text: "The girl ___ lives next door is my cousin.", options: ["who", "which", "whose", "whom"], correctAnswer: "who", explanation: "Person + Subject = Who." },
          { id: 'rc_p1_2', text: "This is the book ___ I told you about.", options: ["which", "who", "where", "whose"], correctAnswer: "which", explanation: "Thing + Object = Which (or That/Ø)." },
          { id: 'rc_p1_3', text: "The people ___ car was stolen called the police.", options: ["whose", "which", "who", "whom"], correctAnswer: "whose", explanation: "Possession (The people's car) = Whose." },
          { id: 'rc_p1_4', text: "That’s the restaurant ___ we had dinner last night.", options: ["where", "which", "when", "whose"], correctAnswer: "where", explanation: "Place + Action happening inside = Where." },
          { id: 'rc_p1_5', text: "I like films ___ make me think.", options: ["which", "who", "whose", "where"], correctAnswer: "which", explanation: "Thing + Subject = Which." },
          { id: 'rc_p1_6', text: "The teacher ___ explains this topic is very clear.", options: ["who", "which", "whom", "whose"], correctAnswer: "who", explanation: "Person + Subject = Who." },
          { id: 'rc_p1_7', text: "The exam ___ we did yesterday was very difficult.", options: ["which", "who", "where", "whose"], correctAnswer: "which", explanation: "Thing + Object = Which." },
          { id: 'rc_p1_8', text: "The students ___ phones were confiscated complained.", options: ["whose", "who", "which", "whom"], correctAnswer: "whose", explanation: "Possession (The students' phones)." },
          { id: 'rc_p1_9', text: "This is the moment ___ everything changed.", options: ["when", "which", "where", "whose"], correctAnswer: "when", explanation: "Time = When." },
          { id: 'rc_p1_10', text: "That’s the person ___ I spoke to earlier.", options: ["who", "which", "whose", "where"], correctAnswer: "who", explanation: "Person + Object = Who (or Whom/That/Ø)." },

          // 🔹 PRÁCTICA 2 – Non-defining clauses / omisión del pronombre
          { id: 'rc_p2_1', text: "My brother, ___ lives in London, is visiting us.", options: ["who", "that", "which", "whose"], correctAnswer: "who", explanation: "Person, Non-defining (commas) = Who. Never 'That'." },
          { id: 'rc_p2_2', text: "This book, ___ I bought yesterday, is very interesting.", options: ["which", "that", "who", "whose"], correctAnswer: "which", explanation: "Thing, Non-defining = Which. Never 'That'." },
          { id: 'rc_p2_3', text: "My school, ___ was built in 1920, is very old.", options: ["which", "that", "where", "whose"], correctAnswer: "which", explanation: "Thing, Non-defining = Which." },
          { id: 'rc_p2_4', text: "My aunt, ___ son studies abroad, is a teacher.", options: ["whose", "who", "which", "whom"], correctAnswer: "whose", explanation: "Possession (My aunt's son) + Non-defining." },
          { id: 'rc_p2_5', text: "This city, ___ I was born, has changed a lot.", options: ["where", "which", "when", "whose"], correctAnswer: "where", explanation: "Place + Action inside (born there) + Non-defining." },
          { id: 'rc_p2_6', text: "The film ___ we watched last night was boring.", options: ["Ø", "who", "whose", "where"], correctAnswer: "Ø", explanation: "Defining + Object pronoun can be omitted." },
          { id: 'rc_p2_7', text: "The people ___ I met were very friendly.", options: ["Ø", "who", "whose", "which"], correctAnswer: "Ø", explanation: "Defining + Object pronoun can be omitted." },
          { id: 'rc_p2_8', text: "My parents, ___ I admire a lot, support me.", options: ["who", "that", "Ø", "which"], correctAnswer: "who", explanation: "Non-defining: Cannot use 'that' and cannot omit pronoun (standard grammar rule, though technically object)." },
          { id: 'rc_p2_9', text: "The day ___ we met was unforgettable.", options: ["when", "which", "where", "whose"], correctAnswer: "when", explanation: "Time reference." },
          { id: 'rc_p2_10', text: "My house, ___ windows are very big, is quite cold.", options: ["whose", "which", "where", "who"], correctAnswer: "whose", explanation: "Possession in non-defining clause." },

          // 🔹 PRÁCTICA 3 – Nivel examen / errores frecuentes
          { id: 'rc_p3_1', text: "The man ___ daughter won the prize is very proud.", options: ["whose", "who", "which", "whom"], correctAnswer: "whose", explanation: "Possession is key here." },
          { id: 'rc_p3_2', text: "This is the reason ___ I didn’t call you.", options: ["why", "which", "where", "whose"], correctAnswer: "why", explanation: "Reason + Why." },
          { id: 'rc_p3_3', text: "The students ___ were talking were punished.", options: ["who", "which", "whose", "whom"], correctAnswer: "who", explanation: "Defining relative clause defining 'students'." },
          { id: 'rc_p3_4', text: "The hotel ___ we stayed was very comfortable.", options: ["where", "which", "when", "whose"], correctAnswer: "where", explanation: "Place (stayed THERE)." },
          { id: 'rc_p3_5', text: "The book ___ written by Orwell is very famous.", options: ["which was", "that was", "Ø", "written"], correctAnswer: "which was", explanation: "Full relative clause structure." },
          { id: 'rc_p3_6', text: "Anyone ___ wants to participate must sign up.", options: ["who", "which", "whose", "whom"], correctAnswer: "who", explanation: "Anyone (person) + Subject." },
          { id: 'rc_p3_7', text: "The house ___ built in the 19th century was renovated.", options: ["that was", "which was", "Ø", "being"], correctAnswer: "that was", explanation: "Passive relative clause." },
          { id: 'rc_p3_8', text: "She’s the only person ___ understands me.", options: ["who", "which", "whose", "whom"], correctAnswer: "who", explanation: "Person + Subject. 'That' is also common but not an option." },
          { id: 'rc_p3_9', text: "The film, ___ won several awards, is worth watching.", options: ["which", "that", "Ø", "whose"], correctAnswer: "which", explanation: "Non-defining + Thing." },
          { id: 'rc_p3_10', text: "The place ___ we first met has closed.", options: ["where", "which", "when", "whose"], correctAnswer: "where", explanation: "Place + Action." }
        ],
        examQuestions: [
          // EXAMEN – BLOQUE A (Defining / non-defining clauses)
          { id: 'e_rc1', text: "The girl lives next door. She is my cousin. (Join using a defining relative clause)", options: [], correctAnswer: "The girl who lives next door is my cousin.", explanation: "Defining relative clause identifying the girl." },
          { id: 'e_rc2', text: "My brother lives in London. He is visiting us. (Join using a non-defining relative clause)", options: [], correctAnswer: "My brother, who lives in London, is visiting us.", explanation: "Non-defining (commas) as it adds extra info." },
          { id: 'e_rc3', text: "This is the book. I told you about it. (Join using a relative clause. Omit the pronoun if possible)", options: [], correctAnswer: "This is the book I told you about.", explanation: "Omission of object pronoun." },
          { id: 'e_rc4', text: "My school was built in 1920. It is very old. (Join using a non-defining relative clause)", options: [], correctAnswer: "My school, which was built in 1920, is very old.", explanation: "Non-defining with 'which'." },
          { id: 'e_rc5', text: "The students were punished. They were talking. (Join using a defining relative clause)", options: [], correctAnswer: "The students who were talking were punished.", explanation: "Defining the specific group of students." },
          { id: 'e_rc6', text: "I met a woman. Her son studies abroad. (Join using whose)", options: [], correctAnswer: "I met a woman whose son studies abroad.", explanation: "Possessive relative clause." },

          // EXAMEN – BLOQUE B (Rephrasing y reducción de relativas)
          { id: 'e_rc7', text: "Rewrite using a reduced relative clause: The man who is talking to the teacher is my uncle.", options: [], correctAnswer: "The man talking to the teacher is my uncle.", explanation: "Reduce 'who is talking' to 'talking'." },
          { id: 'e_rc8', text: "Rewrite using a reduced relative clause: The book which was written by Orwell is very famous.", options: [], correctAnswer: "The book written by Orwell is very famous.", explanation: "Reduce 'which was written' to 'written'." },
          { id: 'e_rc9', text: "Rewrite without changing the meaning: This is the place where we first met.", options: [], correctAnswer: "This is the place in which we first met.", explanation: "Formal structure or omitting 'where' is sometimes possible but 'in which' is the standard formal rephrasing." },
          { id: 'e_rc10', text: "Rewrite so that the relative pronoun can be omitted: The film that we watched last night was boring.", options: [], correctAnswer: "The film we watched last night was boring.", explanation: "Just removing the pronoun." },
          { id: 'e_rc11', text: "Rewrite using when: That was the day. We met on that day.", options: [], correctAnswer: "That was the day when we met.", explanation: "Joining with 'when'." },
          { id: 'e_rc12', text: "Rewrite using why: That is the reason. I didn’t answer the phone.", options: [], correctAnswer: "That is the reason why I didn't answer the phone.", explanation: "Joining with 'why'." },

          // EXAMEN – BLOQUE C (Rephrasing tipo Selectividad CLM)
          { id: 'e_rc13', text: "Join the sentences using a relative clause: She is the only person. She understands me.", options: [], correctAnswer: "She is the only person who understands me.", explanation: "Defining clause." },
          { id: 'e_rc14', text: "Rewrite using a non-defining relative clause: My aunt has just published a book. She is a journalist.", options: [], correctAnswer: "My aunt, who is a journalist, has just published a book.", explanation: "Inserting the profession as extra info." },
          { id: 'e_rc15', text: "Rewrite without changing the meaning: I spoke to the man. He owns the shop.", options: [], correctAnswer: "I spoke to the man who owns the shop.", explanation: "Defining clause." },
          { id: 'e_rc16', text: "Rewrite using whose: They live in a house. The windows are very small.", options: [], correctAnswer: "They live in a house whose windows are very small.", explanation: "Possession." },
          { id: 'e_rc17', text: "Correct the sentence: This is the student which won the competition.", options: [], correctAnswer: "This is the student who won the competition.", explanation: "Student = Person -> Who/That." },
          { id: 'e_rc18', text: "Correct the sentence: My brother, that lives in Madrid, is an engineer.", options: [], correctAnswer: "My brother, who lives in Madrid, is an engineer.", explanation: "Non-defining cannot use 'that'." },
          { id: 'e_rc19', text: "Correct the sentence: The film Ø won an Oscar is very famous.", options: [], correctAnswer: "The film which won an Oscar is very famous.", explanation: "Cannot omit subject pronoun." },
          { id: 'e_rc20', text: "Rewrite to make the information non-essential: My teacher who lives near my house is very strict.", options: [], correctAnswer: "My teacher, who lives near my house, is very strict.", explanation: "Adding commas makes it non-defining." }
        ]
      },
      {
        id: 'modal-verbs',
        title: 'Modal Verbs and Perfect Modals',
        description: 'Obligación, permiso, consejos y deducciones en presente y pasado.',
        icon: 'Lock',
        manualTheory: `# Modal Verbs 🔓

Los verbos modales son especiales: no cambian según la persona (I can, She can) y van seguidos de infinitivo sin "to".

## 1. Modals Básicos (Presente/Futuro)

### Obligación y Prohibición 🛑
*   **Must:** Obligación interna (yo creo que es necesario).
*   **Have to:** Obligación externa (leyes, normas).
*   **Mustn't:** Prohibición total. (No lo hagas).
*   **Don't have to:** Falta de obligación. (No es necesario, pero puedes si quieres).

### Habilidad y Permiso 🤸‍♂️
*   **Can:** Habilidad presente o permiso informal.
*   **Could:** Habilidad pasada o permiso formal.
*   **Be able to:** Habilidad (se puede conjugar en todos los tiempos).
*   **May:** Permiso muy formal.

### Consejo y Probabilidad 🤔
*   **Should / Ought to:** Consejo. ("Deberías").
*   **Must:** Deducción segura (99% seguro que sí). "He looks tired, he **must** be working hard."
*   **Can't:** Deducción negativa (99% seguro que no). "It **can't** be true."
*   **May / Might / Could:** Posibilidad (50% puede que sí).

---

## 2. Perfect Modals (Pasado) 🔙

Se usan para hablar del pasado (arrepentimiento, deducciones sobre lo ocurrido).
**Estructura:** Modal + HAVE + Participio (3ª columna).

### Deducciones en Pasado 🕵️‍♀️
*   **Must have + PP:** Seguro que ocurrió.
    *   *The streets are wet. It **must have rained**.*
*   **Can't have + PP:** Seguro que NO ocurrió.
    *   *He **can't have stolen** the money, he was with me.*
*   **Might/May/Could have + PP:** Pudo haber ocurrido (quizás).

### Críticas y Arrepentimiento 🤦‍♂️
*   **Should have + PP:** Debería haber hecho (pero no lo hizo).
    *   *You **should have studied** more.* (Te estoy criticando).
*   **Needn't have + PP:** No era necesario haberlo hecho (pero se hizo).
    *   *You **needn't have brought** food.* (Trajiste comida, pero sobraba).

---

## 3. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Present):** *A messy room.* "You **should clean** your room." (Consejo ahora).
*   **Panel 2 (Past):** *Mom looking at a failed exam.* "You **should have studied**." (Crítica sobre el pasado).
`,
        manualQuestions: [
          // 🔹 PRÁCTICA 1 – Modals básicos (habilidad, permiso, obligación)
          { id: 'mv1_1', text: "You ___ speak during the exam.", options: ["mustn’t", "don’t have to", "couldn’t", "might not"], correctAnswer: "mustn’t", explanation: "Prohibition (Prohibido hablar)." },
          { id: 'mv1_2', text: "I ___ swim when I was five.", options: ["can", "could", "must", "may"], correctAnswer: "could", explanation: "Past ability (when I was five)." },
          { id: 'mv1_3', text: "Students ___ wear a uniform at this school. It’s compulsory.", options: ["should", "may", "must", "could"], correctAnswer: "must", explanation: "Obligation/Rule." },
          { id: 'mv1_4', text: "You ___ bring your ID. It’s optional.", options: ["must", "don’t have to", "shouldn’t", "can’t"], correctAnswer: "don’t have to", explanation: "Lack of obligation (Optional)." },
          { id: 'mv1_5', text: "___ I use your phone, please?", options: ["Must", "Should", "May", "Need"], correctAnswer: "May", explanation: "Polite request/permission." },
          { id: 'mv1_6', text: "He ___ be very good at maths. He always gets top marks.", options: ["can’t", "must", "shouldn’t", "may not"], correctAnswer: "must", explanation: "Positive deduction (Sure it's true)." },
          { id: 'mv1_7', text: "We ___ hurry or we’ll be late.", options: ["can", "may", "must", "could"], correctAnswer: "must", explanation: "Strong necessity." },
          { id: 'mv1_8', text: "You ___ park here. It’s forbidden.", options: ["don’t have to", "must", "mustn’t", "needn’t"], correctAnswer: "mustn’t", explanation: "Prohibition." },
          { id: 'mv1_9', text: "I ___ go now, but I’m not sure yet.", options: ["must", "can’t", "might", "should"], correctAnswer: "might", explanation: "Possibility/Uncertainty." },
          { id: 'mv1_10', text: "He ___ drive yet. He’s only 16.", options: ["mustn’t", "can’t", "shouldn’t", "may not"], correctAnswer: "can’t", explanation: "Inability/Impossibility (legal age)." },

          // 🔹 PRÁCTICA 2 – Modals intermedios (consejo, probabilidad, deducción)
          { id: 'mv2_1', text: "You ___ study more if you want to pass.", options: ["must", "should", "might", "can"], correctAnswer: "should", explanation: "Advice." },
          { id: 'mv2_2', text: "It’s very cloudy. It ___ rain later.", options: ["must", "can’t", "might", "should"], correctAnswer: "might", explanation: "Possibility based on evidence." },
          { id: 'mv2_3', text: "She ___ be at home. The lights are on.", options: ["can’t", "must", "shouldn’t", "needn’t"], correctAnswer: "must", explanation: "Logical deduction." },
          { id: 'mv2_4', text: "You ___ eat so much junk food.", options: ["don’t have to", "might", "shouldn’t", "can"], correctAnswer: "shouldn’t", explanation: "Negative advice." },
          { id: 'mv2_5', text: "He ___ know the answer, but I’m not sure.", options: ["must", "may", "can’t", "should"], correctAnswer: "may", explanation: "Uncertainty." },
          { id: 'mv2_6', text: "We ___ take a taxi. It’s too far to walk.", options: ["might", "could", "should", "must"], correctAnswer: "should", explanation: "Recommendation/Advice." },
          { id: 'mv2_7', text: "That ___ be the answer. It doesn’t make sense.", options: ["must", "might", "can’t", "could"], correctAnswer: "can’t", explanation: "Negative deduction (Impossible)." },
          { id: 'mv2_8', text: "You ___ tell anyone. It’s a secret.", options: ["don’t have to", "mustn’t", "shouldn’t", "can"], correctAnswer: "mustn’t", explanation: "Prohibition (Secret)." },
          { id: 'mv2_9', text: "He looks tired. He ___ work too much.", options: ["must", "can’t", "shouldn’t", "may not"], correctAnswer: "must", explanation: "Deduction." },
          { id: 'mv2_10', text: "___ you mind opening the window?", options: ["Must", "Should", "Would", "Need"], correctAnswer: "Would", explanation: "Polite request structure 'Would you mind...'." },

          // 🔹 PRÁCTICA 3 – Nivel examen / errores frecuentes
          { id: 'mv3_1', text: "You ___ have told me earlier.", options: ["must", "should", "could", "may"], correctAnswer: "should", explanation: "Criticism (You didn't do it, but it was the right thing)." },
          { id: 'mv3_2', text: "He ___ be very rich. He lives in a small flat.", options: ["must", "can’t", "may", "should"], correctAnswer: "can’t", explanation: "Negative deduction." },
          { id: 'mv3_3', text: "Students ___ use their phones during the exam.", options: ["don’t have to", "mustn’t", "shouldn’t", "can"], correctAnswer: "mustn’t", explanation: "Strong prohibition." },
          { id: 'mv3_4', text: "You ___ worry. Everything is under control.", options: ["must", "don’t have to", "can’t", "shouldn’t"], correctAnswer: "don’t have to", explanation: "Lack of necessity." },
          { id: 'mv3_5', text: "She ___ speak three languages fluently.", options: ["may", "should", "can", "mustn’t"], correctAnswer: "can", explanation: "Ability." },
          { id: 'mv3_6', text: "We ___ leave now or we’ll miss the train.", options: ["may", "can", "must", "could"], correctAnswer: "must", explanation: "Urgent necessity." },
          { id: 'mv3_7', text: "He ___ be the teacher. He looks too young.", options: ["must", "can’t", "should", "may"], correctAnswer: "can’t", explanation: "Negative deduction." },
          { id: 'mv3_8', text: "You ___ apologise. You did nothing wrong.", options: ["must", "don’t have to", "shouldn’t", "can’t"], correctAnswer: "don’t have to", explanation: "No obligation." },
          { id: 'mv3_9', text: "I ___ help you later, but I’m not sure.", options: ["must", "can", "might", "should"], correctAnswer: "might", explanation: "Possibility." },
          { id: 'mv3_10', text: "___ you like some help?", options: ["Should", "Must", "Would", "Need"], correctAnswer: "Would", explanation: "Offer." },

          // 🔹 PRÁCTICA 4 – Perfect Modals (PASADO)
          { id: 'mv4_1', text: "She’s late. She ___ the bus.", options: ["must miss", "must have missed", "should miss", "can’t miss"], correctAnswer: "must have missed", explanation: "Past deduction (Sure she missed it)." },
          { id: 'mv4_2', text: "He looks exhausted. He ___ all night.", options: ["must work", "must have worked", "should work", "could work"], correctAnswer: "must have worked", explanation: "Past deduction causing present state." },
          { id: 'mv4_3', text: "They ___ forgotten about the meeting. They didn’t show up.", options: ["must have", "can’t have", "shouldn’t have", "don’t have"], correctAnswer: "must have", explanation: "Deduction based on absence." },
          { id: 'mv4_4', text: "You ___ told her the secret. Now she’s angry.", options: ["must", "could", "shouldn’t have", "might"], correctAnswer: "shouldn’t have", explanation: "Past criticism/Regret." },
          { id: 'mv4_5', text: "He ___ been at home. Nobody answered the phone.", options: ["must have", "can’t have", "should have", "may have"], correctAnswer: "can’t have", explanation: "Negative past deduction (Impossible he was there)." },
          { id: 'mv4_6', text: "She ___ passed the exam. She studied a lot.", options: ["must have", "can’t have", "shouldn’t have", "needn’t have"], correctAnswer: "must have", explanation: "Positive past deduction." },
          { id: 'mv4_7', text: "We ___ taken a taxi. We arrived very late.", options: ["should have", "must have", "might have", "can’t have"], correctAnswer: "should have", explanation: "Regret (We didn't take one, but it was a good idea)." },
          { id: 'mv4_8', text: "He ___ known the answer. He guessed it.", options: ["must have", "can’t have", "may have", "should have"], correctAnswer: "can’t have", explanation: "Negative deduction." },
          { id: 'mv4_9', text: "You ___ worried so much. Everything was fine.", options: ["must have", "shouldn’t have", "can’t have", "may have"], correctAnswer: "shouldn’t have", explanation: "Or 'needn't have'. Criticism of unnecessary past action." },
          { id: 'mv4_10', text: "They ___ heard the news already. I’m not sure.", options: ["must have", "can’t have", "might have", "should have"], correctAnswer: "might have", explanation: "Past possibility." }
        ],
        examQuestions: [
          // EXAMEN A – MODAL VERBS (NORMALES)
          { id: 'e_mv1', text: "It’s compulsory to wear a helmet here. (Rewrite using a modal verb)", options: [], correctAnswer: "You must wear a helmet here.", explanation: "Obligation." },
          { id: 'e_mv2', text: "It’s not necessary to bring food. (Rewrite using a modal verb)", options: [], correctAnswer: "You don't have to bring food.", explanation: "Lack of obligation." },
          { id: 'e_mv3', text: "I advise you to study harder. (Rewrite using a modal verb)", options: [], correctAnswer: "You should study harder.", explanation: "Advice." },
          { id: 'e_mv4', text: "I’m sure he is at home. (Rewrite using a modal verb)", options: [], correctAnswer: "He must be at home.", explanation: "Deduction." },
          { id: 'e_mv5', text: "It’s possible that she arrives late. (Rewrite using a modal verb)", options: [], correctAnswer: "She might arrive late.", explanation: "Possibility." },
          { id: 'e_mv6', text: "It’s forbidden to park here. (Rewrite using a modal verb)", options: [], correctAnswer: "You mustn't park here.", explanation: "Prohibition." },
          { id: 'e_mv7', text: "He knows how to speak French. (Rewrite using a modal verb)", options: [], correctAnswer: "He can speak French.", explanation: "Ability." },
          { id: 'e_mv8', text: "I’m not sure if he will help us. (Rewrite using a modal verb)", options: [], correctAnswer: "He might help us.", explanation: "Uncertainty." },
          { id: 'e_mv9', text: "You are not allowed to use your phone. (Rewrite using a modal verb)", options: [], correctAnswer: "You mustn't use your phone.", explanation: "Prohibition." },
          { id: 'e_mv10', text: "I politely ask you to open the window. (Rewrite using a modal verb)", options: [], correctAnswer: "Would you open the window?", explanation: "Polite request." },
          { id: 'e_mv11', text: "I don’t think that is the correct answer. (Rewrite using a modal verb)", options: [], correctAnswer: "That can't be the correct answer.", explanation: "Negative deduction." },
          { id: 'e_mv12', text: "It’s a good idea to save some money. (Rewrite using a modal verb)", options: [], correctAnswer: "You should save some money.", explanation: "Advice." },
          { id: 'e_mv13', text: "He has the ability to solve the problem. (Rewrite using a modal verb)", options: [], correctAnswer: "He can solve the problem.", explanation: "Ability." },
          { id: 'e_mv14', text: "There is no obligation to come tomorrow. (Rewrite using a modal verb)", options: [], correctAnswer: "You don't have to come tomorrow.", explanation: "Lack of obligation." },
          { id: 'e_mv15', text: "I’m certain she understands the problem. (Rewrite using a modal verb)", options: [], correctAnswer: "She must understand the problem.", explanation: "Deduction." },

          // EXAMEN B – PERFECT MODALS (PASADO)
          { id: 'e_mv16', text: "I’m sure she forgot my message. (Rewrite using a perfect modal)", options: [], correctAnswer: "She must have forgotten my message.", explanation: "Past deduction." },
          { id: 'e_mv17', text: "It’s possible that he didn’t hear the phone. (Rewrite using a perfect modal)", options: [], correctAnswer: "He might not have heard the phone.", explanation: "Past possibility (negative)." },
          { id: 'e_mv18', text: "It was a mistake to tell him the secret. (Rewrite using a perfect modal)", options: [], correctAnswer: "You shouldn't have told him the secret.", explanation: "Regret." },
          { id: 'e_mv19', text: "I’m sure they arrived late. (Rewrite using a perfect modal)", options: [], correctAnswer: "They must have arrived late.", explanation: "Past deduction." },
          { id: 'e_mv20', text: "It wasn’t necessary to buy tickets. (Rewrite using a perfect modal)", options: [], correctAnswer: "You needn't have bought tickets.", explanation: "Unnecessary past action." },
          { id: 'e_mv21', text: "I’m sure he wasn’t at home. (Rewrite using a perfect modal)", options: [], correctAnswer: "He can't have been at home.", explanation: "Negative past deduction." },
          { id: 'e_mv22', text: "It’s possible that she passed the exam. (Rewrite using a perfect modal)", options: [], correctAnswer: "She might have passed the exam.", explanation: "Past possibility." },
          { id: 'e_mv23', text: "It was wrong to speak to her like that. (Rewrite using a perfect modal)", options: [], correctAnswer: "You shouldn't have spoken to her like that.", explanation: "Criticism." },
          { id: 'e_mv24', text: "I’m certain they didn’t understand the instructions. (Rewrite using a perfect modal)", options: [], correctAnswer: "They can't have understood the instructions.", explanation: "Negative past deduction." },
          { id: 'e_mv25', text: "It’s possible he took the wrong bus. (Rewrite using a perfect modal)", options: [], correctAnswer: "He might have took the wrong bus.", explanation: "Past possibility." },
          { id: 'e_mv26', text: "There was no need to hurry. (Rewrite using a perfect modal)", options: [], correctAnswer: "We needn't have hurried.", explanation: "Unnecessary action." },
          { id: 'e_mv27', text: "I’m sure she studied a lot. (Rewrite using a perfect modal)", options: [], correctAnswer: "She must have studied a lot.", explanation: "Past deduction." },
          { id: 'e_mv28', text: "It’s possible they misunderstood the question. (Rewrite using a perfect modal)", options: [], correctAnswer: "They might have misunderstood the question.", explanation: "Past possibility." },
          { id: 'e_mv29', text: "It was a bad idea not to apologise. (Rewrite using a perfect modal)", options: [], correctAnswer: "You should have apologised.", explanation: "Regret/Criticism." },
          { id: 'e_mv30', text: "I’m sure he knew the answer. (Rewrite using a perfect modal)", options: [], correctAnswer: "He must have known the answer.", explanation: "Past deduction." }
        ]
      },
      {
        id: 'reported-speech',
        title: 'Reported Speech',
        description: 'Cuenta lo que alguien dijo. Cambios de tiempos (backshift), preguntas y órdenes.',
        icon: 'MessageSquare',
        manualTheory: `# Reported Speech: El arte de contar chismes 🗣️

Cuando contamos lo que alguien ha dicho, solemos cambiar el tiempo verbal un paso hacia atrás en el pasado. Esto se llama **Backshift**.

## 1. The Tense Ladder (Backshift) 🪜
Si el verbo introductorio está en pasado (*He said, She told me*), los tiempos cambian así:

| Direct Speech | Reported Speech |
| :--- | :--- |
| **Present Simple** | **Past Simple** |
| **Present Continuous** | **Past Continuous** |
| **Past Simple** | **Past Perfect** |
| **Present Perfect** | **Past Perfect** |
| **Will** | **Would** |
| **Can** | **Could** |

*   *Direct:* "I **am** tired."
*   *Reported:* She said that she **was** tired.

## 2. Expressions of Time & Place 📍
Las referencias también cambian porque ya no estamos en el mismo momento ni lugar.
*   **Now** -> Then
*   **Today** -> That day
*   **Yesterday** -> The day before / The previous day
*   **Tomorrow** -> The next day / The following day
*   **Here** -> There
*   **This** -> That

## 3. Types of Sentences

### Statements (Frases normales)
Usamos **say** (sin persona) o **tell** (con persona).
*   *He said that...*
*   *He told **me** that...*

### Questions (Preguntas) ❓
*   **Wh- questions:** Se mantiene la partícula (What, Where...) pero **el orden cambia** a afirmativa. ¡Adiós auxiliar 'do'!
    *   *Direct:* "Where **do** you live?"
    *   *Reported:* He asked me where I **lived**. (Sujeto + Verbo).
*   **Yes/No questions:** Usamos **IF** o **WHETHER**.
    *   *Direct:* "Do you like pizza?"
    *   *Reported:* He asked me **if** I **liked** pizza.

### Commands & Requests (Órdenes) 👮
Usamos el **Infinitivo** (to + verbo).
*   *Afirmativa:* "Sit down." -> He told me **to sit** down.
*   *Negativa:* "Don't talk." -> He told me **not to talk**.

---

## 4. Spot the difference 🕵️‍♂️

<!-- COMIC_PLACEHOLDER -->

### The Contrast
*   **Panel 1 (Direct):** *Boy to Girl:* "I **will love** you forever." (Promesa original).
*   **Panel 2 (Reported):** *Girl to Friend:* "He said he **would love** me forever." (Contándolo después).
`,
        manualQuestions: [
          // 🔹 PRÁCTICA 1 – Reported Statements (uso básico)
          { id: 'rs1_1', text: "“I’m tired,” she said. She said that she ___ tired.", options: ["is", "was", "has been", "will be"], correctAnswer: "was", explanation: "Present Simple changes to Past Simple." },
          { id: 'rs1_2', text: "“We have finished the exam,” they said. They said that they ___ the exam.", options: ["finish", "finished", "had finished", "have finished"], correctAnswer: "had finished", explanation: "Present Perfect changes to Past Perfect." },
          { id: 'rs1_3', text: "“I can’t come tomorrow,” he said. He said that he ___ come the next day.", options: ["can’t", "couldn’t", "won’t", "hasn’t"], correctAnswer: "couldn’t", explanation: "Can changes to Could." },
          { id: 'rs1_4', text: "“I saw her yesterday,” she said. She said that she ___ her the day before.", options: ["sees", "has seen", "saw", "had seen"], correctAnswer: "had seen", explanation: "Past Simple changes to Past Perfect." },
          { id: 'rs1_5', text: "“We are studying English,” they said. They said that they ___ English.", options: ["study", "were studying", "are studying", "had studied"], correctAnswer: "were studying", explanation: "Present Continuous changes to Past Continuous." },
          { id: 'rs1_6', text: "“I will call you later,” he said. He said that he ___ me later.", options: ["will call", "would call", "calls", "has called"], correctAnswer: "would call", explanation: "Will changes to Would." },
          { id: 'rs1_7', text: "“I live in Madrid,” she said. She said that she ___ in Madrid.", options: ["lives", "lived", "had lived", "was living"], correctAnswer: "lived", explanation: "Present Simple changes to Past Simple." },
          { id: 'rs1_8', text: "“I’ve never been abroad,” he said. He said that he ___ never ___ abroad.", options: ["has / been", "had / been", "was / being", "did / go"], correctAnswer: "had / been", explanation: "Present Perfect changes to Past Perfect." },
          { id: 'rs1_9', text: "“We are late,” they said. They said that they ___ late.", options: ["are", "were", "had been", "will be"], correctAnswer: "were", explanation: "Present Simple (to be) changes to Past Simple." },
          { id: 'rs1_10', text: "“I don’t like maths,” she said. She said that she ___ maths.", options: ["doesn’t like", "didn’t like", "hadn’t liked", "isn’t liking"], correctAnswer: "didn’t like", explanation: "Present Simple negative changes to Past Simple negative." },

          // 🔹 PRÁCTICA 2 – Reported Questions
          { id: 'rs2_1', text: "“Where do you live?” he asked me. He asked me where I ___.", options: ["live", "lived", "was living", "had lived"], correctAnswer: "lived", explanation: "Wh- question: Present Simple becomes Past Simple. Word order changes (Subject + Verb)." },
          { id: 'rs2_2', text: "“Are you coming tomorrow?” she asked him. She asked him ___ coming the next day.", options: ["are you", "if he was", "whether was he", "if he is"], correctAnswer: "if he was", explanation: "Yes/No question needs 'if'. Present Cont becomes Past Cont." },
          { id: 'rs2_3', text: "“Did you see the film?” he asked us. He asked us if we ___ the film.", options: ["see", "saw", "had seen", "have seen"], correctAnswer: "had seen", explanation: "Past Simple becomes Past Perfect." },
          { id: 'rs2_4', text: "“What time does the train leave?” she asked. She asked what time the train ___.", options: ["leaves", "left", "had left", "was leaving"], correctAnswer: "left", explanation: "Present Simple becomes Past Simple." },
          { id: 'rs2_5', text: "“Why are you late?” the teacher asked. The teacher asked why I ___.", options: ["am late", "was late", "had been late", "will be late"], correctAnswer: "was late", explanation: "Present Simple 'to be' becomes Past Simple." },
          { id: 'rs2_6', text: "“Have you finished your homework?” he asked. He asked if I ___ my homework.", options: ["finished", "have finished", "had finished", "was finishing"], correctAnswer: "had finished", explanation: "Present Perfect becomes Past Perfect." },
          { id: 'rs2_7', text: "“Can you help me?” she asked him. She asked him if he ___ help her.", options: ["can", "could", "will", "should"], correctAnswer: "could", explanation: "Can becomes Could." },
          { id: 'rs2_8', text: "“Where were you yesterday?” she asked. She asked where I ___ the day before.", options: ["am", "was", "had been", "were"], correctAnswer: "had been", explanation: "Past Simple 'to be' becomes Past Perfect 'had been'." },
          { id: 'rs2_9', text: "“Do you like English?” he asked me. He asked me if I ___ English.", options: ["like", "liked", "had liked", "was liking"], correctAnswer: "liked", explanation: "Present Simple becomes Past Simple." },
          { id: 'rs2_10', text: "“Will you come to the party?” she asked. She asked if I ___ to the party.", options: ["will come", "would come", "came", "had come"], correctAnswer: "would come", explanation: "Will becomes Would." },

          // 🔹 PRÁCTICA 3 – Commands & Requests / errores frecuentes
          { id: 'rs3_1', text: "“Open the window,” the teacher said. The teacher told us ___ the window.", options: ["open", "opening", "to open", "that open"], correctAnswer: "to open", explanation: "Commands use the infinitive with 'to'." },
          { id: 'rs3_2', text: "“Don’t be late,” she said to him. She told him ___ late.", options: ["not be", "don’t be", "not to be", "didn’t be"], correctAnswer: "not to be", explanation: "Negative commands use 'not to'." },
          { id: 'rs3_3', text: "“Please help me,” she said. She asked me ___ her.", options: ["help", "to help", "helping", "that I help"], correctAnswer: "to help", explanation: "Requests use the infinitive." },
          { id: 'rs3_4', text: "“Stop talking,” the teacher said. The teacher told the students ___ talking.", options: ["stop", "stopping", "to stop", "that stop"], correctAnswer: "to stop", explanation: "Command -> To + Infinitive." },
          { id: 'rs3_5', text: "“Can you close the door?” he said. He asked me ___ the door.", options: ["close", "closing", "to close", "that I close"], correctAnswer: "to close", explanation: "Requests use the infinitive structure." },
          { id: 'rs3_6', text: "“Don’t touch that,” she said. She told me ___ that.", options: ["don’t touch", "not touch", "not to touch", "to not touch"], correctAnswer: "not to touch", explanation: "Negative command -> Not to + Infinitive." },
          { id: 'rs3_7', text: "“Tell me the truth,” he said. He told her ___ him the truth.", options: ["tell", "telling", "to tell", "that tell"], correctAnswer: "to tell", explanation: "Command." },
          { id: 'rs3_8', text: "“Please don’t forget,” she said. She asked me ___ forget.", options: ["don’t", "not", "not to", "not forgetting"], correctAnswer: "not to", explanation: "Negative request." },
          { id: 'rs3_9', text: "“Sit down,” the teacher said. The teacher told the students ___ down.", options: ["sit", "sitting", "to sit", "that sit"], correctAnswer: "to sit", explanation: "Command." },
          { id: 'rs3_10', text: "“Can you wait here?” she asked. She asked me ___ there.", options: ["wait", "waiting", "to wait", "that I wait"], correctAnswer: "to wait", explanation: "Request." }
        ],
        examQuestions: [
          // 🟦 EXAMEN – BLOQUE A (Reported Statements)
          { id: 'e_rs1', text: "“I’m studying for the exam,” she said. (Report the statement)", options: [], correctAnswer: "She said that she was studying for the exam.", explanation: "Present Cont -> Past Cont." },
          { id: 'e_rs2', text: "“We finished the project yesterday,” they said. (Report the statement)", options: [], correctAnswer: "They said that they had finished the project the day before.", explanation: "Past Simple -> Past Perfect. Yesterday -> The day before." },
          { id: 'e_rs3', text: "“I can’t help you now,” he said. (Report the statement)", options: [], correctAnswer: "He said that he couldn't help me then.", explanation: "Can't -> Couldn't. Now -> Then." },
          { id: 'e_rs4', text: "“I’ve never seen this film,” she said. (Report the statement)", options: [], correctAnswer: "She said that she had never seen that film.", explanation: "Present Perfect -> Past Perfect. This -> That." },
          { id: 'e_rs5', text: "“I will call you tomorrow,” he said. (Report the statement)", options: [], correctAnswer: "He said that he would call me the next day.", explanation: "Will -> Would. Tomorrow -> The next day." },
          { id: 'e_rs6', text: "“I don’t understand the problem,” she said. (Report the statement)", options: [], correctAnswer: "She said that she didn't understand the problem.", explanation: "Present Simple -> Past Simple." },
          { id: 'e_rs7', text: "“We are late,” they said. (Report the statement)", options: [], correctAnswer: "They said that they were late.", explanation: "Present -> Past." },
          { id: 'e_rs8', text: "“I live near the school,” he said. (Report the statement)", options: [], correctAnswer: "He said that he lived near the school.", explanation: "Present -> Past." },

          // 🟩 EXAMEN – BLOQUE B (Reported Questions)
          { id: 'e_rs9', text: "“Where do you live?” he asked me. (Report the question)", options: [], correctAnswer: "He asked me where I lived.", explanation: "Wh- question. Order change." },
          { id: 'e_rs10', text: "“Did you understand the exercise?” the teacher asked us. (Report the question)", options: [], correctAnswer: "The teacher asked us if we had understood the exercise.", explanation: "Yes/No (Did) -> If + Past Perfect." },
          { id: 'e_rs11', text: "“Are you coming to the party?” she asked him. (Report the question)", options: [], correctAnswer: "She asked him if he was coming to the party.", explanation: "Yes/No -> If + Past Cont." },
          { id: 'e_rs12', text: "“Why are you so tired?” she asked me. (Report the question)", options: [], correctAnswer: "She asked me why I was so tired.", explanation: "Wh- question + Backshift." },
          { id: 'e_rs13', text: "“Have you finished your homework?” he asked. (Report the question)", options: [], correctAnswer: "He asked if I had finished my homework.", explanation: "Yes/No (Have) -> If + Past Perfect." },
          { id: 'e_rs14', text: "“What time does the exam start?” the teacher asked. (Report the question)", options: [], correctAnswer: "The teacher asked what time the exam started.", explanation: "Wh- question. Present Simple -> Past Simple." },

          // 🟪 EXAMEN – BLOQUE C (Commands / Requests)
          { id: 'e_rs15', text: "“Open your books,” the teacher said. (Report the command)", options: [], correctAnswer: "The teacher told us to open our books.", explanation: "Command -> To + infinitive." },
          { id: 'e_rs16', text: "“Don’t use your phone,” the teacher said to the students. (Report the command)", options: [], correctAnswer: "The teacher told the students not to use their phones.", explanation: "Negative command -> Not to." },
          { id: 'e_rs17', text: "“Please help me,” she said. (Report the request)", options: [], correctAnswer: "She asked me to help her.", explanation: "Request -> To + infinitive." },
          { id: 'e_rs18', text: "“Stop talking,” the teacher said. (Report the command)", options: [], correctAnswer: "The teacher told us to stop talking.", explanation: "Command -> To + infinitive." },
          { id: 'e_rs19', text: "“Can you close the window?” he asked me. (Report the request)", options: [], correctAnswer: "He asked me to close the window.", explanation: "Request form." },
          { id: 'e_rs20', text: "“Don’t forget to call me,” she said. (Report the command)", options: [], correctAnswer: "She told me not to forget to call her.", explanation: "Negative command -> Not to." }
        ]
      }
    ]
  }
];